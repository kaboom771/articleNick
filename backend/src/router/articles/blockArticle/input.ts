import { z } from 'zod'

export const zBlockArticleTrpcInput = z.object({
  articleId: z.string().min(1),
})
