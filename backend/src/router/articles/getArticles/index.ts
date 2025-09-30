import { trpc } from '../../../lib/trpc'

export const getArticlesTrpcRoute = trpc.procedure.query(async ({ ctx }) => {
  const articles = await ctx.prisma.article.findMany({
    select: {
      id: true,
      nick: true,
      name: true,
      description: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return { articles }
})
