import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server'
import { trpc } from '../lib/trpc'

// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { createArticleTrpcRoute } from './articles/createArticle'
import { getArticleTrpcRoute } from './articles/getArticle'
import { getArticlesTrpcRoute } from './articles/getArticles'
import { updateArticleTrpcRoute } from './articles/updateArticle'
import { getMeTrpcRoute } from './auth/getMe'
import { signInTrpcRoute } from './auth/signIn'
import { signUpTrpcRoute } from './auth/signUp'
import { updateProfileTrpcRoute } from './auth/updateProfile'
// @endindex

export const trpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  createArticle: createArticleTrpcRoute,
  getArticle: getArticleTrpcRoute,
  getArticles: getArticlesTrpcRoute,
  updateArticle: updateArticleTrpcRoute,
  getMe: getMeTrpcRoute,
  signIn: signInTrpcRoute,
  signUp: signUpTrpcRoute,
  updateProfile: updateProfileTrpcRoute,
  // @endindex
})

export type TrpcRouter = typeof trpcRouter
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>
