import { z } from 'zod'

export const zSignInTrpcInput = z.object({
  nick: z.string('Nick must be not empty').min(3),
  password: z.string('Password must be not empty').min(3),
})
