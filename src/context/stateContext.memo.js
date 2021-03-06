import React, { createContext, useReducer } from 'react';
import { ProvidedRequiredArguments } from "graphql/validation/rules/ProvidedRequiredArguments";

const initialState = { visible: false }

const StateContext = createContext({
  ...initialState, setVisible: () => {
  }
})
const stateReducer = (state, action) => {
  switch (action.type) {
    case "SET_VISIBLE":
      return {
        // ...state,
        visible: action.visible,
      }
    case "SOMETHING":
      return {
        ...state,
      }
    default:
      return state
  }
}


const StateProvider = (props) => {
  const [state, dispatch] = useReducer(stateReducer, initialState)

  const setVisible = (visible) => {
    dispatch({
      type: 'SET_VISIBLE',
      visible,
    })
  }

  return (
    <StateContext.Provider
      {...props}
      value={{ state, setVisible }}
    />
  )
}

export { StateContext, StateProvider }
