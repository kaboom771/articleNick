import InfiniteScroll from 'react-infinite-scroller'
import { Link } from 'react-router-dom'
import { Alert } from '../../../components/Alert'
import { layoutContentElRef } from '../../../components/Layout'
import { Segment } from '../../../components/segment'
import { getViewArticleRoute } from '../../../lib/routes'
import { trpc } from '../../../lib/trpc'
import css from './index.module.scss'

export const AllAIrticlesPage = () => {
  const { data, error, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage, isRefetching } =
    trpc.getArticles.useInfiniteQuery(
      {
        limit: 2
      },
      {
        getNextPageParam: (lastPage) => {
          return lastPage.nextCursor
        },
      })

  console.log({ data })

  return (
    <Segment title="All Articles">
      {isLoading || isRefetching ? (
        <div>Loading...</div>
      ) : isError ? (
        <Alert color="red">{error.message}</Alert>
      ) : (
        <div className={css.articles}>
          <InfiniteScroll
            threshold={250}
            loadMore={() => {
              if (!isFetchingNextPage && hasNextPage) {
                void fetchNextPage()
              }
            }}
            hasMore={hasNextPage}
            loader={
              <div className={css.more} key="loader">
                Loading...
              </div>
            }
            getScrollParent={() => layoutContentElRef.current}
            useWindow={(layoutContentElRef.current && getComputedStyle(layoutContentElRef.current).overflow) !== 'auto'}
          >
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
          </InfiniteScroll>
        </div>
      )}
    </Segment>
  )
}