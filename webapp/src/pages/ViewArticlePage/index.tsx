// import { format } from 'date-fns/format'
import { useParams } from 'react-router-dom'
import { LinkButton } from '../../components/Button'
import { Segment } from '../../components/segment'
import { getEditArticleRoute, ViewArticleRouteParams } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import css from './index.module.scss'

export const ViewArticlePage = () => {
  const { articleNick } = useParams() as ViewArticleRouteParams

  const getArticleResult = trpc.getArticle.useQuery({
    articleNick,
  })
  const getMeResult = trpc.getMe.useQuery()

  if (getArticleResult.isLoading || getArticleResult.isFetching || getMeResult.isLoading || getMeResult.isFetching) {
    return <span>Loading...</span>
  }

  if (getArticleResult.isError) {
    return <span>Error: {getArticleResult.error.message}</span>
  }

  if (getMeResult.isError) {
    return <span>Error: {getMeResult.error.message}</span>
  }

  if (!getArticleResult.data.article) {
    return <span>Article not found</span>
  }

  const article = getArticleResult.data.article
  const me = getMeResult.data.me

  return (
    <Segment title={article.name} description={article.description}>
      {/* <div className={css.createdAt}>Created At: {format(article.createdAt, 'yyyy-MM-dd')}</div> */}
      <div className={css.author}>Author: {article.author.nick}</div>
      <div className={css.text} dangerouslySetInnerHTML={{ __html: article.text }} />
      {me?.id === article.authorId && (
        <div className={css.editButton}>
          <LinkButton to={getEditArticleRoute({ articleNick: article.nick })}>Edit Idea</LinkButton>
        </div>
      )}
    </Segment>
  )
}
