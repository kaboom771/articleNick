import { z } from 'zod'

export const zCreateArticleTrpcInput = z.object({
  // name: z.string('123').min(1, 'Name must contain at least 1 character'),
  // nick: z
  //   .string('kpab')
  //   .min(1, 'Nick must contain at least 1 character')
  //   .regex(/^[a-z0-9-]+$/, 'Nick may contain only lowercase letters, numbers and dashes'),
  // description: z.string().min(1, 'Description must contain at least 1 character'),
  // text: z.string().min(100, 'Text should be at least 100 characters long'),
  name: z.string().min(3),
  nick: z
    .string()
    .min(3)
    .regex(/^[a-z0-9-]+$/, 'Nick may contain only lowercase letters, numbers and dashes'),
  description: z.string(),
  text: z.string().min(100),
})
