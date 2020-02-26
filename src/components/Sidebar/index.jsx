import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { getNome, getRF, getInstituicao } from "../../helpers/utils";
import "./style.scss";

export class Sidebar extends Component {
  render() {
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
            <li className="nav-item">
              <NavLink
                className={`nav-link collapsed`}
                to="/lista-alunos"
              >
                <i className="fas fa-file-alt" />
                <span>Consulta à situação individual</span>
              </NavLink>
            </li>
          </div>
          {!toggled && (
            <div className="text-center page-footer mt-auto justify-content-center mb-3 pb-2">
              <p>
                SME-SP-SGA - Distribuído sob <br />a Licença AGPL V3
              </p>
            </div>
          )}
        </ul>
      </div>
    );
  }
}
