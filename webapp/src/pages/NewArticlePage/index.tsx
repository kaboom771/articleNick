import { zCreateArticleTrpcInput } from '@articleNick/backend/src/router/createArticle/input'
import { useFormik } from 'formik'
import { useState } from 'react'
import { toFormikValidationSchema } from 'zod-formik-adapter' // Используем другой адаптер вместо 'formik-validator-zod'
import { Input } from '../../components/Input'
import { TextArea } from '../../components/TextArea'
import { Segment } from '../../components/segment'
import { trpc } from '../../lib/trpc'

export const NewArticlePage = () => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false)
  const [submittingError, setSubmittingError] = useState<string | null>(null)
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
      try {
        await createArticle.mutateAsync(values)
        formik.resetForm()
        setSuccessMessageVisible(true)
        setTimeout(() => {
          setSuccessMessageVisible(false)
        }, 3000)
      } catch (error: any) {
        setSubmittingError(error.message)
        setTimeout(() => {
          setSubmittingError(null)
        }, 3000)
      }
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
        <Input name="description" label="Description" formik={formik} maxWidth={500} />
        <TextArea name="text" label="Text" formik={formik} />
        {!formik.isValid && !!formik.submitCount && <div style={{ color: 'red' }}>Some fields are invalid</div>}
        {!!submittingError && <div style={{ color: 'red' }}>{submittingError}</div>}
        {successMessageVisible && <div style={{ color: 'green' }}>Article created!</div>}
        <button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Submitting...' : 'Create Article'}
        </button>
      </form>
    </Segment>
  )
}
