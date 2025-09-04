import { useParams } from 'react-router-dom'
import { ViewArticleRouteParams } from '../../lib/routes'
import { trpc } from '../../lib/trpc'

export const ViewArticlePage = () => {
  const { articleNick } = useParams() as ViewArticleRouteParams

  const { data, error, isLoading, isFetching, isError } = trpc.getArticle.useQuery({
    articleNick,
  })

  if (isLoading || isFetching) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  if (!data.article) {
    return <span>Idea not found</span>
  }

  return (
    <div>
      <h1>{data.article.name}</h1>
      <p>{data.article.description}</p>
      <div dangerouslySetInnerHTML={{ __html: data.article.text }} />
    </div>
  )
}
