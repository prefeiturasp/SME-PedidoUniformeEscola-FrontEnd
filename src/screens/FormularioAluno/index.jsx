import React, { Component, Fragment } from "react";
import HTTP_STATUS from "http-status-codes";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { getAluno } from "../../services/listaAlunos.service";
import { toastError } from "../../components/Toast/dialogs";
import Botao from "../../components/Botao";
import {
  BUTTON_ICON,
  BUTTON_TYPE,
  BUTTON_STYLE
} from "../../components/Botao/constants";
import "./style.scss";
import { ToggleSwitch } from "../../components/ToggleSwitch";
import InputText from "../../components/Input/InputText";
import { required } from "../../helpers/fieldValidators";

export class FormularioAluno extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aluno: null,
      vinculoEstudante: null
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onVinculoChanged = this.onVinculoChanged.bind(this);
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const codigo_eol = urlParams.get("codigo_eol");
    getAluno(codigo_eol).then(response => {
      if (response.status === HTTP_STATUS.OK) {
        this.setState({ aluno: response.data });
      } else {
        toastError(response.data.detail);
      }
    });
  }

  onVinculoChanged(vinculoEstudante) {
    this.setState({ vinculoEstudante });
  }

  onSubmit(values) {
    console.log(values);
  }

  render() {
    const { check, handleSubmit } = this.props;
    const { aluno } = this.state;
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
                    {/*<div className="col-6 text-right">
                      <Botao
                        texto="voltar"
                        icon={BUTTON_ICON.ARROW_LEFT}
                        style={BUTTON_STYLE.BLUE_OUTLINE}
                        type={BUTTON_TYPE.BUTTON}
                        onClick={() => this.props.history.push("/lista-alunos")}
                      />
                      <Botao
                        className="ml-3"
                        texto="Atualizar cadastro"
                        style={BUTTON_STYLE.BLUE}
                        type={BUTTON_TYPE.SUBMIT}
                      />
                    </div>*/}
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <div className="title">
                        <i className="fas fa-file-alt" />
                        Dados do responsável pelo estudante
                      </div>
                    </div>
                    <div className="col-6 text-right">
                      <ToggleSwitch texto="Editar informações" />
                    </div>
                  </div>
                  <Field
                    component={InputText}
                    label="Nome completo do responsável (sem abreviações)"
                    name="nome_responsavel"
                    placeholder={"Digite o nome do responsável"}
                    required
                    type="text"
                    validate={required}
                  />
                  <div className="row">
                    <div className="col-6">
                      <Field
                        component={InputText}
                        label="E-mail do responsável"
                        name="email"
                        placeholder={"Digite o e-mail do responsável"}
                        required
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
                            name="ddd"
                            placeholder="11"
                            required
                            type="number"
                            validate={required}
                          />
                        </div>
                        <div className="col-9">
                          <Field
                            component={InputText}
                            name="telefone"
                            placeholder={"Digite o e-mail do responsável"}
                            required
                            type="text"
                            validate={required}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="link-with-student">
                    <div className="label">
                      <span className="required-asterisk">*</span>Vínculo com o
                      estudante
                    </div>
                    <div className="row">
                      <div className="col-3">
                        <label className="container-radio">
                          Mãe
                          <Field
                            component={"input"}
                            onChange={event =>
                              this.onVinculoChanged(event.target.value)
                            }
                            type="radio"
                            value="0"
                            data-cy="radio-4h"
                            name="vinculo_estudante"
                          />
                          <span className="checkmark" />
                        </label>
                      </div>
                      <div className="col-3">
                        <label className="container-radio">
                          Pai
                          <Field
                            component={"input"}
                            onChange={event =>
                              this.onVinculoChanged(event.target.value)
                            }
                            type="radio"
                            value="1"
                            data-cy="radio-5-7h"
                            name="vinculo_estudante"
                          />
                          <span className="checkmark" />
                        </label>
                      </div>
                      <div className="col-3">
                        <label className="container-radio">
                          Responsável legal
                          <Field
                            component={"input"}
                            onChange={event =>
                              this.onVinculoChanged(event.target.value)
                            }
                            type="radio"
                            value="2"
                            data-cy="radio-8h"
                            name="vinculo_estudante"
                          />
                          <span className="checkmark" />
                        </label>
                      </div>
                      <div className="col-3">
                        <label className="container-radio">
                          Aluno maior de idade
                          <Field
                            component={"input"}
                            onChange={event =>
                              this.onVinculoChanged(event.target.value)
                            }
                            type="radio"
                            value="3"
                            data-cy="radio-8h"
                            name="vinculo_estudante"
                          />
                          <span className="checkmark" />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row pt-3">
                    <div className="col-4">
                      <Field
                        component={InputText}
                        label="CPF do responsável no EOL"
                        name="cpf_eol"
                        disabled
                        required
                        type="text"
                        validate={required}
                      />
                    </div>
                    <div className="col-4">
                      <Field
                        component={InputText}
                        label="CPF do responsável"
                        name="cpf"
                        placeholder={"Digite o CPF responsável"}
                        required
                        type="text"
                        validate={required}
                      />
                    </div>
                    <div className="col-4">
                      <Field
                        component={InputText}
                        label="Data de nascimento do responsável"
                        name="email"
                        placeholder={"01/01/1990"}
                        required
                        type="email"
                        validate={required}
                      />
                    </div>
                  </div>
                  <Field
                    component={InputText}
                    label="Nome da mãe do responsável (sem abreviações)"
                    name="nome_mae_responsavel"
                    placeholder={"Digite o nome da mãe do responsável"}
                    required
                    type="text"
                    validate={required}
                  />
                  <div className="pt-3">
                    <Field component={"input"} type="hidden" name="value" />
                    <div className="form-check">
                      <label htmlFor="check" className="checkbox-label">
                        <Field
                          component={"input"}
                          type="checkbox"
                          name="check"
                          required
                        />
                        <span
                          onClick={() => this.props.change("check", !check)}
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
                      style={BUTTON_STYLE.BLUE_OUTLINE}
                      type={BUTTON_TYPE.BUTTON}
                      onClick={() => this.props.history.push("/lista-alunos")}
                    />
                    <Botao
                      className="ml-3"
                      texto="Atualizar cadastro"
                      style={BUTTON_STYLE.BLUE}
                      type={BUTTON_TYPE.SUBMIT}
                    />
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
