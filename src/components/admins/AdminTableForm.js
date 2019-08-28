import React, { useState } from 'react';
import { Table } from "semantic-ui-react";

import { useQuery } from "@apollo/react-hooks";
import { ALLUSERS_QUERY } from "../../graphqls/allUsersQuery";
import ErrorPage from "../handlingPages/ErrorPage";

import AdminRegisterModal from "../modals/AdminRegisterModal";
import DeleteUserConfirmButton from "../buttons/DeleteUserConfirmButton";
import { LoadingInline } from "../handlingPages/LoadingHandler";

const AdminTableForm = (props) => {

  const { loading, data, error } = useQuery(ALLUSERS_QUERY)

  const [registerModalOpen, setRegisterModalOpen] = useState(false)

  /********* ********* ********* ********* ********* ********* ********* ********* *********
   todo: if loading && takes more than seconds refresh
   ********* ********* ********* ********* ********* ********* ********* ********* *********/
  if (error) {
    return <ErrorPage />
  }

  const { allUsers } = data

  const buttonStyle = {
    size: "small",
    primary: true,
  }

  return (
    <div>
      <h1 style={{ marginTop: "1rem", textAlign: "center" }}>Table</h1>
      <Table striped textAlign="center" unstackable singleLine fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={2}>ID</Table.HeaderCell>
            <Table.HeaderCell>EMAIL </Table.HeaderCell>
            <Table.HeaderCell>권한</Table.HeaderCell>
            <Table.HeaderCell>생성일</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>

          {loading &&
          <Table.Row>
            <Table.Cell colSpan="5">
              <LoadingInline />
            </Table.Cell>
          </Table.Row>
          }
          {allUsers && allUsers.map(user => (
            <Table.Row key={user.id}>
              <Table.Cell> {user.username} </Table.Cell>
              <Table.Cell> {user.email} </Table.Cell>
              <Table.Cell> {user.roles.join(' | ')} </Table.Cell>
              <Table.Cell>
                {new Date(parseInt(user.createdAt)).toLocaleString()}
              </Table.Cell>
              <Table.Cell>
                <DeleteUserConfirmButton buttonStyle={{ ...buttonStyle, negative: true, compact: true }}
                                         id={user.id} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        {/*<Table.Footer>*/}
        {/*  <Table.Row>*/}
        {/*    <Table.HeaderCell colSpan="5" textAlign="right">*/}
        {/*      <AdminRegisterModal open={registerModalOpen} setOpen={setRegisterModalOpen} />*/}
        {/*    </Table.HeaderCell>*/}
        {/*  </Table.Row>*/}
        {/*</Table.Footer>*/}
      </Table>
      <div style={{ display: "inlineBlock", textAlign: "right" }}>
        <AdminRegisterModal open={registerModalOpen} setOpen={setRegisterModalOpen} />
      </div>
    </div>
  );
}

export default AdminTableForm;