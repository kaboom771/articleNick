/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormikProps } from 'formik'

export const TextArea = ({ name, label, formik }: { name: string; label: string; formik: FormikProps<any> }) => {
  const value = formik.values[name]
  const error = formik.errors[name] as string | undefined
  return (
    <div style={{ marginBottom: 10 }}>
      <label htmlFor={name}>{label}</label>
      <br />
      <textarea
        onChange={async (e) => {
          await formik.setFieldValue(name, e.target.value)
        }}
        value={value}
        name={name}
        id={name}
      />
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  )
}
