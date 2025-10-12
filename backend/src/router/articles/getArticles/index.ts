import _ from 'lodash'
import { trpc } from '../../../lib/trpc'
import { zGetArticlesTrpcInput } from './input'

export const getArticlesTrpcRoute = trpc.procedure.input(zGetArticlesTrpcInput).query(async ({ ctx, input }) => {
  const rawArticles = await ctx.prisma.article.findMany({
    select: {
      id: true,
      nick: true,
      name: true,
      description: true,
      createdAt: true,
      serialNumber: true,
      _count: {
        select: {
          articlesLikes: true,
        },
      },
    },
    orderBy: [
      {
        createdAt: 'desc',
      },
      {
        serialNumber: 'desc',
      },
    ],
    cursor: input.cursor ? { serialNumber: input.cursor } : undefined,
    take: input.limit + 1,
  })

  const nextArticle = rawArticles.at(input.limit)
  const nextCursor = nextArticle?.serialNumber
  const rawArticlesExceptNext = rawArticles.slice(0, input.limit)
  const articlesExceptNext = rawArticlesExceptNext.map((article) => ({
    ..._.omit(article, ['_count']),
    likesCount: article._count.articlesLikes,
  }))

  return { articles: articlesExceptNext, nextCursor }
})
