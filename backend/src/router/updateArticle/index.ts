import { trpc } from '../../lib/trpc'
import { zUpdateArticleTrpcInput } from './input'

export const updateArticleTrpcRoute = trpc.procedure.input(zUpdateArticleTrpcInput).mutation(async ({ ctx, input }) => {
  const { articleId, ...articleInput } = input
  if (!ctx.me) {
    throw new Error('UNAUTHORIZED')
  }
  const idea = await ctx.prisma.article.findUnique({
    where: {
      id: articleId,
    },
  })
  if (!idea) {
    throw new Error('NOT_FOUND')
  }
  if (ctx.me.id !== idea.authorId) {
    throw new Error('NOT_YOUR_ARTICLE')
  }
  if (idea.nick !== input.nick) {
    const exIdea = await ctx.prisma.article.findUnique({
      where: {
        nick: input.nick,
      },
    })
    if (exIdea) {
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
