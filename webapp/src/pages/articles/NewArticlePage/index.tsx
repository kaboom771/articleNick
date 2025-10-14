import { zCreateArticleTrpcInput } from '@articleNick/backend/src/router/articles/createArticle/input'
import { Alert } from '../../../components/Alert'
import { Button } from '../../../components/Button'
import { FormItems } from '../../../components/FormItems'
import { Input } from '../../../components/Input'
import { TextArea } from '../../../components/TextArea'
import { Segment } from '../../../components/segment'
import { useForm } from '../../../lib/form'
import { withPageWrapper } from '../../../lib/pageWrapper'
import { trpc } from '../../../lib/trpc'

export const NewArticlePage = withPageWrapper({
  authorizedOnly: true,
  title: 'Add Article'
})(() => {
  const createArticle = trpc.createArticle.useMutation()
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validationSchema: zCreateArticleTrpcInput, // передача типов для валидации с учетом другого адаптера
    onSubmit: async (values) => {
      await createArticle.mutateAsync(values)
      formik.resetForm()
    },
    successMessage: 'Article created',
    showValidationAlert: true,
  })

  return (
    <Segment title="New Article">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
      >
        <FormItems>
          <Input name="name" label="Name" formik={formik} />
          <Input name="nick" label="Nick" formik={formik} />
          <Input name="description" label="Description" formik={formik} maxWidth={500} />
          <TextArea name="text" label="Text" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Create Article</Button>
        </FormItems>
      </form>
    </Segment>
  )
})
