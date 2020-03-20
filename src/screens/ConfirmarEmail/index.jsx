import HTTP_STATUS from "http-status-codes";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Botao } from "../../components/Botao";
import { HeaderLogo } from "../../components/HeaderLogo";
import { BUTTON_TYPE, BUTTON_STYLE } from "../../components/Botao/constants";
import { confirmarEmail } from "../../services/perfil.service";

class ConfirmarEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mensagem: ""
    };
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    const confirmationKey = urlParams.get("confirmationKey");
    confirmarEmail(uuid, confirmationKey).then(response => {
      if (response.status === HTTP_STATUS.OK) {
        this.setState({ mensagem: "E-mail confirmado com sucesso!" });
      } else {
        this.setState({ mensagem: response.data.detail });
      }
    });
  }

  render() {
    const { mensagem } = this.state;
    return (
      <div>
        <HeaderLogo />
        <div className="container pt-3">
          <div className="card text-center">
            <div className="card-body">
              <div className="card-title font-weight-bold">
                Confirmação de E-mail
              </div>
              {mensagem}
              <div className="pt-3">
                <Link to="/login">
                  <Botao
                    texto="Ir para o Login"
                    type={BUTTON_TYPE.SUBMIT}
                    style={BUTTON_STYLE.BLUE}
                    className="ml-3"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ConfirmarEmail;
