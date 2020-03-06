import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { getDadosPainelGerencial } from "../../services/painelGerencial.service";
import GraficoPizza from "../../components/GraficoPizza";
import "./style.scss";
import { formatarDados } from "./helper";

export class PainelGerencial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dados: null
    };
  }

  componentDidMount() {
    getDadosPainelGerencial().then(response => {
      this.setState({ dados: response.data.results });
    });
  }

  render() {
    const { dados } = this.state;
    return (
      <div className="panel-management">
        <div className="card">
          <div className="card-body">
            {!dados ? (
              <div>Carregando... </div>
            ) : (
              <div className="row">
                <div className="col-6">
                  <div className="card">
                    <div className="card-title">Cadastros validados</div>
                    <hr />
                    <div className="card-body padding-altered">
                      <div className="row">
                        <div className="col-6">
                          <div className="colored first-card">
                            <div className="number">
                              {dados["Cadastros Validados"][
                                "alunos online"
                              ].toString()}
                            </div>
                            <div className="bigger-label">
                              {dados["Cadastros Validados"]["alunos online"] ===
                              1
                                ? "aluno"
                                : "alunos"}
                            </div>
                            <div className="smaller-label">on-line</div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="colored second-card">
                            <div className="number">
                              {dados["Cadastros Validados"][
                                "alunos escola"
                              ].toString()}
                            </div>
                            <div className="bigger-label">
                              {dados["Cadastros Validados"]["alunos escola"] ===
                              1
                                ? "aluno"
                                : "alunos"}
                            </div>
                            <div className="smaller-label">escola</div>
                          </div>
                        </div>
                      </div>
                      <div
                        onClick={() =>
                          this.props.history.push(
                            `/lista-alunos?status=Cadastro Atualizado e validado`
                          )
                        }
                        className="colored third-card mt-4"
                      >
                        <span className="bigger-label">Total:</span>
                        <span className="number">
                          {dados["Cadastros Validados"]["total"].toString()}
                        </span>
                        <span className="bigger-label">
                          {dados["Cadastros Validados"]["total"] === 1
                            ? "aluno"
                            : "alunos"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card">
                    <div className="card-title">Cadastros desatualizados</div>
                    <hr />
                    <div className="card-body padding-altered">
                      <div
                        onClick={() =>
                          this.props.history.push(
                            `/lista-alunos?status=Cadastro Desatualizado`
                          )
                        }
                        className="colored fourth-card"
                      >
                        <span className="number">
                          {dados["Cadastros desatualizados"].toString()}
                        </span>
                        <span className="bigger-label">
                          {dados["Cadastros desatualizados"] === 1
                            ? "aluno"
                            : "alunos"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="row pt-2">
                    <div className="col-6">
                      <div className="card">
                        <div className="card-title">
                          Cadastros com <br /> pendências resolvidas
                        </div>
                        <hr />
                        <div className="card-body padding-altered">
                          <div
                            onClick={() =>
                              this.props.history.push(
                                `/lista-alunos?status=Cadastro com Pendência Resolvida`
                              )
                            }
                            className="colored fifth-card"
                          >
                            <span className="number">
                              {dados[
                                "Cadastros com pendências resolvidas"
                              ].toString()}
                            </span>
                            <span className="bigger-label">
                              {dados["Cadastros com pendências resolvidas"] ===
                              1
                                ? "aluno"
                                : "alunos"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="card">
                        <div className="card-title">
                          Cadastros <br /> divergentes
                        </div>
                        <hr />
                        <div className="card-body padding-altered">
                          <div
                            onClick={() =>
                              this.props.history.push(
                                `/lista-alunos?status=Cadastro Divergente`
                              )
                            }
                            className="colored sixth-card"
                          >
                            <span className="number">
                              {dados["Cadastros divergentes"].toString()}
                            </span>
                            <span className="bigger-label">
                              {dados["Cadastros divergentes"] === 1
                                ? "aluno"
                                : "alunos"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="card graph mt-3">
          <div className="card-body">
            {!dados ? (
              <div>Carregando...</div>
            ) : dados["total alunos"] === 0 ? (
              <div>Nenhum dado disponível para o gráfico.</div>
            ) : (
              <Fragment>
                <div className="title">
                  <i className="fas fa-chart-pie" />
                  Estado da atualização cadastral
                </div>
                <GraficoPizza dados={formatarDados(dados)} />
              </Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(PainelGerencial);
