import { articles } from '../../lib/articles'
import { trpc } from '../../lib/trpc'
import { zCreateArticleTrpcInput } from './input'

export const createArticleTrpcRoute = trpc.procedure.input(zCreateArticleTrpcInput).mutation(({ input }) => {
  if (articles.find((article) => article.nick === input.nick)) {
    throw Error('Artickle with this nick already exist')
  }
  articles.unshift(input)
  return true
})
