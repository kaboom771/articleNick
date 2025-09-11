import { trpc } from '../lib/trpc'
// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { createArticleTrpcRoute } from './createArticle'
import { getArticleTrpcRoute } from './getArticle'
import { getArticlesTrpcRoute } from './getArticles'
// @endindex

export const trpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  createArticle: createArticleTrpcRoute,
  getArticle: getArticleTrpcRoute,
  getArticles: getArticlesTrpcRoute,
  // @endindex
})

export type TrpcRouter = typeof trpcRouter
