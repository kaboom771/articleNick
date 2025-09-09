/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormikProps } from 'formik'

export const Input = ({ name, label, formik }: { name: string; label: string; formik: FormikProps<any> }) => {
  const value = formik.values[name]
  return (
    <div style={{ marginBottom: 10 }}>
      <label htmlFor={name}>{label}</label>
      <br />
      <input
        type="text"
        onChange={async (e) => {
          await formik.setFieldValue(name, e.target.value)
        }}
        value={value}
        name={name}
        id={name}
      />
    </div>
  )
}
