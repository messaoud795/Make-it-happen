import "./App.css";
import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Header from "./components/nav/header/Header";
import { Loader } from "semantic-ui-react";
const Home = React.lazy(() => import("./pages/Home"));
const FieldPage = React.lazy(() => import("./pages/FieldPage"));
const GoalsPage = React.lazy(() => import("./pages/GoalsPage"));
const Chat = React.lazy(() => import("./chat/Chat"));
const CheckoutSuccess = React.lazy(() => import("./pages/CheckoutSuccess"));
 const CheckoutFail = React.lazy(() => import("./pages/CheckoutFail"));

function App() {
  function HomeRoute(props) {
    let token = localStorage.getItem("token");
    return (
      <Route
        exact
        path={props.path}
        render={() => {
          if (token) {
            return <Redirect to={{ pathname: "/field" }} />;
          } else {
            return <props.component />;
          }
        }}
      ></Route>
    );
  }
  function PrivateRoute(props) {
    let token = localStorage.getItem("token");
    return (
      <Route
        exact
        path={props.path}
        render={() => {
          if (token) {
            return <props.component />;
          } else {
            return <Redirect to={{ pathname: "/" }} />;
          }
        }}
      ></Route>
    );
  }
  return (
    <Router>
      <div className="App">
        <Header />
        {/* dynamic import */}
        <Suspense fallback={<Loader active className="spinner" />}>
        <Switch>
          <PrivateRoute exact path="/field/:fieldId" component={GoalsPage} />
            <HomeRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/field" component={FieldPage} />
            <PrivateRoute exact path="/chat/:partnerId" component={Chat} />
          <PrivateRoute
            exact
            path="/checkout/success"
            component={CheckoutSuccess}
          />
          <PrivateRoute
              exact
              path="/checkout/fail"
              component={CheckoutFail}
            />
        </Switch>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
