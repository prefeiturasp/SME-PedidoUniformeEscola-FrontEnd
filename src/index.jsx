import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import * as Sentry from '@sentry/browser';

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Redux
import { applyMiddleware, createStore } from "redux";
import multi from "redux-multi";
// Middleware
import promise from "redux-promise";
import thunk from "redux-thunk";
import App from "./App";
import reducers from "./reducers";
import "./index.css";
import "./style/custom.css";
import "./style/sb-admin-2.css";
import "./style/style.scss";
import * as serviceWorker from "./serviceWorker";

toast.configure();

if (process.env.IS_DOCKER_ENVIRONMENT === true) {
  const SENTRY_URL = "SENTRY_URL_REPLACE_ME";
  Sentry.init({ dsn: SENTRY_URL });
}
// see https://github.com/zalmoxisus/redux-devtools-extension
let devTools = undefined;
//eslint-disable-next-line
if (process.env.NODE_ENV === "development") {
  devTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();
}

// foram aplicados 3 middlewares no createstore.
// thunk: para que os actionCreators poderem chamar metodos (ideal para usar promises)
// multi: para retornar uma lista de ações em vez de 1
// promise: para poder usar o componentWillMount no componente

const store = applyMiddleware(thunk, multi, promise)(createStore)(
  reducers,
  devTools
);

// store é o carinha que recebe todos os estados
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
