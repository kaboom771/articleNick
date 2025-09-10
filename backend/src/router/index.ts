import { trpc } from '../lib/trpc'
import { getArticleTrpcRoute } from './getArticle'
import { getArticlesTrpcRoute } from './getArticles'

export const trpcRouter = trpc.router({
  getArticle: getArticleTrpcRoute,
  getArticles: getArticlesTrpcRoute,
})

export type TrpcRouter = typeof trpcRouter
