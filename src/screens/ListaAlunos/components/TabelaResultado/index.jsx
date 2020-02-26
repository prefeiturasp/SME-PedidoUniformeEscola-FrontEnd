import React, { Component } from "react";
import "./style.scss";
import Botao from "../../../../components/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "../../../../components/Botao/constants";
import { getColor } from "./helper";

export default class TabelaResultados extends Component {
  render() {
    const { estudantes } = this.props;
    return (
      <div className="table-results">
        <div className="title">
          <i className="fas fa-file-alt" />
          Cadastro Atualizado
        </div>
        <table className="table-students mt-3">
          <thead>
            <tr className="row">
              <th className="col-6">Nome do estudante</th>
              <th className="col-3 text-center">
                {/*<Select
                  onChange={event => onSelectStatus(event.target.value)}
                  options={options}
                  naoDesabilitarPrimeiraOpcao
                />*/}
                Situação Cadastral
              </th>
              <th className="col-3" />
            </tr>
          </thead>
          <tbody>
            {estudantes.map((estudante, key) => {
              return (
                <tr className="row" key={key}>
                  <td className="col-6">{estudante.nome}</td>
                  <td className={`col-3 text-center status`}>
                    <span className={`${getColor(estudante.status)}`}>
                      {estudante.status}
                    </span>
                  </td>
                  <td className="col-3 text-center">
                    <Botao
                      style={BUTTON_STYLE.BLUE_OUTLINE}
                      type={BUTTON_TYPE.BUTTON}
                      texto="Visualizar cadastro"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
