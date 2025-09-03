import { initTRPC } from '@trpc/server'
import _ from 'lodash'

const articles = _.times(100, (i) => {
  return {
    nick: `article-nick-${i}`,
    name: `article ${i}`,
    description: `description of article ${i}`,
    text: _.times(100, (j) => `<p>Text paragrph ${j} of article ${i}...</p>`).join(''),
  }
})

const trpc = initTRPC.create()

export const trpcRouter = trpc.router({
  getArticles: trpc.procedure.query(() => {
    return { articles: articles.map((article) => _.pick(article, ['nick', 'name', 'description'])) }
  }),

  // // Добавляем обязательную lazy процедуру
  // lazy: trpc.procedure.query(() => {
  //   return { message: 'Lazy endpoint' }
  // }),
})

export type TrpcRouter = typeof trpcRouter
