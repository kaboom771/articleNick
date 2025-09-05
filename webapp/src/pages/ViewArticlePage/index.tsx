import { useParams } from 'react-router-dom'
import { ViewArticleRouteParams } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import css from './index.module.scss'

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
      <h1 className={css.title}>{data.article.name}</h1>
      <p className={css.description}>{data.article.description}</p>
      <div className={css.text} dangerouslySetInnerHTML={{ __html: data.article.text }} />
    </div>
  )
}
