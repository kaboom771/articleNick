import type { TrpcRouterOutput } from '@articleNick/backend/src/router'
import { zUpdateArticleTrpcInput } from '@articleNick/backend/src/router/updateArticle/input'
import { useFormik } from 'formik'
import pick from 'lodash/pick'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
// import { withZodSchema } from 'formik-validator-zod'
import { toFormikValidationSchema } from 'zod-formik-adapter' // Используем другой адаптер вместо 'formik-validator-zod'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { FormItems } from '../../components/FormItems'
import { Input } from '../../components/Input'
import { TextArea } from '../../components/TextArea'
import { Segment } from '../../components/segment'
import { type EditArticleRouteParams, getViewArticleRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'

const EditArticleComponent = ({ article }: { article: NonNullable<TrpcRouterOutput['getArticle']['article']> }) => {
  const navigate = useNavigate()
  const [submittingError, setSubmittingError] = useState<string | null>(null)
  const updateArticle = trpc.updateArticle.useMutation()
  const formik = useFormik({
    initialValues: pick(article, ['name', 'nick', 'description', 'text']),
    validationSchema: toFormikValidationSchema(zUpdateArticleTrpcInput.omit({ articleId: true })), // передача типов для валидации с учетом другого адаптера
    onSubmit: async (values) => {
      try {
        setSubmittingError(null)
        await updateArticle.mutateAsync({ articleId: article.id, ...values })
        navigate(getViewArticleRoute({ articleNick: values.nick }))
      } catch (err: any) {
        setSubmittingError(err.message)
      }
    },
  })

  return (
    <Segment title={`Edit Idea: ${article.nick}`}>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Name" name="name" formik={formik} />
          <Input label="Nick" name="nick" formik={formik} />
          <Input label="Description" name="description" maxWidth={500} formik={formik} />
          <TextArea label="Text" name="text" formik={formik} />
          {!formik.isValid && !!formik.submitCount && <Alert color="red">Some fields are invalid</Alert>}
          {submittingError && <Alert color="red">{submittingError}</Alert>}
          <Button loading={formik.isSubmitting}>Update Idea</Button>
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
  const getMeResult = trpc.getMe.useQuery()

  if (getArticleResult.isLoading || getArticleResult.isFetching || getMeResult.isLoading || getMeResult.isFetching) {
    return <span>Loading...</span>
  }

  if (getArticleResult.isError) {
    return <span>Error: {getArticleResult.error.message}</span>
  }

  if (getMeResult.isError) {
    return <span>Error: {getMeResult.error.message}</span>
  }

  if (!getArticleResult.data.article) {
    return <span>Idea not found</span>
  }

  const article = getArticleResult.data.article
  const me = getMeResult.data.me

  if (!me) {
    return <span>Only for authorized</span>
  }

  if (me.id !== article.authorId) {
    return <span>An article can only be edited by the author</span>
  }

  return <EditArticleComponent article={article} />
}
