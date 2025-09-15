import { format } from 'date-fns/format'
import { useParams } from 'react-router-dom'
import { Segment } from '../../components/segment'
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
    <Segment title={data.article.name} description={data.article.description}>
      <div className={css.createdAt}>Created At: {format(data.article.createdAt, 'yyyy-MM-dd')}</div>
      <div className={css.text} dangerouslySetInnerHTML={{ __html: data.article.text }} />
    </Segment>
  )
}
