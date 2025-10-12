import _ from 'lodash'
import { trpc } from '../../../lib/trpc'
import { zGetArticlesTrpcInput } from './input'

export const getArticlesTrpcRoute = trpc.procedure.input(zGetArticlesTrpcInput).query(async ({ ctx, input }) => {
  const normalizedSearch = input.search ? input.search.trim().replace(/[\s\n\t]/g, '_') : undefined
  //const normalizedSearch = input.search ? input.search.trim().replace(/[\s\n\t]/g, ' & ') : undefined
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
    where: {
      blockedAt: null,
      ...(!normalizedSearch
        ? {}
        : {
            OR: [
              {
                name: {
                  search: normalizedSearch,
                },
              },
              {
                description: {
                  search: normalizedSearch,
                },
              },
              {
                text: {
                  search: normalizedSearch,
                },
              },
            ],
          }),
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
