import _ from 'lodash'
import { z } from 'zod'
import { trpc } from '../../../lib/trpc'

export const getArticleTrpcRoute = trpc.procedure
  .input(
    z.object({
      articleNick: z.string(),
    })
  )
  .query(async ({ ctx, input }) => {
    const rawArticle = await ctx.prisma.article.findUnique({
      where: {
        nick: input.articleNick,
      },
      include: {
        author: {
          select: {
            id: true,
            nick: true,
          },
        },
        articlesLikes: {
          select: {
            id: true,
          },
          where: {
            userId: ctx.me?.id,
          },
        },
        _count: {
          select: {
            articlesLikes: true,
          },
        },
      },
    })
    if (rawArticle?.blockedAt) {
      throw new Error('Article is blocked by administrator')
    }
    const isLikedByMe = !!rawArticle?.articlesLikes.length
    const likesCount = rawArticle?._count.articlesLikes || 0
    const article = rawArticle && { ..._.omit(rawArticle, ['articlesLikes', '_count']), isLikedByMe, likesCount }

    return { article }
  })
