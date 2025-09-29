import { zUpdateArticleTrpcInput } from '@articleNick/backend/src/router/updateArticle/input'
import pick from 'lodash/pick'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { FormItems } from '../../components/FormItems'
import { Input } from '../../components/Input'
import { TextArea } from '../../components/TextArea'
import { Segment } from '../../components/segment'
import { useForm } from '../../lib/form'
import { withPageWrapper } from '../../lib/pageWrapper'
import { type EditArticleRouteParams, getViewArticleRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'

export const EditArticlePage = withPageWrapper({
  authorizedOnly: true,
  useQuery: () => {
    const { articleNick } = useParams() as EditArticleRouteParams
    return trpc.getArticle.useQuery({
      articleNick,
    })
  },
  checkExists: ({ queryResult }) => !!queryResult.data.article,
  checkExistsMessage: 'Article not found',
  checkAccess: ({ queryResult, ctx }) => !!ctx.me && ctx.me.id === queryResult.data.article?.authorId,
  checkAccessMessage: 'An article can only be edited by the author',
  setProps: ({ queryResult }) => ({
    article: queryResult.data.article!,
  }),
})(({ article }) => {
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
})
