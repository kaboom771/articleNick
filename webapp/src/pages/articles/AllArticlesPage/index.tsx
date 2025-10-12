import { zGetArticlesTrpcInput } from '@articleNick/backend/src/router/articles/getArticles/input'
import InfiniteScroll from 'react-infinite-scroller'
import { Link } from 'react-router-dom'
import { useDebounce } from 'usehooks-ts'
import { Alert } from '../../../components/Alert'
import { Input } from '../../../components/Input'
import { layoutContentElRef } from '../../../components/Layout'
import { Loader } from '../../../components/Loader'
import { Segment } from '../../../components/segment'
import { useForm } from '../../../lib/form'
import { getViewArticleRoute } from '../../../lib/routes'
import { trpc } from '../../../lib/trpc'
import css from './index.module.scss'

export const AllAIrticlesPage = () => {
  const { formik } = useForm({
    initialValues: { search: '' },
    validationSchema: zGetArticlesTrpcInput.pick({ search: true }),
  })
  const search = useDebounce(formik.values.search, 1000)
  const { data, error, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage, isRefetching } =
    trpc.getArticles.useInfiniteQuery(
      {
        search,
      },
      {
        getNextPageParam: (lastPage) => {
          return lastPage.nextCursor
        },
      })

  //console.log({ data })

  return (
    <Segment title="All Articles">
      <div className={css.filter}>
        <Input maxWidth={'100%'} label="Search" name="search" formik={formik} />
      </div>
      {isLoading || isRefetching ? (
        <Loader type="section" />
      ) : isError ? (
        <Alert color="red">{error.message}</Alert>
      ) : !data.pages[0].articles.length ? (
        <Alert color="brown">Nothing found by search</Alert>
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
                <Loader type="section" />
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
                  >
                    Likes: {article.likesCount}
                  </Segment>
                </div>
              ))}
          </InfiniteScroll>
        </div>
      )}
    </Segment>
  )
}