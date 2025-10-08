import { Link } from 'react-router-dom'
import { Alert } from '../../../components/Alert'
import { Segment } from '../../../components/segment'
import { getViewArticleRoute } from '../../../lib/routes'
import { trpc } from '../../../lib/trpc'
import css from './index.module.scss'

export const AllAIrticlesPage = () => {
  const { data, error, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage, isRefetching } = trpc.getArticles.useInfiniteQuery({
    limit: 2
  }, {
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor
    },
  })

  return (
    <Segment title="All Articles">
      {isLoading || isRefetching ? (
        <div>Loading...</div>
      ) : isError ? (
        <Alert color="red">{error.message}</Alert>
      ) : (
        <div className={css.articles}>
          {data.pages
            .flatMap((page) => page.articles)
            .map((article) => (
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
          <div className={css.more}>
            {hasNextPage && !isFetchingNextPage && (
              <button
                onClick={() => {
                  void fetchNextPage()
                }}
              >
                Load more
              </button>
            )}
            {isFetchingNextPage && <span>Loading...</span>}
          </div>
        </div>
      )}
    </Segment>
  )
}