// import { format } from 'date-fns/format'
import { useParams } from 'react-router-dom'
import { LinkButton } from '../../components/Button'
import { Segment } from '../../components/segment'
import { withPageWrapper } from '../../lib/pageWrapper'
import { getEditArticleRoute, ViewArticleRouteParams } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import css from './index.module.scss'

export const ViewArticlePage = withPageWrapper({
  useQuery: () => {
    const { articleNick } = useParams() as ViewArticleRouteParams
    return trpc.getArticle.useQuery({
      articleNick,
    })
  },
  checkExists: ({ queryResult }) => !!queryResult.data.article,
  checkExistsMessage: 'Article not found',
  setProps: ({ queryResult, ctx }) => ({
    idea: queryResult.data.article!,
    me: ctx.me,
  }),
})(({ idea, me }) => (
  <Segment title={idea.name} description={idea.description}>
    {/* <div className={css.createdAt}>Created At: {format(idea.createdAt, 'yyyy-MM-dd')}</div> */}
    <div className={css.author}>Author: {idea.author.nick}</div>
    <div className={css.text} dangerouslySetInnerHTML={{ __html: idea.text }} />
    {me?.id === idea.authorId && (
      <div className={css.editButton}>
        <LinkButton to={getEditArticleRoute({ articleNick: idea.nick })}>Edit Article</LinkButton>
      </div>
    )}
  </Segment>
))
