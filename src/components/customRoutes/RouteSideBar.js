import React from 'react';
import { Redirect, Route } from 'react-router-dom'
import { useValues, innerRoute } from "./innerRoutesUtil";

/********* ********* ********* ********* ********* ********* ********* ********* *********
 default route
 ********* ********* ********* ********* ********* ********* ********* ********* *********/
export const RouteSideBar = (props) => {
  const { component: Component, animation, center, padded, full, ...rest } = props
  const { visible, toggleClick } = useValues()
  return (
    <Route
      {...rest}
    >
      {props =>
        innerRoute({ Component, animation, center, full, visible, toggleClick, props })
      }
    </Route>
  );
}

/********* ********* ********* ********* ********* ********* ********* ********* *********
 only not logged in user can access
 ********* ********* ********* ********* ********* ********* ********* ********* *********/
export const GuestRouteSideBar = ({ component: Component, animation, center, padded, full, ...rest }) => {

  const { context, visible, toggleClick } = useValues()

  return (
    <Route
      {...rest}>
      {
        props => context.user ?
          <Redirect to='/' /> :
          innerRoute({ Component, visible, toggleClick, animation, center, full, props, context })
      }
    </Route>
  )
}

/********* ********* ********* ********* ********* ********* ********* ********* *********
 only authorized user can access
 ********* ********* ********* ********* ********* ********* ********* ********* *********/
export const AuthRouteSideBar = ({ component: Component, animation, center, full, ...rest }) => {
  const { context, visible, toggleClick } = useValues()
  return (
    <Route
      {...rest}
    >
      {
        props => context.user ?
          innerRoute({ Component, visible, toggleClick, animation, center, full, props, context })
          : <Redirect to='/' />
      }
    </Route>
  );
}

/********* ********* ********* ********* ********* ********* ********* ********* *********
 only administor can access
 ********* ********* ********* ********* ********* ********* ********* ********* *********/
export const AdminRouteSideBar = ({ component: Component, animation, center, padded, full, ...rest }) => {
  const { context, visible, toggleClick } = useValues()
  return (
    <Route
      {...rest}
    >
      {props => context.user && context.user.roles.includes('admin') ?
        innerRoute({ Component, visible, toggleClick, animation, center, full, props, context })
        :
        <Redirect to='/' />
      }
    </Route>
  );
}

