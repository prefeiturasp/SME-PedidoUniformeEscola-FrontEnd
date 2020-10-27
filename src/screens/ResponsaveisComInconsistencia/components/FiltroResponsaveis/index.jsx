import React, { Component } from "react";
import HTTP_STATUS from "http-status-codes";
import { AutoComplete } from "primereact/autocomplete";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { Collapse } from "react-collapse";
import { InputText } from "../../../../components/Input/InputText";
import { ToggleExpandir } from "../../../../components/ToggleExpandir";
import "./style.scss";
import Botao from "../../../../components/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "../../../../components/Botao/constants";
import { formatarNomesResponsaveis, formatarNomesEstudantes, STATUS_INCONSISTENCIAS } from "./helper";
import { toastError } from "../../../../components/Toast/dialogs";
import { getListaResponsaveis } from "../../../../services/listaResponsaveis";
import Select from "../../../../components/Select";

export class FiltroResponsaveis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codigoEol: null,
      cpf: null,
      sugestoesEstudantes: null,
      sugestoesNomesResponsaveis: null,
      openCollapse: true,
      nomesEstudantes: [],
      nomesResponsaveis: [],
      nome_estudante: null,
      nome_responsavel: null,
      status: null,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidUpdate(prevState, prevProps) {
    if (this.state.nome_estudante === "" && prevState.nome_estudante !== "") {
      this.setState({ nome_estudante: null, nome_estudante_valido: null });
    }
    if (
      this.state.nome_responsavel === "" &&
      prevState.nome_responsavel !== ""
    ) {
      this.setState({ nome_responsavel: null, nome_responsavel_valido: null });
    }
  }

  componentDidMount() {
    this.setState({
      nomesEstudantes: formatarNomesEstudantes(this.props.responsaveis),
      nomesResponsaveis: formatarNomesResponsaveis(this.props.responsaveis),
    });
  }

  sugerirEstudantes(event) {
    const { nomesEstudantes } = this.state;
    let sugestoesEstudantes = nomesEstudantes.filter((estudante) => {
      return estudante.toLowerCase().includes(event.query.toLowerCase());
    });
    this.setState({ sugestoesEstudantes });
    if (sugestoesEstudantes.length === 0) {
      this.setState({ nenhumEstudante: true });
    }
  }

  sugerirNomesResponsaveis(event) {
    const { nomesResponsaveis } = this.state;
    let sugestoesNomesResponsaveis = nomesResponsaveis.filter((estudante) => {
      return estudante.toLowerCase().includes(event.query.toLowerCase());
    });

    this.setState({ sugestoesNomesResponsaveis });
    if (sugestoesNomesResponsaveis.length === 0) {
      this.setState({ nenhumResponsavel: true });
    }
  }

  resetForm() {
    this.props.reset("ListaAlunosForm");
    this.setState({
      nome_estudante: null,
      nome_estudante_valido: null,
      nome_responsavel: null,
      nome_responsavel_valido: null,
      sugestoesEstudantes: null,
      sugestoesNomesResponsaveis: null,
    });
  }

  onSubmit(values) {
    const { nome_estudante_valido, nome_responsavel_valido } = this.state;
    let getParams = "?";
    if (values.codigo_eol) {
      getParams += `codigo_eol=${values.codigo_eol}`;
    }
    if (values.cpf_responsavel) {
      if (getParams.length > 1) {
        getParams += "&";
      }
      getParams += `cpf_responsavel=${values.cpf_responsavel
        .replace("-", "")
        .replaceAll(".", "")}`;
    }
    if (nome_estudante_valido) {
      if (getParams.length > 1) {
        getParams += "&";
      }
      getParams += `nome_estudante=${nome_estudante_valido}`;
    }
    if (nome_responsavel_valido) {
      if (getParams.length > 1) {
        getParams += "&";
      }
      getParams += `nome_responsavel=${nome_responsavel_valido}`;
    }
    if (values.status) {
      if (getParams.length > 1) {
        getParams += "&";
      }
      getParams += `status=${values.status}`;
    }
    getListaResponsaveis(getParams)
      .then((response) => {
        if (response.status === HTTP_STATUS.OK) {
          this.props.setCodigoEol(null);
          this.props.setResponsaveis(response.data);
          if (response.data.length === 0) {
            toastError("Nenhum resultado encontrado");
          }
        } else {
          toastError(response.data.detail);
        }
      })
      .catch(() => {
        toastError("Erro ao buscar responsáveis");
      });
  }

  render() {
    const {
      handleSubmit,
      codigo_eol,
      openCollapse,
      alterCollapse,
    } = this.props;
    const {
      codigoEol,
      cpf,
      nome_estudante,
      nome_estudante_valido,
      sugestoesEstudantes,
      nome_responsavel,
      nome_responsavel_valido,
      sugestoesNomesResponsaveis,
      status,
    } = this.state;
    return (
      <div className="list-filter">
        <div className="top-collapse pt-2 pb-2">
          <label>
            Buscar EOL, nome de estudante, CPF do responsável ou nome do
            responsável
          </label>
          <ToggleExpandir
            onClick={() => alterCollapse()}
            ativo={openCollapse}
            className="float-right"
          />
        </div>
        {openCollapse && (
          <Collapse isOpened={openCollapse}>
            <form formKey={1} onSubmit={handleSubmit(this.onSubmit)}>
              <div className="form-group row">
                <div className="col-4">
                  <Field
                    component={InputText}
                    disabled={nome_estudante || nome_responsavel}
                    name="codigo_eol"
                    onChange={(event) =>
                      this.setState({ codigoEol: event.target.value })
                    }
                    type="number"
                    placeholder="Digite o Código EOL do estudante"
                    label="Código EOL"
                  />
                </div>
                <div
                  className={`div-autocomplete col-8 ${
                    sugestoesEstudantes && sugestoesEstudantes.length > 0
                      ? "with-results"
                      : undefined
                  }`}
                >
                  <label htmlFor="nome_estudante" className={`col-form-label`}>
                    Nome do Estudante
                  </label>
                  <AutoComplete
                    name="nome_estudante"
                    minLength={3}
                    disabled={nome_responsavel || codigo_eol}
                    value={nome_estudante}
                    onChange={(e) => this.setState({ nome_estudante: e.value })}
                    onSelect={(e) =>
                      this.setState({ nome_estudante_valido: e.value })
                    }
                    suggestions={sugestoesEstudantes}
                    completeMethod={this.sugerirEstudantes.bind(this)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-4">
                  <Field
                    component={InputText}
                    disabled={nome_estudante || nome_responsavel}
                    name="cpf_responsavel"
                    onChange={(event) =>
                      this.setState({ cpf: event.target.value })
                    }
                    type="text"
                    placeholder="Digite o CPF do responsável"
                    label="CPF do responsável"
                  />
                </div>
                <div
                  className={`div-autocomplete col-8 ${
                    sugestoesNomesResponsaveis &&
                    sugestoesNomesResponsaveis.length > 0
                      ? "with-results"
                      : undefined
                  }`}
                >
                  <label htmlFor="nome_estudante" className={`col-form-label`}>
                    Nome do Responsável por Estudante
                  </label>
                  <AutoComplete
                    name="nome_responsavel"
                    disabled={nome_estudante || codigo_eol}
                    minLength={3}
                    value={nome_responsavel}
                    onChange={(e) =>
                      this.setState({ nome_responsavel: e.value })
                    }
                    onSelect={(e) =>
                      this.setState({ nome_responsavel_valido: e.value })
                    }
                    suggestions={sugestoesNomesResponsaveis}
                    completeMethod={this.sugerirNomesResponsaveis.bind(this)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-4">
                  <Field
                    component={Select}
                    onChange={(e) => this.setState({ status: e.target.value })}
                    name="status"
                    label="Status"
                    options={STATUS_INCONSISTENCIAS}
                    naoDesabilitarPrimeiraOpcao
                  />
                </div>
              </div>
              <div className="row pb-5">
                <div className="col-6">
                  <Botao
                    style={BUTTON_STYLE.RED_OUTLINE}
                    type={BUTTON_TYPE.BUTTON}
                    texto="Limpar"
                    onClick={() => this.resetForm()}
                  />
                </div>
                <div className="col-6 text-right">
                  <Botao
                    style={BUTTON_STYLE.BLUE}
                    type={BUTTON_TYPE.SUBMIT}
                    disabled={
                      !codigoEol &&
                      !cpf &&
                      !nome_estudante_valido &&
                      !nome_responsavel_valido &&
                      !status
                    }
                    texto="Buscar"
                  />
                </div>
              </div>
            </form>
          </Collapse>
        )}
      </div>
    );
  }
}

FiltroResponsaveis = reduxForm({
  form: "ListaResponsaveisForm",
  enableReinitialize: true,
})(FiltroResponsaveis);
const selector = formValueSelector("ListaResponsaveisForm");
const mapStateToProps = (state) => {
  return {
    codigo_eol: selector(state, "codigo_eol"),
  };
};

export default connect(mapStateToProps)(FiltroResponsaveis);
