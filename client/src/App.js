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

function App() {
  function HomeRoute(props) {
    let token = localStorage.getItem("token");
    return (
      <Route
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
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <HomeRoute exact path="/" component={Home} />
          <Route exact path="/field" component={FieldPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
