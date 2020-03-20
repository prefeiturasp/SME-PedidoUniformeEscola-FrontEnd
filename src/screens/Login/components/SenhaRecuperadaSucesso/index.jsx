import React from "react";
import Botao from "../../../../components/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "../../../../components/Botao/constants";

export const SenhaRecuperadaSucesso = props => {
  const { email_recuperacao, setComponenteAtivo } = props;
  return (
    <div>
      <h3 className="texto-simples-grande mt-3">Recuperação de Senha</h3>
      <center className="mt-5">
        <div className="div-circular-verde">
          <div>
            <i className="fas fa-check fa-3x check-verde" />
          </div>
        </div>
      </center>
      <div className="mt-3 alinha-centro">
        <div>
          <p className="texto-simples-verde mt-2">
            {`Seu link de recuperação de senha foi enviado para
            ${email_recuperacao}`}
          </p>
          <p className="texto-simples-verde mt-2">
            Verifique sua caixa de entrada!
          </p>
        </div>
      </div>
      <center className="mt-5">
        <Botao
          className="col-4 "
          style={BUTTON_STYLE.GREEN}
          texto="Continuar"
          type={BUTTON_TYPE.SUBMIT}
          onClick={() => setComponenteAtivo("login")}
        />
      </center>
    </div>
  );
};
