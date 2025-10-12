import { z } from 'zod'

export const zSetArticleLikeTrpcInput = z.object({
  articleId: z.string().min(1),
  isLikedByMe: z.boolean(),
})
