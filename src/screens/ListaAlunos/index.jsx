import React, { Component } from "react";
import FiltroAlunos from "./components/FiltroAlunos";
import TabelaResultados from "./components/TabelaResultado";
import { getStatusOptions } from "./components/TabelaResultado/helper";
import { FormularioAluno } from "../FormularioAluno";

export class ListaAlunos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codigo_eol: null,
      estudantes: [],
      estudantesSemFiltro: [],
      options: [],
      openCollapse: true
    };
    this.setEstudantes = this.setEstudantes.bind(this);
  }

  setEstudantes = estudantes => {
    this.setState({ estudantes, estudantesSemFiltro: estudantes });
    const options = getStatusOptions(estudantes);
    this.setState({ options });
  };

  alterCollapse = () => {
    this.setState({ openCollapse: !this.state.openCollapse });
  };

  setCodigoEol = codigo_eol => {
    this.setState({ codigo_eol });
  };

  onSelectStatus = status => {
    const { estudantesSemFiltro } = this.state;
    if (status !== "Situação Cadastral") {
      this.setState({
        estudantes: estudantesSemFiltro.filter(
          estudante => estudante.status === status
        )
      });
    } else {
      this.setState({ estudantes: estudantesSemFiltro });
    }
  };

  render() {
    const { estudantes, options, codigo_eol, openCollapse } = this.state;
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
                alterCollapse={this.alterCollapse}
                estudantes={estudantes}
                options={options}
              />
            </div>
          )}
          {codigo_eol && (
            <div className="pt-3">
              <FormularioAluno codigoEol={codigo_eol} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ListaAlunos;
