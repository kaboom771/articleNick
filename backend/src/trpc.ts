import { initTRPC } from '@trpc/server'

const articles = [
  {
    nick: 'article nick 1',
    name: 'article 1',
    description: 'description of article 1',
  },
  {
    nick: 'article nick 2',
    name: 'article 2',
    description: 'description of article 2',
  },
  {
    nick: 'article nick 3',
    name: 'article 3',
    description: 'description of article 3',
  },
  {
    nick: 'article nick 4',
    name: 'article 4',
    description: 'description of article 4',
  },
  {
    nick: 'article nick 5',
    name: 'article 5',
    description: 'description of article 5',
  },
]

const trpc = initTRPC.create()

export const trpcRouter = trpc.router({
  getArticles: trpc.procedure.query(() => {
    return { articles }
  }),
})

export type trpcRouter = typeof trpcRouter
