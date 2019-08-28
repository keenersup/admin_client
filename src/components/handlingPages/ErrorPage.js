import React, { useState, useEffect } from 'react';

import { withRouter } from 'react-router-dom'

/********* ********* ********* ********* ********* ********* ********* ********* *********
 todo: some special error page
 ********* ********* ********* ********* ********* ********* ********* ********* *********/

const ErrorPage = (props) => {
  const [error, setErrors] = useState('')
  // const{history} = props
  // const [count, setCount] = useState(5)

  // useEffect(() => {
  //   const counter = setInterval(() => {
  //     if (count > 1) {
  //       setCount(count - 1)
  //     } else {
  //       // history.push('/login')
  //     }
  //   }, 1000)
  //   return () => {
  //     clearInterval(counter)
  //   }
  // }, [count, history])
  useEffect(() => {
    if (props.location && props.location.state) {
      setErrors(props.location.state.errors);
    }
  }, [props])
  return (
    <div>
      <h1>Something Error</h1>
      {error && <div>{error}</div>}
      {/*<div>{`${count} 후에 재시작합니다.`}</div>*/}
    </div>
  )
};

export default withRouter(ErrorPage);