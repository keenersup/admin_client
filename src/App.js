import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'

import { AuthProvider } from "./context/authContext"
import { StateProvider } from "./context/stateContext";

import {
  AuthRouteSideBar, AdminRouteSideBar, GuestRouteSideBar,
  RouteSideBar
} from "./components/customRoutes/RouteSideBar";

import ErrorPage from "./components/handlingPages/ErrorPage";

import Test from "./routes/Test";
// import BookMarkCp2 from "./routes/BookMark.cp2";
// import BookMarkCP from "./routes/BookMark.cp";
import Bookmark from "./routes/Bookmark";

// const AdminTable = lazy(() => {
//   return Promise.all([
//     import("./routes/Admin"),
//     new Promise(resolve => setTimeout(resolve, 3000))
//   ])
//     .then(([moduleExports]) => moduleExports)
// });
/*
import Admin from './routes/Admin'
import Register from "./routes/Register";
import Login from "./routes/Login";
import Home from './routes/Home'
import ChangePassword from "./routes/ChangePassword";
*/
const Register = lazy(() => import("./routes/Register"))
const Login = lazy(() => import("./routes/Login"))
const Home = lazy(() => import('./routes/Home'))
const Admin = lazy(() => import( "./routes/Admin"))
const ChangePassword = lazy(() => import ( "./routes/ChangePassword"))

/********* ********* ********* ********* ********* ********* ********* ********* *********
 Error boundaries
 todo: 차후에 hooks error boundary 추가시 해보기.
 네트워크 장애 같은 이유로 다른 모듈을 로드에 실패할 경우 에러를 발생시킬 수 있습니다.
 이때 Error Boundaries를 이용하여 사용자의 경험과 복구 관리를 처리할 수 있습니다.
 Error Boundary를 만들고 lazy 컴포넌트를 감싸면 네트워크 장애가 발생했을 때 에러를 표시할 수 있습니다.
 ********* ********* ********* ********* ********* ********* ********* ********* *********/

/********* ********* ********* ********* ********* ********* ********* ********* *********
 route props
 animation:["overlay", "push"] # default value is "push",
 centerAlign: Boolean,
 ********* ********* ********* ********* ********* ********* ********* ********* *********/
function App() {
  return (
      <AuthProvider>
      <StateProvider>
        <Suspense fallback={<div />}>
          <Router>
            <Switch>
              <RouteSideBar exact path='/' component={Home} animation="overlay"  center />
              <GuestRouteSideBar exact path='/login' component={Login} animation="overlay"  center />
              <GuestRouteSideBar exact path='/register' component={Register} animation="overlay"  center />
              <AuthRouteSideBar exact path='/change-password' component={ChangePassword} animation="overlay"
                                 center />
              <AdminRouteSideBar exact path='/admin' component={Admin} animation="push"  />
              {/**/}
              {/*<RouteSideBar exact path='/bookmark-cp-2' component={BookMarkCp2} animation="push" full/>*/}
              {/*<RouteSideBar exact path='/bookmark-cp' component={BookMarkCP} animation="push" full/>*/}
              <RouteSideBar exact path='/bookmark' component={Bookmark} animation="push" full/>
              <RouteSideBar exact path="/test" component={Test}  />
              <Route component={ErrorPage}  />
            </Switch>
          </Router>
        </Suspense>
      </StateProvider>
    </AuthProvider>
  );
}

export default App;
