import { trpc } from '../../lib/trpc'

export const AllAIrticlesPage = () => {
  const { data, error, isLoading, isFetching, isError } = trpc.getArticles.useQuery()

  if (isLoading || isFetching) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <div>
      <h1>ArticleNick</h1>
      {data.articles.map((article) => {
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
