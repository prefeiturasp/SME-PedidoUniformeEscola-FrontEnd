import React, { Component } from "react";
import "./style.scss";

export class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggled: false
    };
  }

  render() {
    const {
      nome,
      toggle,
      toggled,
      registro_funcional,
      nome_instituicao
    } = this.props;
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
              {!toggled && nome && nome !== "" && (
                <div className="sidebar-brand-text text-center">
                  <span className="d-none d-lg-inline text-bold text-white small border border-light rounded-pill p-1">
                    {nome}
                  </span>
                </div>
              )}
            </div>
          </div>
          {!toggled && (
            <div className="sidebar-wrapper">
              <div className="text-center mx-auto justify-content-center p-2">
                <span className="text-bold text-white small">
                  RF: {registro_funcional} <br />
                  {nome_instituicao}
                </span>
              </div>
            </div>
          )}
          {!toggled && (
            <div className="text-center page-footer mx-auto justify-content-center mb-1 pb-2">
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