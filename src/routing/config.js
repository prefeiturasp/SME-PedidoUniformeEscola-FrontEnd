import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { routes } from "./routes";
import Login from "../screens/Login";
import NotFoundPage from "../screens/404";
import ConfirmarEmail from "../screens/ConfirmarEmail";
import authService from "../services/auth.service";
import RecuperarSenha from "../screens/RecuperarSenha";

const PrivateRouter = (
  { component: Component, tipoUsuario: tipoUsuario, ...rest } // eslint-disable-line
) => (
  <Route
    {...rest}
    render={props =>
      authService.isLoggedIn() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }} // eslint-disable-line
        />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter basename={`/${process.env.PUBLIC_URL}`}>
    <Switch>
      <Route path="/login" component={Login} />
      {routes.map((value, key) => {
        return (
          <PrivateRouter
            key={key}
            path={value.path}
            exact={value.exact}
            component={value.component}
          />
        );
      })}
      <Route path="/confirmar-email" component={ConfirmarEmail} />
      <Route path="/recuperar-senha" component={RecuperarSenha} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
