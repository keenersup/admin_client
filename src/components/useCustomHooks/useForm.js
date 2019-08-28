import { useState, useCallback } from 'react'

export const useForm = (initialState) => {
  const [values, setValues] = useState(initialState)
  const [errors, setErrors] = useState({})

  const onChange = useCallback((event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })
  }, [values])

  const reset = () => {
    setValues(initialState)
    setErrors({})
  }

  const input = {}
  Object.keys(initialState).forEach(key => {
    input[key] = { value: values[key], onChange, name: key, error: !!errors[key] }
  })

  const errorList = []
  Object.values(errors).forEach(error => {
    errorList.push(error)
  })
  /********* ********* ********* ********* ********* ********* ********* ********* *********
   semantic ui Message field must take Array

   const errorList = new Set()
   Object.values(errors).forEach(error => {
    errorList.add(error)
  })

   const input = new Map()
   Object.keys(initialState).forEach((key) => {
    input.set(key, { value: values[key], onChange, name: key, error: !!errors[key] })
  })
   ********* ********* ********* ********* ********* ********* ********* ********* *********/

  return {
    input, values, errorList, setErrors, reset,
    setValues,
    onChange, errors,
  }
}
