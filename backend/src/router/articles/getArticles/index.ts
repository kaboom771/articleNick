import { trpc } from '../../../lib/trpc'
import { zGetArticlesTrpcInput } from './input'

export const getArticlesTrpcRoute = trpc.procedure.input(zGetArticlesTrpcInput).query(async ({ ctx, input }) => {
  const articles = await ctx.prisma.article.findMany({
    select: {
      id: true,
      nick: true,
      name: true,
      description: true,
      createdAt: true,
      serialNumber: true,
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

  const nextArticle = articles.at(input.limit)
  const nextCursor = nextArticle?.serialNumber
  const ArticlesExceptNext = articles.slice(0, input.limit)

  return { articles: ArticlesExceptNext, nextCursor }
})
