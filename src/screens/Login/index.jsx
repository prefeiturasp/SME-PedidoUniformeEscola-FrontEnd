import HTTP_STATUS from "http-status-codes";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { required } from "../../helpers/fieldValidators";
import authService from "../../services/auth.service";
import { setUsuario, recuperaSenha } from "../../services/perfil.service";
import { Botao } from "../../components/Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "../../components/Botao/constants";
import { InputText } from "../../components/Input/InputText";
import { toastError, toastSuccess } from "../../components/Toast/dialogs";
import { validarForm } from "./validate";
import { Cadastro } from "./components/Cadastro";
import "./style.scss";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bloquearBotao: false,
      componenteAtivo: "login",
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

  setComponenteAtivo = componenteAtivo => {
    this.setState({ componenteAtivo });
  };

  handleRecuperaSenha = values => {
    recuperaSenha(values.email_ou_rf).then(resp => {
      if (resp.status === HTTP_STATUS.OK) {
        this.setState({
          componenteAtivo: this.COMPONENTE.RECUPERACAO_SENHA_OK,
          email_recuperacao: resp.data.email
        });
      } else {
        this.setState({
          componenteAtivo: this.COMPONENTE.RECUPERACAO_SENHA_NAO_OK
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
    return (
      <div className="message-signup-success pt-3 pb-3">
        Dados salvos com sucesso. Para ativar seu usuário no ambiente
        administrativo do Portal do Uniforme, acesse a caixa postal do seu
        e-mail cadastrado, entre na mensagem intitulada "Confirme seu e-mail -
        Ambiente administrativo do Portal do Uniforme" e clique no link indicado
        nela.
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

  renderEsqueciSenha() {
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
          <Botao
            className="col-3"
            style={BUTTON_STYLE.BLUE_OUTLINE}
            texto="Voltar"
            onClick={() => this.setState({ componenteAtivo: "login" })}
            type={BUTTON_TYPE.SUBMIT}
          />
          <Botao
            className="col-3 ml-2"
            style={BUTTON_STYLE.BLUE_OUTLINE}
            texto="Cancelar"
            type={BUTTON_TYPE.SUBMIT}
            onClick={() => this.setState({ componenteAtivo: "login" })}
          />
          <Botao
            className="col-3 ml-2"
            style={BUTTON_STYLE.BLUE}
            texto="Continuar"
            type={BUTTON_TYPE.SUBMIT}
            onClick={handleSubmit(values => this.handleRecuperaSenha(values))}
          />
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    const { width, componenteAtivo, bloquearBotao } = this.state;
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
            {componenteAtivo === "cadastro" && (
              <Cadastro
                setComponenteAtivo={this.setComponenteAtivo}
                bloquearBotao={bloquearBotao}
                emailInput={this.emailInput}
                width={width}
                onSubmit={values =>
                  handleSubmit(this.handleSubmitCadastro(values))
                }
              />
            )}
            {componenteAtivo === "cadastrado_com_sucesso" &&
              this.renderCadastradoComSucesso()}
            {componenteAtivo === "esqueci_senha" && this.renderEsqueciSenha()}
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
