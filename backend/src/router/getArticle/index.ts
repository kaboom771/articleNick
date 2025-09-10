import { z } from 'zod'
import { articles } from '../../lib/articles'
import { trpc } from '../../lib/trpc'

export const getArticleTrpcRoute = trpc.procedure
  .input(
    z.object({
      articleNick: z.string(),
    })
  )
  .query(({ input }) => {
    const article = articles.find((article) => article.nick === input.articleNick)
    return { article: article || null }
  })
