import React, { Component } from "react";
import HTTP_STATUS from "http-status-codes";
import { version } from "../../../package.json";
import { NavLink } from "react-router-dom";
import {
  getNome,
  getRF,
  getInstituicao,
  perfilEscola,
} from "../../helpers/utils";
import "./style.scss";
import { getAPIVersion } from "../../services/api.service";

export class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      API_VERSION: null,
    };
  }

  async componentDidMount() {
    getAPIVersion().then((response) => {
      if (response.status === HTTP_STATUS.OK) {
        this.setState({ API_VERSION: response.data.API_Version });
      }
    });
  }

  render() {
    const { API_VERSION } = this.state;
    const { toggle, toggled } = this.props;
    return (
      <div>
        <div className="mb-5" />
        <ul
          className={`navbar-nav bg-gradiente-sme sidebar sidebar-dark accordion pl-2 pt-5
          ${toggled && "toggled"}`}
          id="accordionSidebar"
        >
          <div className="sidebar-divider my-0" />
          <p onClick={() => toggle()} className="text-right c-pointer">
            <i
              className={
                toggled
                  ? `fas fa-chevron-circle-right`
                  : `fas fa-chevron-circle-left`
              }
            />
          </p>
          <div className="justify-content-center mx-auto align-items-center sidebar-brand-text mx-3 pt-2">
            <div className="nav-item">
              {!toggled && getNome() && (
                <div className="sidebar-brand-text text-center">
                  <span className="d-none d-lg-inline text-bold text-white small border border-light rounded-pill p-1">
                    {getNome()}
                  </span>
                </div>
              )}
            </div>
          </div>
          {!toggled && (
            <div className="sidebar-wrapper">
              <div className="text-center mx-auto justify-content-center p-2">
                <span className="text-bold text-white small">
                  RF: {getRF()} <br />
                  {getInstituicao()}
                </span>
              </div>
            </div>
          )}
          <div className="sidebar-wrapper div-submenu">
            <li className="nav-item">
              <NavLink className={`nav-link collapsed`} to="/">
                <i className="fas fa-list-alt" />
                <span>Painel Gerencial</span>
              </NavLink>
            </li>
            {perfilEscola() && (
              <li className="nav-item">
                <NavLink className={`nav-link collapsed`} to="/lista-alunos">
                  <i className="fas fa-file-alt" />
                  <span>Consulta à situação individual</span>
                </NavLink>
              </li>
            )}
            {perfilEscola() && (
              <li className="nav-item">
                <NavLink
                  className={`nav-link collapsed`}
                  to="/inconsistencias-mp"
                >
                  <i className="fas fa-exclamation-triangle" />
                  <span>Inconsistências retornadas pela Mercado Pago</span>
                </NavLink>
              </li>
            )}
          </div>
          {!toggled && (
            <div className="text-center page-footer mt-auto justify-content-center mb-3 pb-2">
              <p>
                SME-SP-SGA - Distribuído sob <br />a Licença AGPL V3
              </p>
              <div className="sidebar-wrapper">
                <div className="text-center mx-auto justify-content-center p-2">
                  <span className="text-bold text-white small">
                    {version} (API: {API_VERSION})
                  </span>
                </div>
              </div>
            </div>
          )}
        </ul>
      </div>
    );
  }
}
