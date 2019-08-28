import React, {  useContext } from 'react';
import { AuthContext } from "../context/authContext";
import gql from 'graphql-tag'
// import { useMutation } from "react-apollo-hooks";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "../components/useCustomHooks/useForm"
import { Form, Button, Message } from "semantic-ui-react";
import { StyledFormWrapper } from "../components/styledComponents/StyledFormWrapper";
import { StyledFormFieldButton } from "../components/styledComponents/StyledFormFieldButton";
import { useGenerateFingerprint } from "../components/useCustomHooks/useGenerateFingerprint";
// import { getFingerprint } from "../utils/getFingerprint";

const Login = (props) => {

  const context = useContext(AuthContext)

  /********* ********* ********* ********* ********* ********* ********* ********* *********
   set client id after first render
   ********* ********* ********* ********* ********* ********* ********* ********* *********/

  const { clientId } = useGenerateFingerprint()

  /********* ********* ********* ********* ********* ********* ********* ********* *********
   useForm values
   ********* ********* ********* ********* ********* ********* ********* ********* *********/
  let values, reset, errorList, setErrors, input;
  ({
    values, reset, errorList, setErrors, input
  } = useForm({
    username: '',
    password: '',
  }));

  /********* ********* ********* ********* ********* ********* ********* ********* *********
   useMutation function
   ********* ********* ********* ********* ********* ********* ********* ********* *********/
  const [login, { loading }] = useMutation(LOGIN_MUTATION, {

    update: (proxy, result) => {
      context.login(result.data.login, clientId)
      props.history.push('/')
    },

    onError: (errors) => {
      try {
        setErrors(errors.graphQLErrors[0].extensions.exception.errors)
      } catch (err) {
        console.log(err);
        /********* ********* ********* ********* ********* ********* ********* ********* *********
         todo: window.location.reload()
         ********* ********* ********* ********* ********* ********* ********* ********* *********/
      }
    },

    variables: {
      ...values, clientId,
    },
  })

  const onSubmit = async (e) => {
    e.preventDefault()
    await login()
  }

  return (
    <StyledFormWrapper>
      <Form onSubmit={onSubmit} loading={loading}>
        <Form.Input
          label='Username'
          placeholder='Username'
          type='text'
          {...input.username}
        />
        <Form.Input
          label='Password'
          placeholder='Password'
          type='password'
          {...input.password}
        />
        <StyledFormFieldButton>
          <Button type='reset' primary compact onClick={reset} negative>
            Reset
          </Button>
          <Button type='submit' primary compact positive>
            Login
          </Button>
        </StyledFormFieldButton>
      </Form>
      {errorList.length > 0 && (
        <Message
          error
          header='Something Wrong'
          list={errorList}
        />
      )}
    </StyledFormWrapper>
  );
}

const LOGIN_MUTATION = gql`
    mutation login(
        $username: String!
        $password: String!
        $clientId: String!
    ){
        login(
            username: $username
            password: $password
            clientId: $clientId
        ){
            id
            email
            username
            createdAt
            username
            accessToken
            roles
        }
    }
`

export default Login;