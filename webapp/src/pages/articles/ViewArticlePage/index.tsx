// import { format } from 'date-fns/format'
import { useParams } from 'react-router-dom'
import { LinkButton } from '../../../components/Button'
import { Segment } from '../../../components/segment'
import { withPageWrapper } from '../../../lib/pageWrapper'
import { getEditArticleRoute, ViewArticleRouteParams } from '../../../lib/routes'
import { trpc } from '../../../lib/trpc'
import css from './index.module.scss'

export const ViewArticlePage = withPageWrapper({
  useQuery: () => {
    const { articleNick } = useParams() as ViewArticleRouteParams
    return trpc.getArticle.useQuery({
      articleNick,
    })
  },
  setProps: ({ queryResult, checkExists, ctx }) => ({
    article: checkExists(queryResult.data.article, 'Article not found'),
    me: ctx.me,
  }),
})(({ article, me }) => (
  <Segment title={article.name} description={article.description}>
    {/* <div className={css.createdAt}>Created At: {format(article.createdAt, 'yyyy-MM-dd')}</div> */}
    <div className={css.author}>Author: {article.author.nick}</div>
    <div className={css.text} dangerouslySetInnerHTML={{ __html: article.text }} />
    {me?.id === article.authorId && (
      <div className={css.editButton}>
        <LinkButton to={getEditArticleRoute({ articleNick: article.nick })}>Edit Article</LinkButton>
      </div>
    )}
  </Segment>
))
