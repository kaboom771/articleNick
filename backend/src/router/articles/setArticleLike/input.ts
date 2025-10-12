import { z } from 'zod'

export const zSetArticleLikeIdeaTrpcInput = z.object({
  articleId: z.string().min(1),
  isLikedByMe: z.boolean(),
})
