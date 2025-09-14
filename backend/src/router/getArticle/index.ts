import { z } from 'zod'
import { trpc } from '../../lib/trpc'

export const getArticleTrpcRoute = trpc.procedure
  .input(
    z.object({
      articleNick: z.string(),
    })
  )
  .query(async ({ ctx, input }) => {
    const article = await ctx.prisma.article.findUnique({
      where: {
        nick: input.articleNick,
      },
    })
    return { article }
  })
