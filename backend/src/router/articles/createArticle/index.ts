import { trpc } from '../../../lib/trpc'
import { zCreateArticleTrpcInput } from './input'

export const createArticleTrpcRoute = trpc.procedure.input(zCreateArticleTrpcInput).mutation(async ({ input, ctx }) => {
  if (!ctx.me) {
    throw Error('UNAUTHORIZED')
  }
  const exArticle = await ctx.prisma.article.findUnique({
    where: {
      nick: input.nick,
    },
  })

  if (exArticle) {
    throw Error('Artickle with this nick already exist')
  }
  await ctx.prisma.article.create({
    data: { ...input, authorId: ctx.me.id },
  })
  return true
})
