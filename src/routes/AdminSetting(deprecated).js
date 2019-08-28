import React, { lazy, Suspense, useState } from 'react';
import { useQuery } from "@apollo/react-hooks";
import { ALLUSERS_QUERY } from "../graphqls/allUsersQuery";

import { Grid, Transition, Container } from "semantic-ui-react";
import styled from 'styled-components'

import AdminRegisterModal from "../components/modals/AdminRegisterModal";
import ErrorPage from "../components/handlingPages/ErrorPage";
import {LoadingPage} from "../components/handlingPages/LoadingHandler";

const PostUser = lazy(() => import("../components/accounts/PostCardUser"))
/********* ********* ********* ********* ********* ********* ********* ********* *********
 todo: administor management page! must access with permission

 todo: server side format error message

 todo: allUsers mutation, delete mutation, getUsers to see detail.

 todo: updateUser mutation => update roles user to admin by radio form or checkbox! only show for administor
 ********* ********* ********* ********* ********* ********* ********* ********* *********/

/********* ********* ********* ********* ********* ********* ********* ********* *********
 css flex vertical horizontal align center
 ********* ********* ********* ********* ********* ********* ********* ********* *********/
const StyledGridRowHeader = styled(Grid.Row)`
    justify-content: center !important;
    font-size: 2rem;
    margin-top: 10px;
`
const StyledButtonAlignCenter = styled.div`
    display: flex ;
    justify-content: center;
    align-items: center;
    height: 100%;
`
const StyledGridColumnMarginBottom = styled(Grid.Column)`
    margin-bottom: 20px !important;
`

const AdminSettingDeprecated = (props) => {
  const { data: { allUsers }, error, loading } = useQuery(ALLUSERS_QUERY)

  const [registerModalOpen, setRegisterModalOpen] = useState(false)

  /********* ********* ********* ********* ********* ********* ********* ********* *********
   todo: special loading and error page
   ********* ********* ********* ********* ********* ********* ********* ********* *********/
  if (loading) {
    return (<LoadingPage />)
  }
  if (error) {
    return <ErrorPage />
  }
  console.log(allUsers);

  return (
    <Container>
      <Grid columns={4}>
        <StyledGridRowHeader>
          <h1>All Users</h1>
        </StyledGridRowHeader>
        <Grid.Row>
          <Transition.Group>
            {  /********* ********* ********* ********* ********* ********* ********* ********* *********
             Transition Wrapped Grid.Column
             ********* ********* ********* ********* ********* ********* ********* ********* *********/}
            <StyledGridColumnMarginBottom>
              <StyledButtonAlignCenter>
                <AdminRegisterModal open={registerModalOpen} setOpen={setRegisterModalOpen} />
              </StyledButtonAlignCenter>
            </StyledGridColumnMarginBottom>
            {allUsers && allUsers.map((user) => (
                <StyledGridColumnMarginBottom key={user.id}>
                  <Suspense fallback={<LoadingPage/>}>
                    <PostUser user={user} />
                  </Suspense>
                </StyledGridColumnMarginBottom>
              )
            )}
          </Transition.Group>
        </Grid.Row>
      </Grid>
    </Container>
  );
}
export default AdminSettingDeprecated;