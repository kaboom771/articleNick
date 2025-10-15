import { TrpcRouterOutput } from '@articleNick/backend/src/router'
import { Icon } from '../../../../components/icon'
import { trpc } from '../../../../lib/trpc'
import css from '../index.module.scss'

export const LikeButton = ({ article }: { article: NonNullable<TrpcRouterOutput['getArticle']['article']> }) => {
  const trpcUtils = trpc.useUtils()
  const setArticleLike = trpc.setArticleLike.useMutation({
    onMutate: ({ isLikedByMe }) => {
      const oldGetArticleData = trpcUtils.getArticle.getData({ articleNick: article.nick })
      if (oldGetArticleData?.article) {
        const newGetArticleData = {
          ...oldGetArticleData,
          article: {
            ...oldGetArticleData.article,
            isLikedByMe,
            likesCount: oldGetArticleData.article.likesCount + (isLikedByMe ? 1 : -1),
          },
        }
        trpcUtils.getArticle.setData({ articleNick: article.nick }, newGetArticleData)
      }
    },
    onSuccess: () => {
      void trpcUtils.getArticle.invalidate({ articleNick: article.nick })
    },
  })
  return (
    <button
      className={css.likeButton}
      onClick={() => {
        void setArticleLike.mutateAsync({ articleId: article.id, isLikedByMe: !article.isLikedByMe })
      }}
    >
      <Icon size={32} className={css.likeIcon} name={article.isLikedByMe ? 'likeFilled' : 'likeEmpty'} />
    </button>
  )
}
