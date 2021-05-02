import "./App.css";
import { Home } from "./pages/Home";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import FieldPage from "./pages/FieldPage";
import Header from "./components/nav/header/Header";
import GoalsPage from "./pages/GoalsPage";
import Chat from "./chat/Chat";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import CheckoutFail from "./pages/CheckoutFail";

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
          <PrivateRoute exact path="/checkout/fail" component={CheckoutFail} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
