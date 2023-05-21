import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { configureStore } from "./store/configureStore";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import ReduxToastr from "react-redux-toastr";
import "react-datepicker/dist/react-datepicker.css";
import "./semantic-ui-css/semantic.min.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ReduxToastr
      position="top-right"
      transitionIn="fadeIn"
      transitionOut="fadeOut"
    />
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
