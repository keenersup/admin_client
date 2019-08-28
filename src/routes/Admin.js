import React from 'react'
// import React, { lazy, Suspense } from 'react';
import { Grid } from "semantic-ui-react";
import AdminTableForm from "../components/admins/AdminTableForm";
// const AdminTableForm = lazy(() => import( "../components/admins/AdminTableForm"));

const Admin = ({ visible }) => {

  return (
    visible ?
        <AdminTableForm />
      :
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column width={13}>
              <AdminTableForm />
            </Grid.Column>
            <Grid.Column width={2}>
              <div>something</div>
            </Grid.Column>
          </Grid.Row>
        </Grid>

  );
}

export default Admin;