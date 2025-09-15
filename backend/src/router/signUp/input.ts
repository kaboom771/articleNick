import { z } from 'zod'

export const zSignUpTrpcInput = z.object({
  nick: z
    .string('Nick must be not empty')
    .min(1)
    .regex(/^[a-z0-9-]+$/, 'Nick may contain only lowercase letters, numbers and dashes'),
  password: z.string('Password must be not empty').min(3),
})
