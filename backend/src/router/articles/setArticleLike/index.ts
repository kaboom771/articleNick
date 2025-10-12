import { trpc } from '../../../lib/trpc'
import { zSetArticleLikeIdeaTrpcInput } from './input'

export const setArticleLikeTrpcRoute = trpc.procedure
  .input(zSetArticleLikeIdeaTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const { articleId, isLikedByMe } = input
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
    if (isLikedByMe) {
      await ctx.prisma.articleLike.upsert({
        where: {
          articleId_userId: {
            articleId,
            userId: ctx.me.id,
          },
        },
        create: {
          userId: ctx.me.id,
          articleId,
        },
        update: {},
      })
    } else {
      await ctx.prisma.articleLike.delete({
        where: {
          articleId_userId: {
            articleId,
            userId: ctx.me.id,
          },
        },
      })
    }
    const likesCount = await ctx.prisma.articleLike.count({
      where: {
        articleId,
      },
    })
    return {
      article: {
        id: article.id,
        likesCount,
        isLikedByMe,
      },
    }
  })
