import React, { createContext, useReducer, useEffect } from 'react'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import { REACT_APP_SERVER_ADDRESS, REACT_APP_SERVER_PORT } from "../config";

/********* ********* ********* ********* ********* ********* ********* ********* *********
 todo: token store at localStorage vs sessionStorage with at login page "keep login" checkbox button
 ********* ********* ********* ********* ********* ********* ********* ********* *********/

/********* ********* ********* ********* ********* ********* ********* ********* *********
 initial state for resolver
 ********* ********* ********* ********* ********* ********* ********* ********* *********/
const initialState = {
  user: null,
  clientId: null,
}

/********* ********* ********* ********* ********* ********* ********* ********* *********
 when error all state reset
 todo: logout resolver could includes here
 ********* ********* ********* ********* ********* ********* ********* ********* *********/
const resetValue = (e) => {
  if (e) {
    e.preventDefault()
  }
  initialState.user = null;
  initialState.clientId = null
  localStorage.removeItem('uid')
  localStorage.removeItem('uuid')
}

/********* ********* ********* ********* ********* ********* ********* ********* *********
 refreshToken resolver with axios
 useMutation occurred 3times.
 todo: after @apollo/react-hooks updates try again with useMutation.
 todo: may be work with fetchPolicy change
 ********* ********* ********* ********* ********* ********* ********* ********* *********/
const refreshToken = () => {
  axios.post(`${REACT_APP_SERVER_ADDRESS}:${REACT_APP_SERVER_PORT}/graphql`, {
    query: `
              mutation refreshToken(
              $accessToken: String!
              $clientId: String!
              ){
                  refreshToken(
                  accessToken:$accessToken
                  clientId: $clientId
                  ) {
                      accessToken
                  }
              }
          `,
    variables: {
      accessToken: localStorage.getItem('uid'),
      clientId: initialState.clientId,
    }
  }).then(({ data: { data } }) => {

    const decodedUser = jwtDecode(data.refreshToken.accessToken)
    initialState.user = decodedUser
    initialState.clientId = decodedUser.clientId
    localStorage.setItem('uid', data.refreshToken.accessToken)
    localStorage.setItem('uuid', decodedUser.clientId)

  }).catch(err => {
    console.log(err);
    resetValue()
  })
}

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.user,
        clientId: action.clientId,
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        clientId: null,
      }
    default:
      return state
  }
}

const AuthContext = createContext({
  user: null,
  clientId: null,
  login: () => {
  },
  logout: () => {
  },
})

const AuthProvider = (props) => {
  /********* ********* ********* ********* ********* ********* ********* ********* *********
   after rendered check Fingerprint
   ********* ********* ********* ********* ********* ********* ********* ********* *********/

  useEffect(() => {
    let isSubscribed = true
    if (isSubscribed) {
      import("../utils/getFingerprint").then(async ({ getFingerprint }) => {
        if (isSubscribed) {
          try {
            const getToken = localStorage.getItem('uuid')
            const result = await getFingerprint()
            if (getToken !== result) {
              await resetValue()
            }
            return null;
          } catch (err) {
            console.log(err)
          }
        }
      });
    }
    return () => isSubscribed = false

  }, [])
  /********* ********* ********* ********* ********* ********* ********* ********* *********
   localStorage values valid check and
   if it's exist define initialState
   else reset values
   ********* ********* ********* ********* ********* ********* ********* ********* *********/
  if (localStorage.getItem('uid') && localStorage.getItem('uuid')) {
    try {
      const decodedToken = jwtDecode(localStorage.getItem('uid'))
      initialState.user = decodedToken
      initialState.clientId = localStorage.getItem('uuid')
      if (decodedToken.exp * 1000 < Date.now()) {
        refreshToken()
      }
    } catch (err) {
      console.log(err);
      resetValue()
      // window.location.reload()
    }
  } else {
    resetValue()
  }

  /********* ********* ********* ********* ********* ********* ********* ********* *********
   useReducer: function and value define for context provider
   ********* ********* ********* ********* ********* ********* ********* ********* *********/
  const [state, dispatch] = useReducer(authReducer, initialState)

  const login = (userData, clientId) => {
    localStorage.setItem('uid', userData.accessToken)
    localStorage.setItem('uuid', clientId)
    dispatch({
      type: 'LOGIN',
      user: userData,
      clientId: clientId,
    })
  }
  const logout = () => {
    //todo: logout resolver! delete refreshToken from User model
    localStorage.removeItem('uid')
    localStorage.removeItem('uuid')
    dispatch({
      type: 'LOGOUT'
    })
  }
  const user = state.user
  const clientId = state.clientId

  return (
    <AuthContext.Provider
      value={{
        login, logout, user, clientId,
      }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider }