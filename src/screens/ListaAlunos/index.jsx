import React, { Component } from "react";
import HTTP_STATUS from "http-status-codes";
import FiltroAlunos from "./components/FiltroAlunos";
import TabelaResultados from "./components/TabelaResultado";
import { getStatusOptions } from "./components/TabelaResultado/helper";
import { FormularioAluno } from "../FormularioAluno";
import { getListaAlunos } from "../../services/listaAlunos.service";
import { toastError } from "../../components/Toast/dialogs";

export class ListaAlunos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codigo_eol: null,
      data_nascimento: null,
      estudantes: [],
      estudantesSemFiltro: [],
      options: [],
      openCollapse: true,
      status: false,
      statusBuscado: null,
    };
    this.setEstudantes = this.setEstudantes.bind(this);
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get("status");
    if (status) {
      getListaAlunos(`?status=${status}`).then((response) => {
        if (response.status === HTTP_STATUS.OK) {
          this.setCodigoEol(null);
          this.setEstudantes(response.data);
          this.setState({ openCollapse: false, statusBuscado: status });
          if (status === "Cadastro Desatualizado") {
            this.setState({ status: true });
          }
          if (response.data.length === 0) {
            toastError("Nenhum resultado encontrado");
          }
        } else {
          toastError(response.data.detail);
        }
      });
    }
  }

  setEstudantes = (estudantes) => {
    this.setState({ estudantes, estudantesSemFiltro: estudantes });
    const options = getStatusOptions(estudantes);
    this.setState({ options });
  };

  alterCollapse = () => {
    this.setState({ openCollapse: !this.state.openCollapse });
  };

  closeCollapse = () => {
    this.setState({ openCollapse: false });
  };

  setCodigoEol = (codigo_eol) => {
    this.setState({ codigo_eol });
  };

  setDataNascimento = (data_nascimento) => {
    this.setState({ data_nascimento });
  };

  onSelectStatus = (status) => {
    const { estudantesSemFiltro } = this.state;
    if (status !== "Situação Cadastral") {
      this.setState({
        estudantes: estudantesSemFiltro.filter(
          (estudante) => estudante.status === status
        ),
      });
    } else {
      this.setState({ estudantes: estudantesSemFiltro });
    }
  };

  render() {
    const {
      estudantes,
      options,
      codigo_eol,
      openCollapse,
      status,
      statusBuscado,
      data_nascimento,
    } = this.state;
    return (
      <div className="card">
        <div className="card-body">
          <FiltroAlunos
            codigoEol={codigo_eol}
            openCollapse={openCollapse}
            alterCollapse={this.alterCollapse}
            setEstudantes={this.setEstudantes}
            setCodigoEol={this.setCodigoEol}
          />
          {estudantes && estudantes.length > 0 && !codigo_eol && (
            <div className="pt-4">
              <TabelaResultados
                onSelectStatus={this.onSelectStatus}
                setCodigoEol={this.setCodigoEol}
                setDataNascimento={this.setDataNascimento}
                alterCollapse={this.alterCollapse}
                closeCollapse={this.closeCollapse}
                estudantes={estudantes.sort((a, b) => {
                  let param = a.nome ? "nome" : "nm_aluno";
                  if (a[param] < b[param]) return -1;
                  else if (a[param] > b[param]) return 1;
                  return 0;
                })}
                statusBuscado={statusBuscado}
                options={options}
              />
            </div>
          )}
          {codigo_eol && (
            <div className="pt-3">
              <FormularioAluno
                dataNascimento={data_nascimento}
                codigoEol={codigo_eol}
                status={status}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ListaAlunos;
