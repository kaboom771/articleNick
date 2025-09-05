import { Link } from 'react-router-dom'
import { getViewArticleRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
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
    <div>
      <h1 className={css.title}>All Articles</h1>
      <div className={css.articles}>
        {data.articles.map((article) => (
          <div className={css.article} key={article.nick}>
            <h2 className={css.articleName}>
              <Link className={css.articleLink} to={getViewArticleRoute({ articleNick: article.nick })}>
                {article.name}
              </Link>
            </h2>
            <p className={css.articleDescription}>{article.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
