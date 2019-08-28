import React, { useContext } from 'react';
import { AuthContext } from "../context/authContext";
// import { useMutation } from "react-apollo-hooks";
import { useMutation } from "@apollo/react-hooks";

import { useForm } from "../components/useCustomHooks/useForm";
import { ALLUSERS_QUERY } from "../graphqls/allUsersQuery";
import { REGISTER_MUTATION } from "../graphqls/registerMutation";
import RegisterForm from "../components/accounts/RegisterForm";
import { useGenerateFingerprint } from "../components/useCustomHooks/useGenerateFingerprint";
// import { getFingerprint } from "../utils/getFingerprint";

const Register = (props) => {


  const context = useContext(AuthContext)

  const {clientId} = useGenerateFingerprint()

  const {
    input, values, errorList, setErrors, reset,
  } = useForm({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })


  const [register, { loading }] = useMutation(REGISTER_MUTATION, {

    // refetchQueries: [{
    //   query: ALLUSERS_QUERY
    // }],
    update: (proxy, result) => {
      context.login(result.data.register, clientId)
      props.history.push('/')

      /********* ********* ********* ********* ********* ********* ********* ********* *********
       Create mutation update
       ********* ********* ********* ********* ********* ********* ********* ********* *********/
      const data = proxy.readQuery({
        query: ALLUSERS_QUERY
      })
      data.allUsers.push(result.data.register)
      proxy.writeQuery({ query: ALLUSERS_QUERY, data })
    },
    onError: (errors) => {

      /********* ********* ********* ********* ********* ********* ********* ********* *********
       errors normalize can use in form
       ********* ********* ********* ********* ********* ********* ********* ********* *********/
      try {
        setErrors(errors.graphQLErrors[0].extensions.exception.errors)
      } catch (err) {
        console.log(err);
        /********* ********* ********* ********* ********* ********* ********* ********* *********
         todo: window.location.reload()
         ********* ********* ********* ********* ********* ********* ********* ********* *********/
      }
    },

    variables: { ...values, clientId }

  })
  const onSubmit = async (e) => {
    e.preventDefault()
    await register()
  }

  return (
    <RegisterForm onSubmit={onSubmit} loading={loading} input={input} reset={reset} errorList={errorList} />
  );
}


export default Register;