import React, { useState, useContext } from 'react';
import { Button, Confirm } from "semantic-ui-react";
// import { useMutation } from "react-apollo-hooks";
import { useMutation } from "@apollo/react-hooks";
import gql from 'graphql-tag'
import { ALLUSERS_QUERY } from "../../graphqls/allUsersQuery";
import { AuthContext } from "../../context/authContext";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

/********* ********* ********* ********* ********* ********* ********* ********* *********
 todo: make even admin id, it can not delete other admin.
 ********* ********* ********* ********* ********* ****************** ********* *********/

const StyledTextButton = styled(Button)`
   background: none !important;
   color: #ff2b06 !important;
   &:hover{
     text-decoration: underline;
     color: rgba(199,15,27,1) !important;
  } 
`

const DeleteUserConfirmButton = ({ id, buttonStyle }) => {

  const context = useContext(AuthContext)

  const [confirmOpen, setConfirmOpen] = useState(false)

  const [deleteUser] = useMutation(DELETEUSER_MUTATION, {
    onError: (errors) => {
      console.log(errors);
      /********* ********* ********* ********* ********* ********* ********* ********* *********
       todo: window.location.reload()
       ********* ********* ********* ********* ********* ********* ********* ********* *********/
      setConfirmOpen(false)
    },
    update: (proxy, result) => {
      setConfirmOpen(false)

      /********* ********* ********* ********* ********* ********* ********* ********* *********
       update query after mutate
       Delete mutation
       ********* ********* ********* ********* ********* ********* ********* ********* *********/
      const data = proxy.readQuery({
        query: ALLUSERS_QUERY
      })
      data.allUsers = data.allUsers.filter(user => user.id !== id)
      proxy.writeQuery({ query: ALLUSERS_QUERY, data })

      if (id === context.user.id) {
        context.logout()
      }
    },
    variables: { id }
  })


  const onClick = async (e) => {
    e.preventDefault()
    await deleteUser()
  }
  return (
    <>
      {/********* ********* ********* ********* ********* ********* ********* ********* *********
       confirm first then delete mutate by confirm button
       ********* ********* ********* ********* ********* ********* ********* ********* *********/}
      <StyledTextButton onClick={() => setConfirmOpen(true)}>Delete</StyledTextButton>
      {/*<Button  {...buttonStyle} onClick={() => setConfirmOpen(true)}>Delete</Button>*/}
      <Confirm
        header="Delete User"
        content="Are you sure Delete User"
        open={confirmOpen}
        onCancel={() => {
          setConfirmOpen(false)
        }}
        onConfirm={onClick}
        size="tiny"
      />
    </>
  );
}

const DELETEUSER_MUTATION = gql`
    mutation deleteUser(
        $id:ID!
    ){
        deleteUser(id:$id)
    }
`

export default withRouter(DeleteUserConfirmButton)