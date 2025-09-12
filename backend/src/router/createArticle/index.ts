import { articles } from '../../lib/articles'
import { trpc } from '../../lib/trpc'
import { zCreateArticleTrpcInput } from './input'

export const createArticleTrpcRoute = trpc.procedure.input(zCreateArticleTrpcInput).mutation(({ input }) => {
  articles.unshift(input)
  return true
})
