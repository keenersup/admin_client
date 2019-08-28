import React from 'react';
import App from './App'
import { REACT_APP_SERVER_ADDRESS, REACT_APP_SERVER_PORT } from "./config";

import ApolloClient from 'apollo-client'
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from '@apollo/react-hooks'
// import { ApolloProvider } from 'react-apollo-hooks'
import { from } from 'apollo-link'
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { createHttpLink } from "apollo-link-http";

/********* ********* ********* ********* ********* ********* ********* ********* *********
 todo: some special error message
 ********* ********* ********* ********* ********* ********* ********* ********* *********/
const errorLink = onError(({ graphQLErrors, networkError, forward, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
  }
});

/********* ********* ********* ********* ********* ********* ********* ********* *********
 for CORS credentials
 ********* ********* ********* ********* ********* ********* ********* ********* *********/
const httpLink = createHttpLink({
  uri: `${REACT_APP_SERVER_ADDRESS}:${REACT_APP_SERVER_PORT}`,
  credentials: "include",
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('uid')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
})

const client = new ApolloClient({
  link: from([
    authLink, errorLink, httpLink
  ]),
  cache: new InMemoryCache(),
})

export default (

    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
)

