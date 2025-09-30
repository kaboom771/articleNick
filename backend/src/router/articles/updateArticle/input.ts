import { z } from 'zod'
import { zCreateArticleTrpcInput } from '../../articles/createArticle/input'

export const zUpdateArticleTrpcInput = zCreateArticleTrpcInput.extend({
  articleId: z.string().min(3),
})
