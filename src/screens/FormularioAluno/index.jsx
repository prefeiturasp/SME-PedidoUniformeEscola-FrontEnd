import React, { Component } from "react";

export default class FormularioAluno extends Component {
  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const codigo_eol = urlParams.get("codigo_eol");
    /*confirmarEmail(uuid, confirmationKey).then(response => {
      if (response.status === HTTP_STATUS.OK) {
        this.setState({ mensagem: "E-mail confirmado com sucesso!" });
      } else {
        this.setState({ mensagem: response.data.detail });
      }
    });*/
  }

  
  render() {
    return (
      <div className="card">
        <div className="card-body">
          Aqui será o Dashboard
        </div>
      </div>
    );
  }
}
