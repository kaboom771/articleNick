import { z } from 'zod'
import { zCreateArticleTrpcInput } from '../createArticle/input'

export const zUpdateArticleTrpcInput = zCreateArticleTrpcInput.extend({
  articleId: z.string().min(3),
})
