import express from 'express'

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

const expressApp = express()
expressApp.get('/ping', (req, res) => {
  res.send('pong')
})

expressApp.get('/articles', (req, res) => {
  res.send(articles)
})

expressApp.listen(3000, () => {
  console.info('Listening at http://localhost:3000')
})
