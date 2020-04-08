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
import {
  getListaAlunos,
  getTodosAlunos,
} from "../../../../services/listaAlunos.service";
import { formatarEstudantes, formatarNomesResponsaveis } from "./helper";
import { toastError } from "../../../../components/Toast/dialogs";
import {
  perfilSME,
  perfilEscola,
  perfilDRE,
  getInstituicao,
} from "../../../../helpers/utils";

export class FiltroEscolas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sugestoesEstudantes: null,
      sugestoesNomesResponsaveis: null,
      openCollapse: true,
      estudantes: [],
      nomesResponsaveis: [],
      nome_estudante: null,
      nome_responsavel: null,
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
    getTodosAlunos().then((response) => {
      this.setState({
        estudantes: formatarEstudantes(response.data),
        nomesResponsaveis: formatarNomesResponsaveis(response.data),
      });
    });
    if (perfilDRE()) {
      this.props.change("nome_dre", getInstituicao());
    }
  }

  sugerirEstudantes(event) {
    const { estudantes } = this.state;
    let sugestoesEstudantes = estudantes.filter((estudante) => {
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
    getListaAlunos(getParams).then((response) => {
      if (response.status === HTTP_STATUS.OK) {
        this.props.setCodigoEol(null);
        this.props.setEstudantes(response.data);
        if (response.data.length === 0) {
          toastError("Nenhum resultado encontrado");
        }
      } else {
        toastError(response.data.detail);
      }
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
      nome_estudante,
      nome_estudante_valido,
      sugestoesEstudantes,
      nome_responsavel,
      nome_responsavel_valido,
      sugestoesNomesResponsaveis,
    } = this.state;
    return (
      <div className={`list-filter ${!perfilEscola() ? "mb-5" : undefined}`}>
        {!perfilEscola() && (
          <div className="top-collapse pt-2 pb-2">
            <label>Buscar por {perfilSME() && "DRE's ou "}Escolas</label>
            <ToggleExpandir
              onClick={() => alterCollapse()}
              ativo={openCollapse}
              className="float-right"
            />
          </div>
        )}
        {openCollapse && (
          <Collapse isOpened={openCollapse}>
            <form formKey={1} onSubmit={handleSubmit(this.onSubmit)}>
              <div className="form-group row">
                <div className="col-6">
                  <Field
                    component={InputText}
                    disabled={perfilDRE()}
                    name="nome_dre"
                    type="text"
                    label="Nome da DRE"
                  />
                </div>
                <div
                  className={`div-autocomplete col-6 ${
                    sugestoesEstudantes && sugestoesEstudantes.length > 0
                      ? "with-results"
                      : undefined
                  }`}
                >
                  <label htmlFor="nome_estudante" className={`col-form-label`}>
                    Nome da Escola
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
                      !codigo_eol &&
                      !nome_estudante_valido &&
                      !nome_responsavel_valido
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

FiltroEscolas = reduxForm({
  form: "FiltroEscolasForm",
  enableReinitialize: true,
})(FiltroEscolas);
const selector = formValueSelector("FiltroEscolasForm");
const mapStateToProps = (state) => {
  return {
    codigo_eol: selector(state, "codigo_eol"),
  };
};

export default connect(mapStateToProps)(FiltroEscolas);
