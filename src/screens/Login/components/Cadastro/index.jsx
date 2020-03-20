import React from "react";
import InputText from "../../../../components/Input/InputText";
import Select from "../../../../components/Select";
import { Field } from "redux-form";
import { required, length } from "../../../../helpers/fieldValidators";
import { TIPOS_EMAIL_CADASTRO } from "../../contants";
import { MaskCPF } from "../../../../helpers/utils";
import Botao from "../../../../components/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "../../../../components/Botao/constants";

export const Cadastro = props => {
  const {
    bloquearBotao,
    setComponenteAtivo,
    emailInput,
    width,
    onSubmit
  } = props;
  return (
    <div className="signup-form">
      <div className="form">
        <form>
          <div className="row">
            <div className="input-group email-sme">
              <div ref={emailInput} className="col-6">
                <Field
                  component={InputText}
                  placeholder={"seu.nome"}
                  label="E-mail"
                  name="email"
                  required
                  type="text"
                  validate={[required]}
                />
              </div>
              <div className="input-group-append col-6">
                <Field
                  component={Select}
                  name="tipo_email"
                  width={width}
                  options={TIPOS_EMAIL_CADASTRO}
                  naoDesabilitarPrimeiraOpcao
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <Field
                {...MaskCPF}
                component={InputText}
                label="CPF"
                name="cpf"
                placeholder={"Digite o seu CPF"}
                required
                type="text"
                validate={required}
              />
            </div>
            <div className="col-6">
              <Field
                component={InputText}
                label="Nº RF"
                name="username"
                placeholder={"Digite o RF"}
                required
                type="text"
                pattern="\d*"
                title="somente números"
                helpText="Somente números"
                maxlength="7"
                validate={[required, length(7)]}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <Field
                component={InputText}
                label="Senha"
                name="password"
                placeholder={"******"}
                required
                type="password"
                validate={required}
                pattern="(?=.*\d)(?=.*[a-z]).{8,}"
                title="Pelo menos 8 caracteres, uma letra e um número"
                helpText="Pelo menos 8 caracteres, uma letra e um número"
              />
            </div>
            <div className="col-6">
              <Field
                component={InputText}
                label="Confirme sua senha"
                name="confirmar_password"
                placeholder={"******"}
                required
                type="password"
                validate={required}
              />
            </div>
          </div>
          <div
            onClick={() => setComponenteAtivo("login")}
            className="text-right back"
          >
            voltar
          </div>
          <div className="pt-2">
            <Botao
              type={BUTTON_TYPE.SUBMIT}
              onSubmit={(values) => console.log(values)}
              style={BUTTON_STYLE.BLUE}
              texto="Cadastrar"
              className="col-12"
              disabled={bloquearBotao}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
