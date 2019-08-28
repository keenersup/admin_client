import React, {  useContext } from 'react';
import { Button, Form, Message } from "semantic-ui-react";
import { useForm } from "../components/useCustomHooks/useForm";
import { useMutation } from "@apollo/react-hooks";
import gql from 'graphql-tag'
import { AuthContext } from "../context/authContext";
import { StyledFormWrapper } from "../components/styledComponents/StyledFormWrapper";
import { useGenerateFingerprint } from "../components/useCustomHooks/useGenerateFingerprint";

const ChangePassword = (props) => {

  const context = useContext(AuthContext)

  const {clientId} = useGenerateFingerprint()

  const {
    input, values, errorList, setErrors, reset,
  } = useForm({
    currentPassword: '',
    password: '',
    confirmPassword: '',
  })

  const [editPassword, { loading }] = useMutation(EDITPASSWORD_MUTATION, {
    variables: { ...values, clientId },
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
    update: (proxy, result) => {
      context.login(result.data.editPassword, clientId)
      reset()
      props.history.push('/')
    }
  })
  const onSubmit = async (e) => {
    e.preventDefault()
    await editPassword()
  }

  return (

    <StyledFormWrapper>
        <h1 style={{ textAlign: "center" }}>
          비밀번호 변경
        </h1>
        <Form onSubmit={onSubmit} loading={loading}>
          <Form.Input
            label="CurrentPassword"
            type="password"
            {...input.currentPassword}
          />
          <Form.Field>
            <Form.Input
              label="Password"
              type="password"
              {...input.password}
            />
          </Form.Field>
          <Form.Field>
            <Form.Input
              label="ConfirmPassword"
              type="password"
              {...input.confirmPassword}
            />
          </Form.Field>
          <Form.Field align="right">
            <Button type="submit" positive>Edit</Button>
          </Form.Field>
        </Form>
        {errorList.length > 0 &&
        <Message
          error
          header='Something Wrong'
          list={errorList}
        />
        }
    </StyledFormWrapper>
  );
}

const EDITPASSWORD_MUTATION = gql`
    mutation editPassword(
        $currentPassword: String
        $password: String
        $confirmPassword: String
        $clientId: String
    ){
        editPassword(
            editPasswordInput:{
                currentPassword: $currentPassword
                password: $password
                confirmPassword: $confirmPassword
                clientId: $clientId
            }
        ){
            id
            username
            email
            createdAt
            accessToken
            roles
        }
    }
`

export default ChangePassword;