import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Login from "../screens/Login";
import NotFoundPage from "../screens/404";
import ConfirmarEmail from "../screens/ConfirmarEmail";

/*const PrivateRouter = (
  { component: Component, tipoUsuario: tipoUsuario, ...rest } // eslint-disable-line
) => (
  <Route
    {...rest}
    render={props =>
      authService.isLoggedIn() ? (
        tipoUsuario ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/403", state: { from: props.location } }} // eslint-disable-line
          />
        )
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }} // eslint-disable-line
        />
      )
    }
  />
);*/

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login} />
      {/*RoutesConfig.map((value, key) => {
        return (
          <PrivateRouter
            key={key}
            path={value.path}
            exact={value.exact}
            component={value.component}
          />
        );
      })*/}
      <Route path="/confirmar-email" component={ConfirmarEmail} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
