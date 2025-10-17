import { promises as fs } from 'fs'
import path from 'path'
import { type Article, type User } from '@prisma/client'
import fg from 'fast-glob'
import Handlebars from 'handlebars'
import _ from 'lodash'
import { env } from './env'

type HandlebarsTemplateDelegate = ReturnType<typeof Handlebars.compile> // определение типа, не подтягивается из пакета?

const getHbrTemplates = _.memoize(async () => {
  const htmlPathsPattern = path.resolve(__dirname, '../emails/dist/**/*.html')
  const htmlPaths = fg.sync(htmlPathsPattern)
  const hbrTemplates: Record<string, HandlebarsTemplateDelegate> = {}
  for (const htmlPath of htmlPaths) {
    const templateName = path.basename(htmlPath, '.html')
    const htmlTemplate = await fs.readFile(htmlPath, 'utf8')
    hbrTemplates[templateName] = Handlebars.compile(htmlTemplate)
  }
  return hbrTemplates
})

const getEmailHtml = async (templateName: string, templateVariables: Record<string, string> = {}) => {
  const hbrTemplates = await getHbrTemplates()
  const hbrTemplate = hbrTemplates[templateName]
  const html = hbrTemplate(templateVariables)
  return html
}

const sendEmail = async ({
  to,
  subject,
  templateName,
  templateVariables = {},
}: {
  to: string
  subject: string
  templateName: string
  templateVariables?: Record<string, any>
}) => {
  try {
    const fullTemplateVaraibles = {
      ...templateVariables,
      homeUrl: env.WEBAPP_URL,
    }
    const html = await getEmailHtml(templateName, fullTemplateVaraibles)
    console.info('sendEmail', {
      to,
      subject,
      templateName,
      html,
    })
    return { ok: true }
  } catch (error) {
    console.error(error)
    return { ok: false }
  }
}

export const sendWelcomeEmail = async ({ user }: { user: Pick<User, 'nick' | 'email'> }) => {
  return await sendEmail({
    to: user.email,
    subject: 'Thanks For Registration!',
    templateName: 'welcome',
    templateVariables: {
      userNick: user.nick,
      addArticleUrl: `${env.WEBAPP_URL}/articles/new`,
    },
  })
}

export const sendArticleBlockedEmail = async ({
  user,
  article,
}: {
  user: Pick<User, 'email'>
  article: Pick<Article, 'nick'>
}) => {
  return await sendEmail({
    to: user.email,
    subject: 'Your Article Blocked!',
    templateName: 'articleBlocked',
    templateVariables: {
      articleNick: article.nick,
    },
  })
}
