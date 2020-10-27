import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./style.scss";
import Botao from "../../../../components/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "../../../../components/Botao/constants";
import { getColor, formatarCPF } from "./helper";
import { Paginacao } from "../../../../components/Paginacao";
import { QUANTIDADE_POR_PAGINA } from "../../../../components/Paginacao/constants";

export class TabelaResultados extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagina: 1,
      offset: 0,
    };
  }

  render() {
    const { closeCollapse, responsaveis, setCodigoEol } = this.props;
    const { pagina } = this.state;
    return (
      <div className="table-results">
        <div className="title">
          <i className="fas fa-file-alt" />
          Cadastro Atualizado
        </div>
        <table className="table-students mt-3">
          <thead>
            <tr className="row">
              <th className="col-3">Nome do responsável</th>
              <th className="col-2">CPF do responsável</th>
              <th className="col-4 text-center">Situação cadastral</th>
              <th className="col-3" />
            </tr>
          </thead>
          <tbody>
            {responsaveis
              .slice(
                QUANTIDADE_POR_PAGINA * (pagina - 1),
                QUANTIDADE_POR_PAGINA * pagina
              )
              .map((responsavel, key) => {
                return (
                  <tr className="row" key={key}>
                    <td className="col-3">{responsavel.nome}</td>
                    <td className="col-2">{formatarCPF(responsavel.cpf)}</td>
                    <td className={`col-4 text-center status`}>
                      <span className={`${getColor(responsavel.status)}`}>
                        {responsavel.status}
                      </span>
                    </td>
                    <td className="col-3 text-center">
                      <Botao
                        style={BUTTON_STYLE.BLUE_OUTLINE}
                        type={BUTTON_TYPE.BUTTON}
                        texto="Visualizar cadastro"
                        onClick={() => {
                          setCodigoEol(responsavel.codigo_eol);
                          closeCollapse();
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            <Paginacao
              onChange={(pagina) => this.setState({ pagina })}
              total={responsaveis.length}
            />
          </tbody>
        </table>
      </div>
    );
  }
}

export default withRouter(TabelaResultados);
