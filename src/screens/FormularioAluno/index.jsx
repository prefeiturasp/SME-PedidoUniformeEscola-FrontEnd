import React, { Component, Fragment } from "react";
import HTTP_STATUS from "http-status-codes";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Field, reduxForm, formValueSelector, FormSection } from "redux-form";
import { getAluno, updateAluno } from "../../services/cadastroAluno.service";
import { toastError, toastSuccess } from "../../components/Toast/dialogs";
import Botao from "../../components/Botao";
import {
  BUTTON_ICON,
  BUTTON_TYPE,
  BUTTON_STYLE
} from "../../components/Botao/constants";
import "./style.scss";
import { ToggleSwitch } from "../../components/ToggleSwitch";
import InputText from "../../components/Input/InputText";
import {
  required,
  semTresCaracteresConsecutivos,
  somenteLetrasEEspacos,
  validaCPF,
  semPalavrasBloqueadas
} from "../../helpers/fieldValidators";
import { MaskCPF, getError } from "../../helpers/utils";
import { validaFormulario } from "./validate";
import { formatarPayload } from "./helper";
import { getPalavrasBloqueadas } from "../../services/palavrasBloqueadas.service";

export class FormularioAluno extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aluno: null,
      vinculoEstudante: null,
      editar: false,
      palavrasBloqueadas: null
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const codigo_eol = urlParams.get("codigo_eol");
    getAluno(codigo_eol).then(response => {
      if (response.status === HTTP_STATUS.OK) {
        this.setState({ aluno: response.data });
        this.loadAlunoHard(response.data);
      } else {
        toastError(response.data.detail);
      }
    });
    getPalavrasBloqueadas().then(response => {
      this.setState({ palavrasBloqueadas: response.data });
    });
  }

  loadAlunoHard = aluno => {
    if (aluno.responsaveis.length) {
      const responsavel = aluno.responsaveis[0];
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
          responsavel.tp_pessoa_responsavel.trim()
        );
      }
      if (responsavel.cd_cpf_responsavel) {
        this.props.change(
          "responsavel.cd_cpf_responsavel",
          responsavel.cd_cpf_responsavel.trim()
        );
      }
      if (responsavel.data_nascimento) {
        this.props.change(
          "responsavel.data_nascimento",
          responsavel.data_nascimento
        );
      }
      if (responsavel.nome_mae) {
        this.props.change(
          "responsavel.nome_mae",
          responsavel.nome_mae
        );
      }
    }
  };

  onSubmit(values) {
    const { aluno } = this.state;
    const erro = validaFormulario(values, aluno);
    if (erro) {
      toastError(erro);
    } else {
      updateAluno(formatarPayload(values, aluno)).then(response => {
        if (response.status === HTTP_STATUS.CREATED) {
          toastSuccess("Aluno atualizado com sucesso!");
          this.setState({ editar: false });
        } else {
          toastError(getError(response.data));
        }
      });
    }
  }

  render() {
    const { check, handleSubmit } = this.props;
    const { aluno, editar } = this.state;
    return (
      <div className="student-form">
        <div className="card">
          <div className="card-body">
            {!aluno ? (
              <div>Aluno não encontrado</div>
            ) : (
              <Fragment>
                <form onSubmit={handleSubmit(this.onSubmit)}>
                  <div className="row pb-3">
                    <div className="col-6">
                      <div className="card-title">{aluno.nome}</div>
                    </div>
                  </div>
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
                        label="Nome completo do responsável (sem abreviações)"
                        name="nm_responsavel"
                        placeholder={"Digite o nome do responsável"}
                        required
                        disabled={!editar}
                        type="text"
                        validate={[
                          required,
                          semTresCaracteresConsecutivos,
                          somenteLetrasEEspacos,
                          semPalavrasBloqueadas
                        ]}
                      />
                      <div className="row">
                        <div className="col-6">
                          <Field
                            component={InputText}
                            label="E-mail do responsável"
                            name="email_responsavel"
                            placeholder={"Digite o e-mail do responsável"}
                            required
                            disabled={!editar}
                            type="email"
                            validate={required}
                          />
                        </div>
                        <div className="col-6">
                          <label className="col-form-label label-outside">
                            <span className="required-asterisk">*</span>
                            Telefone celular do responsável
                          </label>
                          <div className="row">
                            <div className="col-3">
                              <Field
                                component={InputText}
                                name="cd_ddd_celular_responsavel"
                                placeholder="11"
                                disabled={!editar}
                                required
                                type="number"
                                validate={required}
                              />
                            </div>
                            <div className="col-9">
                              <Field
                                component={InputText}
                                name="nr_celular_responsavel"
                                disabled={!editar}
                                placeholder={"Digite o celular do responsável"}
                                required
                                type="number"
                                validate={required}
                              />
                            </div>
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
                                disabled={!editar}
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
                                disabled={!editar}
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
                                disabled={!editar}
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
                                disabled={!editar}
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
                            name="cd_cpf_responsavel"
                            disabled
                            required
                            type="text"
                            validate={[required, validaCPF]}
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
                            disabled={!editar}
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
                            disabled={!editar}
                            type="date"
                            validate={required}
                          />
                        </div>
                      </div>
                      <Field
                        component={InputText}
                        label="Nome da mãe do responsável (sem abreviações)"
                        name="nome_mae"
                        placeholder={"Digite o nome da mãe do responsável"}
                        disabled={!editar}
                        required
                        type="text"
                        validate={[
                          required,
                          semTresCaracteresConsecutivos,
                          somenteLetrasEEspacos,
                          semPalavrasBloqueadas
                        ]}
                      />
                      <div className="pt-3">
                        <Field component={"input"} type="hidden" name="value" />
                        <div className="form-check">
                          <label htmlFor="check" className="checkbox-label">
                            <Field
                              component={"input"}
                              type="checkbox"
                              disabled={!editar}
                              name="check"
                              required
                              checked={check}
                            />
                            <span
                              onClick={() =>
                                editar && this.props.change("check", !check)
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
                          disabled={!editar}
                          style={BUTTON_STYLE.BLUE_OUTLINE}
                          type={BUTTON_TYPE.BUTTON}
                          onClick={() =>
                            this.props.history.push("/lista-alunos")
                          }
                        />
                        <Botao
                          className="ml-3"
                          texto="Atualizar cadastro"
                          disabled={!editar}
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
  enableReinitialize: true
})(FormularioAluno);

const selector = formValueSelector("FormularioAlunosForm");
const mapStateToProps = state => {
  return {
    check: selector(state, "check")
  };
};

export default connect(mapStateToProps)(withRouter(FormularioAluno));
