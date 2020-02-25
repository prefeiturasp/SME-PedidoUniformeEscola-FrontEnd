import React, { Component } from "react";
import FiltroAlunos from "./components/FiltroAlunos";
import TabelaResultados from "./components/TabelaResultado";

export default class ListaAlunos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      estudantes: []
    };
    this.setEstudantes = this.setEstudantes.bind(this);
  }

  setEstudantes = estudantes => {
    this.setState({ estudantes });
  };

  render() {
    const { estudantes } = this.state;
    return (
      <div className="card">
        <div className="card-body">
          <FiltroAlunos setEstudantes={this.setEstudantes} />
          {estudantes && estudantes.length > 0 && (
            <TabelaResultados estudantes={estudantes} />
          )}
        </div>
      </div>
    );
  }
}
