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
import { useDispatch } from "react-redux";
import { loadProfile } from "./actions/auth_actions";
import { useEffect } from "react";

function App() {
  function HomeRoute(props) {
    let token = localStorage.getItem("token");
    const dispatch = useDispatch();
    // useEffect(() => {
    //   console.log("hiiiiiii");
    //   if (token) dispatch(loadProfile());
    // });
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
          <PrivateRoute exact path="/chat" component={Chat} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
