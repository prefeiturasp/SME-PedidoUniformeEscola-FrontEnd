import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./style.scss";
import Botao from "../../../../components/Botao";
import { Select } from "../../../../components/Select";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "../../../../components/Botao/constants";
import { getColor } from "./helper";
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
    const {
      closeCollapse,
      estudantes,
      setCodigoEol,
      setDataNascimento,
      statusBuscado,
    } = this.props;
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
              <th className="col-5">Nome do estudante</th>
              <th className="col-4 text-center">Situação Cadastral</th>
              <th className="col-3" />
            </tr>
          </thead>
          <tbody>
            {estudantes
              .slice(
                QUANTIDADE_POR_PAGINA * (pagina - 1),
                QUANTIDADE_POR_PAGINA * pagina
              )
              .map((estudante, key) => {
                return (
                  <tr className="row" key={key}>
                    <td className="col-5">
                      {estudante.nome || estudante.nm_aluno.toString()}
                    </td>
                    <td className={`col-4 text-center status`}>
                      <span
                        className={`${getColor(
                          statusBuscado ||
                            estudante.status ||
                            "Cadastro Desatualizado"
                        )}`}
                      >
                        {statusBuscado ||
                          estudante.status ||
                          "Cadastro Desatualizado"}
                      </span>
                    </td>
                    <td className="col-3 text-center">
                      <Botao
                        style={BUTTON_STYLE.BLUE_OUTLINE}
                        type={BUTTON_TYPE.BUTTON}
                        texto="Visualizar cadastro"
                        onClick={() => {
                          setCodigoEol(
                            estudante.codigo_eol || estudante.cd_aluno
                          );
                          setDataNascimento(estudante.dt_nascimento_aluno);
                          closeCollapse();
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            <Paginacao
              onChange={(pagina) => this.setState({ pagina })}
              total={estudantes.length}
            />
          </tbody>
        </table>
      </div>
    );
  }
}

export default withRouter(TabelaResultados);
