import React, { Component } from "react";
import { AutoComplete } from "primereact/autocomplete";
import { Field, reduxForm } from "redux-form";
import { Collapse } from "react-collapse";
import { InputText } from "../../../../components/Input/InputText";
import { ToggleExpandir } from "../../../../components/ToggleExpandir";
import "./style.scss";
import Botao from "../../../../components/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "../../../../components/Botao/constants";
import {
  getListaAlunos,
  getTodosAlunos
} from "../../../../services/listaAlunos.service";
import { formatarEstudantes, formatarNomesResponsaveis } from "./helper";

export default class FiltroAlunos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sugestoesEstudantes: null,
      sugestoesNomesResponsaveis: null,
      openCollapse: true,
      estudantes: [],
      nomesResponsaveis: [],
      nome_estudante: null,
      nome_responsavel: null
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    getTodosAlunos().then(response => {
      this.setState({
        estudantes: formatarEstudantes(response.data),
        nomesResponsaveis: formatarNomesResponsaveis(response.data)
      });
    });
  }

  sugerirEstudantes(event) {
    const { estudantes } = this.state;
    let sugestoesEstudantes = estudantes.filter(estudante => {
      return estudante.toLowerCase().includes(event.query.toLowerCase());
    });
    this.setState({ sugestoesEstudantes });
  }

  sugerirNomesResponsaveis(event) {
    const { nomesResponsaveis } = this.state;
    let sugestoesNomesResponsaveis = nomesResponsaveis.filter(estudante => {
      return estudante.toLowerCase().includes(event.query.toLowerCase());
    });

    this.setState({ sugestoesNomesResponsaveis });
  }

  onSubmit(values) {
    const { nome_estudante, nome_responsavel } = this.state;
    let getParams = "?";
    if (values.codigo_eol) {
      getParams += `codigo_eol=${values.codigo_eol}&`;
    }
    if (nome_estudante) {
      if (getParams.length > 1) {
        getParams += "&";
      }
      getParams += `nome_estudante=${nome_estudante}`;
    }
    if (nome_responsavel) {
      if (getParams.length > 1) {
        getParams += "&";
      }
      getParams += `nome_responsavel=${nome_responsavel}`;
    }
    getListaAlunos(getParams).then(response => {
      this.props.setEstudantes(response.data);
    });
  }

  render() {
    const { handleSubmit } = this.props;
    const {
      openCollapse,
      nome_estudante,
      sugestoesEstudantes,
      nome_responsavel,
      sugestoesNomesResponsaveis
    } = this.state;
    return (
      <div className="list-filter">
        <div className="top-collapse pt-2 pb-2">
          <label>Buscar EOL, nome de estudante ou nome do responsável</label>
          <ToggleExpandir
            onClick={() => this.setState({ openCollapse: !openCollapse })}
            ativo={openCollapse}
            className="float-right"
          />
        </div>
        <Collapse isOpened={openCollapse}>
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <div className="form-group row">
              <div className="col-4">
                <Field
                  component={InputText}
                  name="codigo_eol"
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
                  value={nome_estudante}
                  onChange={e => this.setState({ nome_estudante: e.value })}
                  suggestions={sugestoesEstudantes}
                  completeMethod={this.sugerirEstudantes.bind(this)}
                />
              </div>
            </div>
            <div className="form-group row">
              <div
                className={`div-autocomplete offset-4 col-8 ${
                  sugestoesNomesResponsaveis &&
                  sugestoesNomesResponsaveis.length > 0
                    ? "with-results"
                    : undefined
                }`}
              >
                <label htmlFor="nome_estudante" className={`col-form-label`}>
                  Nome do Responsável do Estudante
                </label>
                <AutoComplete
                  name="nome_responsavel"
                  minLength={3}
                  value={nome_responsavel}
                  onChange={e => this.setState({ nome_responsavel: e.value })}
                  suggestions={sugestoesNomesResponsaveis}
                  completeMethod={this.sugerirNomesResponsaveis.bind(this)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 text-right">
                <Botao
                  style={BUTTON_STYLE.BLUE}
                  type={BUTTON_TYPE.SUBMIT}
                  texto="Buscar"
                />
              </div>
            </div>
          </form>
        </Collapse>
      </div>
    );
  }
}

FiltroAlunos = reduxForm({
  form: "ListaAlunosForm",
  enableReinitialize: true
})(FiltroAlunos);
