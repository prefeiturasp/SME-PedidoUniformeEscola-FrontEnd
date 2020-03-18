import React from "react";
import Botao from "../../../../components/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "../../../../components/Botao/constants";

export const SenhaRecuperadaErro = props => {
  const { setComponenteAtivo } = props;
  return (
    <div>
      <h3 className="texto-simples-grande mt-3">Recuperação de Senha</h3>
      <center className="mt-5">
        <div className="div-circular-vermelho">
          <div>
            <i className="fas fa-times fa-3x check-vermelho" />
          </div>
        </div>
      </center>
      <center>
        <div className="col-8 mt-3">
          <p className="texto-simples-vermelho mt-2">
            Você não tem um e-mail cadastrado para recuperar sua senha.
          </p>
          <p className="texto-simples-vermelho mt-2">
            Para restabelecer o seu acesso, procure o Diretor da sua unidade.
          </p>
        </div>
      </center>
      <center>
        <Botao
          className="col-4"
          style={BUTTON_STYLE.GREEN}
          texto="Continuar"
          type={BUTTON_TYPE.SUBMIT}
          onClick={() => setComponenteAtivo("login")}
        />
      </center>
    </div>
  );
};
