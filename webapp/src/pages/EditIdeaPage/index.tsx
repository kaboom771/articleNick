import type { TrpcRouterOutput } from '@articleNick/backend/src/router'
import { zUpdateArticleTrpcInput } from '@articleNick/backend/src/router/updateArticle/input'
import pick from 'lodash/pick'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { FormItems } from '../../components/FormItems'
import { Input } from '../../components/Input'
import { TextArea } from '../../components/TextArea'
import { Segment } from '../../components/segment'
import { useMe } from '../../lib/ctx'
import { useForm } from '../../lib/form'
import { type EditArticleRouteParams, getViewArticleRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'

const EditArticleComponent = ({ article }: { article: NonNullable<TrpcRouterOutput['getArticle']['article']> }) => {
  const navigate = useNavigate()
  const updateArticle = trpc.updateArticle.useMutation()
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: pick(article, ['name', 'nick', 'description', 'text']),
    validationSchema: zUpdateArticleTrpcInput.omit({ articleId: true }), // передача типов для валидации с учетом другого адаптера
    onSubmit: async (values) => {
      await updateArticle.mutateAsync({ articleId: article.id, ...values })
      navigate(getViewArticleRoute({ articleNick: values.nick }))
    },
    resetOnSuccess: false,
    showValidationAlert: true,
  })

  return (
    <Segment title={`Edit Idea: ${article.nick}`}>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Name" name="name" formik={formik} />
          <Input label="Nick" name="nick" formik={formik} />
          <Input label="Description" name="description" maxWidth={500} formik={formik} />
          <TextArea label="Text" name="text" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Update Article</Button>
        </FormItems>
      </form>
    </Segment>
  )
}

export const EditArticlePage = () => {
  const { articleNick } = useParams() as EditArticleRouteParams

  const getArticleResult = trpc.getArticle.useQuery({
    articleNick,
  })
  const me = useMe()

  if (getArticleResult.isLoading || getArticleResult.isFetching) {
    return <span>Loading...</span>
  }

  if (getArticleResult.isError) {
    return <span>Error: {getArticleResult.error.message}</span>
  }

  if (!getArticleResult.data.article) {
    return <span>Idea not found</span>
  }

  const article = getArticleResult.data.article

  if (!me) {
    return <span>Only for authorized</span>
  }

  if (me.id !== article.authorId) {
    return <span>An article can only be edited by the author</span>
  }

  return <EditArticleComponent article={article} />
}
