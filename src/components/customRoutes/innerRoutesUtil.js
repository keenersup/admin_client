import React, { useContext } from 'react';
import SideBar from "../menubars/SideBar";
import { AuthContext } from "../../context/authContext";
import { StateContext } from "../../context/stateContext";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
/********* ********* ********* ********* ********* ********* ********* ********* *********
 todo: onHide for mobile
 ********* ********* ********* ********* ********* ********* ********* ********* *********/
export const useValues = () => {
  const authContext = useContext(AuthContext)
  const { visible, setVisible } = useContext(StateContext)

  const toggleClick = (e) => {
    e.preventDefault()
    setVisible(!visible)
  }

  return {
    context: authContext,
    visible,
    toggleClick,
  }
}

export const innerRoute = ({ Component, animation, center, full, visible, toggleClick, props, context }) => {
  return (
    <SideBar visible={visible} toggleClick={toggleClick} animation={animation} center={!!center} full={!!full}>
      <Component {...props} visible={visible} context={context} />
    </SideBar>
  )
}

export const innerRouteDnd = ({ Component, animation, center, full, visible, toggleClick, props, context }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <SideBar visible={visible} toggleClick={toggleClick} animation={animation} center={!!center} full={!!full}>
        <Component {...props} visible={visible} context={context} />
      </SideBar>
    </DndProvider>
  )
}
