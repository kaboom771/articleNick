import _ from 'lodash'
import { articles } from '../../lib/articles'
import { trpc } from '../../lib/trpc'

export const getArticlesTrpcRoute = trpc.procedure.query(() => {
  return { articles: articles.map((article) => _.pick(article, ['nick', 'name', 'description'])) }
})
