import HTTP_STATUS from "http-status-codes";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { required, somenteNumeros, somenteLetrasEPontos } from "../../helpers/fieldValidators";
import authService from "../../services/auth.service";
import { setUsuario, recuperaSenha } from "../../services/perfil.service";
import { Botao } from "../../components/Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "../../components/Botao/constants";
import { InputText } from "../../components/Input/InputText";
import { toastError, toastSuccess } from "../../components/Toast/dialogs";
import { validarForm } from "./validate";
import "./style.scss";
import { SenhaRecuperadaSucesso } from "./components/SenhaRecuperadaSucesso";
import { SenhaRecuperadaErro } from "./components/SenhaRecuperadaErro";
import { MaskCPF } from "../../helpers/utils";
import { TIPOS_EMAIL_CADASTRO } from "./contants";
import Select from "../../components/Select";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bloquearBotao: false,
      componenteAtivo: "login",
      width: null,
      email: null,
      enviandoEmail: false
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

  setComponenteAtivo = componenteAtivo => {
    this.setState({ componenteAtivo });
  };

  handleRecuperaSenha = values => {
    this.setState({ enviandoEmail: true });
    recuperaSenha(values.email_ou_rf).then(resp => {
      if (resp.status === HTTP_STATUS.OK) {
        this.setState({
          componenteAtivo: "senha_recuperada_sucesso",
          email_recuperacao: resp.data.email,
          enviandoEmail: false
        });
      } else {
        this.setState({
          componenteAtivo: "senha_recuperada_erro",
          enviandoEmail: false
        });
      }
    });
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
          this.setState({ componenteAtivo: "cadastrado_com_sucesso" });
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
            placeholder={"Seu RF (somente números)"}
            required
            type="text"
            maxlength="7"
            validate={[required, somenteNumeros]}
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
            onClick={() => this.setState({ componenteAtivo: "cadastro" })}
            to="#"
          >
            Primeiro acesso
          </Link>
          <p className="mt-2 text-center">
            <Link
              className="hyperlink"
              to="#"
              data-cy="esqueci-senha"
              onClick={() =>
                this.setState({
                  componenteAtivo: "esqueci_senha"
                })
              }
            >
              Esqueci minha senha
            </Link>
          </p>
        </form>
      </div>
    );
  }

  renderCadastradoComSucesso = () => {
    const { email } = this.state;
    return (
      <div className="message-signup-success pt-3 pb-3">
        Dados salvos com sucesso. Para ativar seu usuário no ambiente
        administrativo do Portal do Uniforme, acesse a caixa postal do seu
        e-mail cadastrado <span className="font-weight-bold">{email}</span>,
        entre na mensagem intitulada "Confirme seu e-mail - Ambiente
        administrativo do Portal do Uniforme" e clique no link indicado nela.
        <div className="row">
          <div className="col-12 text-center">
            <Botao
              type={BUTTON_TYPE.SUBMIT}
              style={BUTTON_STYLE.BLUE}
              texto="Ir para o login"
              className="mt-5"
              onClick={() =>
                this.setState({
                  componenteAtivo: "login"
                })
              }
            />
          </div>
        </div>
      </div>
    );
  };

  renderCadastro() {
    const { handleSubmit } = this.props;
    return (
      <div className="signup-form">
        <div className="form">
          <form onSubmit={handleSubmit(this.handleSubmitCadastro)}>
            <div className="row">
              <div className="input-group email-sme">
                <div ref={this.emailInput} className="col-6">
                  <Field
                    component={InputText}
                    placeholder={"Inicio do seu e-mail SME"}
                    label="E-mail"
                    name="email"
                    required
                    type="text"
                    validate={[required, somenteLetrasEPontos]}
                  />
                </div>
                <div className="input-group-append col-6">
                  <Field
                    component={Select}
                    name="tipo_email"
                    width={this.state.width}
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
                  validate={[required]}
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
              onClick={() => this.setComponenteAtivo("login")}
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
                disabled={this.state.bloquearBotao}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }

  renderEsqueciSenha() {
    const { enviandoEmail } = this.state;
    const { handleSubmit } = this.props;
    return (
      <div className="form">
        <h3 className="texto-simples-grande mt-3">Recuperação de Senha</h3>
        <p className="texto-simples mt-4">
          Informe seu RF e ao continuar você receberá um e-mail com as
          orientações para redefinição da sua senha.
        </p>
        <form className="login ml-4 mr-4">
          <Field
            component={InputText}
            esconderAsterisco
            label="RF"
            name="email_ou_rf"
            placeholder={"RF"}
            validate={required}
            helpText="7 caracteres. Somente números."
          />
        </form>

        <div className="alinha-direita mt-3 ml-4 mr-4">
          {!enviandoEmail && (
            <Botao
              className="col-3"
              style={BUTTON_STYLE.BLUE_OUTLINE}
              texto="Voltar"
              onClick={() => this.setState({ componenteAtivo: "login" })}
              type={BUTTON_TYPE.SUBMIT}
            />
          )}
          {!enviandoEmail && (
            <Botao
              className="col-3 ml-2"
              style={BUTTON_STYLE.BLUE_OUTLINE}
              texto="Cancelar"
              type={BUTTON_TYPE.SUBMIT}
              onClick={() => this.setState({ componenteAtivo: "login" })}
            />
          )}
          <Botao
            className="col-3 ml-2"
            style={BUTTON_STYLE.BLUE}
            texto={`${enviandoEmail ? "Aguarde..." : "Continuar"}`}
            disabled={enviandoEmail}
            type={BUTTON_TYPE.SUBMIT}
            onClick={handleSubmit(values => this.handleRecuperaSenha(values))}
          />
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    const {
      width,
      componenteAtivo,
      bloquearBotao,
      email_recuperacao
    } = this.state;
    return (
      <div>
        <div className="login-bg" />
        <div className="right-half">
          <div className="container my-auto">
            <div className="logo-sigpae">
              <img
                src={
                  process.env.PUBLIC_URL
                    ? `/${process.env.PUBLIC_URL}/assets/images/logo-pgscue-com-texto.png`
                    : "/assets/images/logo-pgscue-com-texto.png"
                }
                alt=""
              />
            </div>
            {componenteAtivo === "login" && this.renderLogin()}
            {componenteAtivo === "cadastro" && this.renderCadastro()}
            {componenteAtivo === "cadastrado_com_sucesso" &&
              this.renderCadastradoComSucesso()}
            {componenteAtivo === "esqueci_senha" && this.renderEsqueciSenha()}
            {componenteAtivo === "senha_recuperada_sucesso" && (
              <SenhaRecuperadaSucesso
                email_recuperacao={email_recuperacao}
                setComponenteAtivo={this.setComponenteAtivo}
              />
            )}
            {componenteAtivo === "senha_recuperada_erro" && (
              <SenhaRecuperadaErro
                setComponenteAtivo={this.setComponenteAtivo}
              />
            )}
            <div className="logo-prefeitura">
              <img
                src={
                  process.env.PUBLIC_URL
                    ? `/${process.env.PUBLIC_URL}/assets/images/logo-sme.svg`
                    : "/assets/images/logo-sme.svg"
                }
                alt=""
              />
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
