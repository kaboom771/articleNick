export const App = () => {
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
  return (
    <div>
      <h1>ArticleNick</h1>
      {articles.map((article) => {
        return (
          <div key={article.nick}>
            <h2>{article.name}</h2>
            <p>{article.description}</p>
          </div>
        )
      })}
    </div>
  )
}
