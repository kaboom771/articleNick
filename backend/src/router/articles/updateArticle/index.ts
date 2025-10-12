import { trpc } from '../../../lib/trpc'
import { canEditArticle } from '../../../utils/can'
import { zUpdateArticleTrpcInput } from './input'

export const updateArticleTrpcRoute = trpc.procedure.input(zUpdateArticleTrpcInput).mutation(async ({ ctx, input }) => {
  const { articleId, ...articleInput } = input
  if (!ctx.me) {
    throw new Error('UNAUTHORIZED')
  }
  const article = await ctx.prisma.article.findUnique({
    where: {
      id: articleId,
    },
  })
  if (!article) {
    throw new Error('NOT_FOUND')
  }
  if (canEditArticle(ctx.me, article)) {
    throw new Error('NOT_YOUR_ARTICLE')
  }
  if (article.nick !== input.nick) {
    const exArticle = await ctx.prisma.article.findUnique({
      where: {
        nick: input.nick,
      },
    })
    if (exArticle) {
      throw new Error('Article with this nick already exists')
    }
  }
  await ctx.prisma.article.update({
    where: {
      id: articleId,
    },
    data: {
      ...articleInput,
    },
  })
  return true
})
