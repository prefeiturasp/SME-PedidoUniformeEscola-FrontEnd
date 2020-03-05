import React, { Component } from "react";
import "./style.scss";

export class HeaderLogo extends Component {
  render() {
    return (
      <div className="header-logo">
        <img
          src={
            process.env.PUBLIC_URL
              ? `/${process.env.PUBLIC_URL}/assets/images/logo-pedidouniformes.png`
              : "/assets/images/logo-pedidouniformes.png"
          }
          alt=""
        />
      </div>
    );
  }
}
