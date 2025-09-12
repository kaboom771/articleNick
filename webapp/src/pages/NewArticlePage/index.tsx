import { zCreateArticleTrpcInput } from '@articleNick/backend/src/router/createArticle/input'
import { useFormik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter' // Используем другой адаптер вместо 'formik-validator-zod'
import { Input } from '../../components/Input'
import { TextArea } from '../../components/TextArea'
import { Segment } from '../../components/segment'
import { trpc } from '../../lib/trpc'

export const NewArticlePage = () => {
  const createArticle = trpc.createArticle.useMutation()
  const formik = useFormik({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validationSchema: toFormikValidationSchema(zCreateArticleTrpcInput), // передача типов для валидации с учетом другого адаптера
    onSubmit: async (values) => {
      await createArticle.mutateAsync(values)
    },
  })

  return (
    <Segment title="New Article">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
      >
        <Input name="name" label="Name" formik={formik} />
        <Input name="nick" label="Nick" formik={formik} />
        <Input name="description" label="Description" formik={formik} />
        <TextArea name="text" label="Text" formik={formik} />
        {!formik.isValid && !!formik.submitCount && <div style={{ color: 'red' }}>Some fields are invalid</div>}
        <button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Submitting...' : 'Create Article'}
        </button>
      </form>
    </Segment>
  )
}
