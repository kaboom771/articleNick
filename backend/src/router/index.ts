import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server'
import { trpc } from '../lib/trpc'

// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { createArticleTrpcRoute } from './createArticle'
import { getArticleTrpcRoute } from './getArticle'
import { getArticlesTrpcRoute } from './getArticles'
import { getMeTrpcRoute } from './getMe'
import { signInTrpcRoute } from './signIn'
import { signUpTrpcRoute } from './signUp'
import { updateArticleTrpcRoute } from './updateArticle'
// @endindex

export const trpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  createArticle: createArticleTrpcRoute,
  getArticle: getArticleTrpcRoute,
  getArticles: getArticlesTrpcRoute,
  getMe: getMeTrpcRoute,
  signIn: signInTrpcRoute,
  signUp: signUpTrpcRoute,
  updateArticle: updateArticleTrpcRoute,
  // @endindex
})

export type TrpcRouter = typeof trpcRouter
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>
