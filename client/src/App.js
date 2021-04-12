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
import Pusher from "pusher-js";
import { CHAT_ADD_SUCCESS } from "./actions/actionsTypes";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const pusher = new Pusher("22769e8d448bb4cddf2c", {
      cluster: "eu",
    });
    const channel = pusher.subscribe("chats");
    var newMsg = null;
    channel.bind("updated", function (data) {
      newMsg = data;
      if (newMsg) {
        pusher.unbind_all();
        pusher.unsubscribe();
        dispatch({ type: CHAT_ADD_SUCCESS, payload: newMsg });
        newMsg = null;
      }
    });
  }, [dispatch]);
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
        </Switch>
      </div>
    </Router>
  );
}

export default App;
