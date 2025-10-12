import { TrpcRouterOutput } from '@articleNick/backend/src/router'
import { Alert } from '../../../../components/Alert'
import { Button } from '../../../../components/Button'
import { FormItems } from '../../../../components/FormItems'
import { useForm } from '../../../../lib/form'
import { trpc } from '../../../../lib/trpc'

export const BlockArticle = ({ article }: { article: NonNullable<TrpcRouterOutput['getArticle']['article']> }) => {
  const blockArticle = trpc.blockArticle.useMutation()
  const trpcUtils = trpc.useUtils()
  const { formik, alertProps, buttonProps } = useForm({
    onSubmit: async () => {
      await blockArticle.mutateAsync({ articleId: article.id })
      await trpcUtils.getArticle.refetch({ articleNick: article.nick })
    },
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <FormItems>
        <Alert {...alertProps} />
        <Button color="red" {...buttonProps}>
          Block Article
        </Button>
      </FormItems>
    </form>
  )
}
