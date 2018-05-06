import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import Fire from "./firebase/Fire";
import store from "./store/index";
import App from "./components/App";
import { loginSuccess } from './actions/session';


Fire.checkAuth((data) => {
  store.dispatch(loginSuccess(data));
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
