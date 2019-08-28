import React from 'react';
import { Container, Form } from "semantic-ui-react";

const Home = (props) => {
  return (
    <Container>
        <h1>Test</h1>
        <Form>
          <Form.Field>
            <Form.Input name="1" label="1" />
          </Form.Field>
          <Form.Field>
            <Form.Input name="1" label="2" />
          </Form.Field>
          <Form.Field>
            <Form.Input name="1" label="3" />
          </Form.Field>
          <Form.Field>
            <Form.Input name="1" label="4" />
          </Form.Field>
          <Form.Field>
            <Form.Input />
          </Form.Field>
        </Form>
    </Container>
  );
}

export default Home;