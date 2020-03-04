import HTTP_STATUS from "http-status-codes";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { length, required } from "../../helpers/fieldValidators";
import authService from "../../services/auth.service";
import { setUsuario } from "../../services/perfil.service";
import { Botao } from "../../components/Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "../../components/Botao/constants";
import { InputText } from "../../components/Input/InputText";
import Select from "../../components/Select";
import { toastError, toastSuccess } from "../../components/Toast/dialogs";
import "./style.scss";
import { MaskCPF } from "../../helpers/utils";
import { validarForm } from "./validate";
import { TIPOS_EMAIL_CADASTRO } from "./contants";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bloquearBotao: false,
      exibirCadastro: false,
      width: null
    };
    this.emailInput = React.createRef();
  }

  componentDidUpdate() {
    if (this.emailInput.current && !this.state.width) {
      const width = this.emailInput.current.offsetWidth;
      this.setState({ width });
    }
  }

  handleSubmit = values => {
    const { username, password } = values;
    if (username && password) {
      authService.login(username, password);
    }
  };

  handleSubmitCadastro = values => {
    const erro = validarForm(values, this.state);
    if (erro) {
      toastError(erro);
    } else {
      this.setState({ bloquearBotao: true });
      setUsuario(values).then(response => {
        if (response.status === HTTP_STATUS.OK) {
          toastSuccess(`Cadastro efetuado com sucesso!`);
          this.setState({ bloquearBotao: false });
          setTimeout(() => (window.location.href = `/${process.env.PUBLIC_URL}/login`));
        } else if (response.status === HTTP_STATUS.BAD_REQUEST) {
          toastError(response.data.detail);
          this.setState({ bloquearBotao: false });
        }
      });
    }
  };

  renderLogin() {
    const { handleSubmit } = this.props;
    const { bloquearBotao } = this.state;
    return (
      <div className="form">
        <form className="login" onSubmit={handleSubmit(this.handleSubmit)}>
          <Field
            component={InputText}
            esconderAsterisco
            label="RF"
            name="username"
            placeholder={"seu.nome"}
            required
            type="text"
            validate={[required]}
          />
          <Field
            component={InputText}
            esconderAsterisco
            label="Senha"
            name="password"
            placeholder={"******"}
            required
            type="password"
            validate={required}
          />
          <Botao
            className="mt-3 col-12"
            style={BUTTON_STYLE.BLUE}
            texto="Acessar"
            disabled={bloquearBotao}
            type={BUTTON_TYPE.SUBMIT}
          />
          <Link
            className="hyperlink text-center mt-3 d-block"
            data-cy="ainda-nao-cadastrado"
            onClick={() => this.setState({ exibirCadastro: true })}
            to="#"
          >
            Primeiro acesso
          </Link>
        </form>
      </div>
    );
  }

  renderCadastro() {
    const { handleSubmit } = this.props;
    const { bloquearBotao } = this.state;
    return (
      <div className="signup-form">
        <div className="form">
          <form onSubmit={handleSubmit(this.handleSubmitCadastro)}>
            <div className="row">
              <div className="input-group email-sme">
                <div ref={this.emailInput} className="col-6">
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
                    options={TIPOS_EMAIL_CADASTRO}
                    naoDesabilitarPrimeiraOpcao
                    width={this.state.width}
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
              onClick={() => this.setState({ exibirCadastro: false })}
              className="text-right back"
            >
              voltar
            </div>
            <div className="pt-2">
              <Botao
                type={BUTTON_TYPE.SUBMIT}
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
  }

  render() {
    const { exibirCadastro } = this.state;
    return (
      <div>
        <div className="login-bg" />
        <div className="right-half">
          <div className="container my-auto">
            <div className="logo-sigpae">
              <img src={`/${process.env.PUBLIC_URL}/assets/images/logo-pgscue-com-texto.png`} alt="" />
            </div>
            {exibirCadastro ? this.renderCadastro() : this.renderLogin()}
            <div className="logo-prefeitura">
              <img src={`/${process.env.PUBLIC_URL}/assets/images/logo-sme.svg`} alt="" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login = reduxForm({
  form: "login",
  destroyOnUnmount: false
})(Login);

export default Login;
