import { useFormik } from 'formik'
import { Input } from '../../components/Input'
import { TextArea } from '../../components/TextArea'
import { Segment } from '../../components/segment'

export const NewArticlePage = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    onSubmit: (values) => {
      console.info('Submitted', values)
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

        <button type="submit">Create Article</button>
      </form>
    </Segment>
  )
}
