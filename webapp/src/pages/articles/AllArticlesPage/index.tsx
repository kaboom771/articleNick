import { Link } from 'react-router-dom'
import { Segment } from '../../../components/segment'
import { getViewArticleRoute } from '../../../lib/routes'
import { trpc } from '../../../lib/trpc'
import css from './index.module.scss'

export const AllAIrticlesPage = () => {
  const { data, error, isLoading, isFetching, isError } = trpc.getArticles.useQuery()

  if (isLoading || isFetching) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <Segment title="All Articles">
      <div className={css.articles}>
        {data.articles.map((article) => (
          <div className={css.article} key={article.nick}>
            <Segment
              size={2}
              title={
                <Link className={css.articleLink} to={getViewArticleRoute({ articleNick: article.nick })}>
                  {article.name}
                </Link>
              }
              description={article.description}
            />
          </div>
        ))}
      </div>
    </Segment>
  )
}
