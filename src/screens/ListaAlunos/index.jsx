import React, { Component } from "react";
import FiltroAlunos from "./components/FiltroAlunos";
import TabelaResultados from "./components/TabelaResultado";
import { getStatusOptions } from "./components/TabelaResultado/helper";

export default class ListaAlunos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      estudantes: [],
      estudantesSemFiltro: [],
      options: []
    };
    this.setEstudantes = this.setEstudantes.bind(this);
  }

  setEstudantes = estudantes => {
    this.setState({ estudantes, estudantesSemFiltro: estudantes });
    const options = getStatusOptions(estudantes);
    this.setState({ options });
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
    const { estudantes, options } = this.state;
    return (
      <div className="card">
        <div className="card-body">
          <FiltroAlunos setEstudantes={this.setEstudantes} />
          {estudantes && estudantes.length > 0 && (
            <div className="pt-4">
              <TabelaResultados
                onSelectStatus={this.onSelectStatus}
                estudantes={estudantes}
                options={options}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
