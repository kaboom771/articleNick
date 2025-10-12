import { trpc } from '../../../lib/trpc'
import { canBlockArticles } from '../../../utils/can'
import { zBlockArticleTrpcInput } from './input'

export const blockArticleTrpcRoute = trpc.procedure.input(zBlockArticleTrpcInput).mutation(async ({ ctx, input }) => {
  const { articleId } = input
  if (!canBlockArticles(ctx.me)) {
    throw new Error('PERMISSION_DENIED')
  }
  const article = await ctx.prisma.article.findUnique({
    where: {
      id: articleId,
    },
  })
  if (!article) {
    throw new Error('NOT_FOUND')
  }
  await ctx.prisma.article.update({
    where: {
      id: articleId,
    },
    data: {
      blockedAt: new Date(),
    },
  })
  return true
})
