import React, { Component, Fragment } from "react";
import HTTP_STATUS from "http-status-codes";
import { connect } from "react-redux";
import { Field, reduxForm, formValueSelector, FormSection } from "redux-form";
import {
  getAluno,
  updateAluno,
  getAlunoEOL,
} from "../../services/cadastroAluno.service";
import { toastError, toastSuccess } from "../../components/Toast/dialogs";
import Botao from "../../components/Botao";
import {
  BUTTON_ICON,
  BUTTON_TYPE,
  BUTTON_STYLE,
} from "../../components/Botao/constants";
import "./style.scss";
import { ToggleSwitch } from "../../components/ToggleSwitch";
import InputText from "../../components/Input/InputText";
import {
  required,
  semTresCaracteresConsecutivos,
  somenteLetrasEEspacos,
  validaCPF,
  semPalavrasBloqueadas,
} from "../../helpers/fieldValidators";
import { MaskCPF, getError } from "../../helpers/utils";
import { validaFormulario } from "./validate";
import { formatarPayload } from "./helper";
import { getPalavrasBloqueadas } from "../../services/palavrasBloqueadas.service";
import { LoadingCircle } from "../../components/LoadingCircle";

export class FormularioAluno extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: false,
      nao_possui_celular: false,
      nao_possui_email: false,
      aluno: null,
      vinculoEstudante: null,
      editar: false,
      palavrasBloqueadas: null,
      sending: false,
      enviado_para_mercado_pago: false,
      loading: true,
      erroAPI: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onNaoPossuiCelularChecked() {
    const { nao_possui_celular } = this.state;
    this.setState({
      nao_possui_celular: !nao_possui_celular,
    });
    this.props.change("responsavel.cd_ddd_celular_responsavel", null);
    this.props.change("responsavel.nr_celular_responsavel", null);
  }

  onNaoPossuiEmailChecked() {
    const { nao_possui_email } = this.state;
    this.setState({
      nao_possui_email: !nao_possui_email,
    });
    this.props.change("responsavel.email_responsavel", null);
  }

  componentDidMount() {
    const { codigoEol, dataNascimento, status } = this.props;
    if (!status) {
      getAluno(codigoEol)
        .then((response) => {
          if (response.status === HTTP_STATUS.OK) {
            this.setState({ aluno: response.data, loading: false });
            this.loadAlunoHard(response.data);
          } else {
            toastError(response.data.detail);
            this.setState({ loading: false });
          }
        })
        .catch(() => {
          this.setState({ loading: false, erroAPI: true });
        });
    } else {
      getAlunoEOL({
        codigo_eol: codigoEol,
        data_nascimento: dataNascimento.slice(0, 10),
      })
        .then((response) => {
          if (response.status === HTTP_STATUS.OK) {
            this.setState({ aluno: response.data.detail, loading: false });
            this.loadAlunoHard(response.data.detail);
          } else {
            toastError(response.data.detail);
            this.setState({ loading: false });
          }
        })
        .catch(() => {
          this.setState({ loading: false, erroAPI: true });
        });
    }
    getPalavrasBloqueadas().then((response) => {
      this.setState({ palavrasBloqueadas: response.data });
    });
  }

  loadAlunoHard = (aluno) => {
    if (aluno.responsaveis.length) {
      const responsavel = aluno.responsaveis[0];
      if (
        !this.props.inconsistencias &&
        (responsavel.enviado_para_mercado_pago ||
          responsavel.status === "INCONSISTENCIA_RESOLVIDA")
      ) {
        toastError(
          "Cadastro enviado para o Mercado pago. Não é possivel fazer alterações no momento."
        );
      }
      this.setState({
        nao_possui_celular: responsavel.nao_possui_celular,
        nao_possui_email: responsavel.nao_possui_email,
        enviado_para_mercado_pago: responsavel.enviado_para_mercado_pago,
      });

      this.props.change(
        "responsavel.nm_responsavel",
        responsavel.nm_responsavel.trim()
      );
      if (responsavel.nm_responsavel) {
        this.props.change(
          "responsavel.nm_responsavel",
          responsavel.nm_responsavel.trim()
        );
      }
      if (responsavel.email_responsavel) {
        this.props.change(
          "responsavel.email_responsavel",
          responsavel.email_responsavel.trim()
        );
      }
      if (responsavel.cd_ddd_celular_responsavel) {
        this.props.change(
          "responsavel.cd_ddd_celular_responsavel",
          responsavel.cd_ddd_celular_responsavel.trim()
        );
      }
      if (responsavel.nr_celular_responsavel) {
        this.props.change(
          "responsavel.nr_celular_responsavel",
          responsavel.nr_celular_responsavel.trim()
        );
      }
      if (responsavel.tp_pessoa_responsavel) {
        this.props.change(
          "responsavel.tp_pessoa_responsavel",
          responsavel.tp_pessoa_responsavel.toString().trim()
        );
      }
      if (responsavel.cpf_eol || responsavel.cd_cpf_responsavel) {
        this.props.change(
          "responsavel.cpf_eol",
          responsavel.cpf_eol
            ? responsavel.cpf_eol.toString()
            : responsavel.cd_cpf_responsavel.toString().trim()
        );
      }
      if (responsavel.cd_cpf_responsavel) {
        this.props.change(
          "responsavel.cd_cpf_responsavel",
          responsavel.cd_cpf_responsavel.toString().trim()
        );
      }
      if (responsavel.nome_responsavel_eol) {
        this.props.change(
          "responsavel.nome_responsavel_eol",
          responsavel.nome_responsavel_eol.toString().trim()
        );
      }
      if (responsavel.data_nascimento) {
        this.props.change(
          "responsavel.data_nascimento",
          responsavel.data_nascimento
        );
      }
      if (responsavel.nome_mae) {
        this.props.change("responsavel.nome_mae", responsavel.nome_mae);
      }
    }
  };

  onSubmit(values) {
    const { aluno } = this.state;
    const erro = validaFormulario(values, aluno);
    if (erro) {
      toastError(erro);
    } else {
      this.setState({ sending: true });
      updateAluno(formatarPayload(values, this.state, this.props)).then(
        (response) => {
          this.setState({ sending: false });
          if (response.status === HTTP_STATUS.CREATED) {
            toastSuccess("Aluno atualizado com sucesso!");
          } else {
            toastError(getError(response.data));
          }
        }
      );
    }
  }

  render() {
    const { handleSubmit, inconsistencias } = this.props;
    const {
      check,
      nao_possui_celular,
      nao_possui_email,
      aluno,
      editar,
      sending,
      enviado_para_mercado_pago,
      loading,
      erroAPI,
    } = this.state;
    const nao_pode_editar =
      !inconsistencias &&
      (enviado_para_mercado_pago ||
        (aluno &&
          aluno.responsaveis &&
          aluno.responsaveis[0].status === "INCONSISTENCIA_RESOLVIDA"));
    return (
      <div className="student-form">
        <div className="card">
          <div className="card-body">
            {erroAPI && <div>Erro ao carregar dados do aluno</div>}
            {loading && !erroAPI && (
              <div className="loading-circle">
                <LoadingCircle />
              </div>
            )}
            {!loading && !aluno && !erroAPI && <div>Aluno não encontrado</div>}
            {!loading && aluno && (
              <Fragment>
                <form formKey={2} onSubmit={handleSubmit(this.onSubmit)}>
                  <div className="row pb-3">
                    <div className="col-6">
                      <div className="card-title">
                        {aluno.nome || aluno.nm_aluno}
                      </div>
                    </div>
                  </div>
                  {inconsistencias && (
                    <div className="card mb-3">
                      <div className="card-body">
                        {aluno.responsaveis[0].retornos.map((retorno) => {
                          return (
                            <div className="inconsistencias">
                              <span className="font-weight-bold">
                                Inconsistência do Mercado Pago:{" "}
                              </span>
                              {retorno.mensagem}
                              {retorno.emails && (
                                <div>
                                  <span className="font-weight-bold">
                                    Emails:{" "}
                                  </span>
                                  {retorno.emails.join(", ")}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  <div className="row">
                    <div className="col-6">
                      <div className="title">
                        <i className="fas fa-file-alt" />
                        Dados do responsável pelo estudante
                      </div>
                    </div>
                    <div className="col-6 text-right">
                      <ToggleSwitch
                        onClick={() => this.setState({ editar: !editar })}
                        texto="Editar informações"
                      />
                    </div>
                  </div>
                  <div className={`${!editar ? "set-opacity" : undefined}`}>
                    <FormSection name="responsavel">
                      <Field
                        component={InputText}
                        label="Nome completo do responsável no EOL"
                        name="nome_responsavel_eol"
                        disabled
                      />
                      <Field
                        component={InputText}
                        label="Nome completo do responsável (sem abreviações)"
                        name="nm_responsavel"
                        placeholder={"Digite o nome do responsável"}
                        required
                        disabled={!editar || nao_pode_editar}
                        type="text"
                        validate={[
                          required,
                          semTresCaracteresConsecutivos,
                          somenteLetrasEEspacos,
                          semPalavrasBloqueadas,
                        ]}
                      />
                      <div className="row">
                        <div className="col-5">
                          <Field
                            component={InputText}
                            label="E-mail do responsável"
                            name="email_responsavel"
                            placeholder={"Digite o e-mail do responsável"}
                            required={!nao_possui_email}
                            disabled={
                              !editar || nao_possui_email || nao_pode_editar
                            }
                            type="email"
                            validate={!nao_possui_email && required}
                          />
                        </div>
                        <div className="col-7">
                          <label className="col-form-label label-outside">
                            {!nao_possui_celular && (
                              <span className="required-asterisk">*</span>
                            )}
                            Telefone celular do responsável
                          </label>
                          <div className="row">
                            <div className="col-4">
                              <Field
                                component={InputText}
                                name="cd_ddd_celular_responsavel"
                                placeholder="11"
                                disabled={
                                  !editar ||
                                  nao_possui_celular ||
                                  nao_pode_editar
                                }
                                required={!nao_possui_celular}
                                type="number"
                                validate={!nao_possui_celular && required}
                              />
                            </div>
                            <div className="col-8">
                              <Field
                                component={InputText}
                                name="nr_celular_responsavel"
                                disabled={
                                  !editar ||
                                  nao_possui_celular ||
                                  nao_pode_editar
                                }
                                placeholder={"Digite o celular do responsável"}
                                required={!nao_possui_celular}
                                type="number"
                                validate={!nao_possui_celular && required}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row pt-3 pb-3">
                        <div className="col-6">
                          {(!inconsistencias ||
                            aluno.responsaveis[0].status ===
                              "CPF_INVALIDO") && (
                            <Fragment>
                              <Field
                                component={"input"}
                                type="hidden"
                                name="value"
                              />
                              <div className="form-check">
                                <label
                                  htmlFor="nao_possui_email"
                                  className="checkbox-label"
                                >
                                  <Field
                                    component={"input"}
                                    type="checkbox"
                                    disabled={!editar || nao_pode_editar}
                                    name="nao_possui_email"
                                    checked={nao_possui_email}
                                  />
                                  <span
                                    onClick={() =>
                                      editar &&
                                      !nao_pode_editar &&
                                      this.onNaoPossuiEmailChecked()
                                    }
                                    className="checkbox-custom"
                                  />{" "}
                                  <span className="pl-3">
                                    Não possui e-mail
                                  </span>
                                </label>
                              </div>
                            </Fragment>
                          )}
                        </div>
                        <div className="col-6">
                          <Field
                            component={"input"}
                            type="hidden"
                            name="value"
                          />
                          <div className="form-check">
                            <label
                              htmlFor="nao_possui_celular"
                              className="checkbox-label"
                            >
                              <Field
                                component={"input"}
                                type="checkbox"
                                disabled={!editar || nao_pode_editar}
                                name="nao_possui_celular"
                                checked={nao_possui_celular}
                              />
                              <span
                                onClick={() => {
                                  editar &&
                                    !nao_pode_editar &&
                                    this.onNaoPossuiCelularChecked();
                                }}
                                className="checkbox-custom"
                              />{" "}
                              <span className="pl-3">Não possui celular</span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="link-with-student">
                        <div className="label">
                          <span className="required-asterisk">*</span>Vínculo
                          com o estudante
                        </div>
                        <div className="row">
                          <div className="col-3">
                            <label className="container-radio">
                              Mãe
                              <Field
                                component={"input"}
                                type="radio"
                                value="1"
                                disabled={!editar || nao_pode_editar}
                                data-cy="radio-4h"
                                name="tp_pessoa_responsavel"
                              />
                              <span className="checkmark" />
                            </label>
                          </div>
                          <div className="col-3">
                            <label className="container-radio">
                              Pai
                              <Field
                                component={"input"}
                                type="radio"
                                disabled={!editar || nao_pode_editar}
                                value="2"
                                data-cy="radio-5-7h"
                                name="tp_pessoa_responsavel"
                              />
                              <span className="checkmark" />
                            </label>
                          </div>
                          <div className="col-3">
                            <label className="container-radio">
                              Responsável legal
                              <Field
                                component={"input"}
                                type="radio"
                                value="3"
                                disabled={!editar || nao_pode_editar}
                                data-cy="radio-8h"
                                name="tp_pessoa_responsavel"
                              />
                              <span className="checkmark" />
                            </label>
                          </div>
                          <div className="col-3">
                            <label className="container-radio">
                              Aluno maior de idade
                              <Field
                                component={"input"}
                                type="radio"
                                disabled={!editar || nao_pode_editar}
                                value="4"
                                data-cy="radio-8h"
                                name="tp_pessoa_responsavel"
                              />
                              <span className="checkmark" />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="row pt-3">
                        <div className="col-4">
                          <Field
                            {...MaskCPF}
                            component={InputText}
                            label="CPF do responsável no EOL"
                            name="cpf_eol"
                            disabled
                            type="text"
                          />
                        </div>
                        <div className="col-4">
                          <Field
                            {...MaskCPF}
                            component={InputText}
                            label="CPF do responsável"
                            name="cd_cpf_responsavel"
                            placeholder={"Digite o CPF responsável"}
                            required
                            disabled={!editar || nao_pode_editar}
                            type="text"
                            validate={[required, validaCPF]}
                          />
                        </div>
                        <div className="col-4">
                          <Field
                            component={InputText}
                            label="Data de nascimento do responsável"
                            name="data_nascimento"
                            placeholder={"01/01/1990"}
                            required
                            disabled={!editar || nao_pode_editar}
                            type="date"
                            min="1930-01-01"
                            validate={required}
                          />
                        </div>
                      </div>
                      <Field
                        component={InputText}
                        label="Nome da mãe do responsável (sem abreviações)"
                        name="nome_mae"
                        placeholder={"Digite o nome da mãe do responsável"}
                        disabled={!editar || nao_pode_editar}
                        required
                        type="text"
                        validate={[
                          required,
                          semTresCaracteresConsecutivos,
                          somenteLetrasEEspacos,
                          semPalavrasBloqueadas,
                        ]}
                      />
                      <div className="pt-3">
                        <Field component={"input"} type="hidden" name="value" />
                        <div className="form-check">
                          <label htmlFor="check" className="checkbox-label">
                            <Field
                              component={"input"}
                              type="checkbox"
                              disabled={!editar || nao_pode_editar}
                              name="check"
                              required
                              checked={check}
                            />
                            <span
                              onClick={() =>
                                editar &&
                                !nao_pode_editar &&
                                this.setState({ check: !check })
                              }
                              className="checkbox-custom"
                            />{" "}
                            <span className="pl-3">
                              Declaro que as informações acima são verdadeiras
                            </span>
                          </label>
                        </div>
                      </div>
                      <div className="pt-3 text-right">
                        <Botao
                          texto="voltar"
                          icon={BUTTON_ICON.ARROW_LEFT}
                          disabled={!editar || nao_pode_editar}
                          style={BUTTON_STYLE.BLUE_OUTLINE}
                          type={BUTTON_TYPE.BUTTON}
                          onClick={() =>
                            (window.location.href = `/${process.env.PUBLIC_URL}`)
                          }
                        />
                        <Botao
                          className="ml-3"
                          texto={sending ? `Aguarde...` : `Atualizar cadastro`}
                          disabled={!editar || sending || nao_pode_editar}
                          style={BUTTON_STYLE.BLUE}
                          type={BUTTON_TYPE.SUBMIT}
                        />
                      </div>
                    </FormSection>
                  </div>
                </form>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}

FormularioAluno = reduxForm({
  form: "FormularioAlunosForm",
  enableReinitialize: true,
})(FormularioAluno);

const selector = formValueSelector("FormularioAlunosForm");
const mapStateToProps = (state) => {
  return {
    check: selector(state, "check"),
  };
};

export default connect(mapStateToProps)(FormularioAluno);
