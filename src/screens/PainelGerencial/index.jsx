import React, { Component, Fragment } from "react";
import HTTP_STATUS from "http-status-codes";
import { withRouter } from "react-router-dom";
import { getDadosPainelGerencial } from "../../services/painelGerencial.service";
import GraficoPizza from "../../components/GraficoPizza";
import "./style.scss";
import { formatarDados } from "./helper";
import { perfilEscola } from "../../helpers/utils";
import { FiltroEscolas } from "./componentes/FiltroEscolas";
import { toastError } from "../../components/Toast/dialogs";

export class PainelGerencial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openCollapse: false,
      dados: null,
      responseError: false,
    };
  }

  componentDidMount() {
    getDadosPainelGerencial().then((response) => {
      if (response.status === HTTP_STATUS.OK) {
        this.setState({ dados: response.data.results });
      } else {
        this.setState({ responseError: true });
      }
    });
  }

  updateDadosPainelGerencial = cod_eol_escola => {
    getDadosPainelGerencial(cod_eol_escola).then((response) => {
      if (response.status === HTTP_STATUS.OK) {
        this.setState({ dados: response.data.results });
        if (response.data.results["total alunos"] === 0) {
          toastError("Sem dados disponíveis")
        }
      } else {
        this.setState({ responseError: true });
      }
    });
  };

  alterCollapse = () => {
    this.setState({ openCollapse: !this.state.openCollapse });
  };

  closeCollapse = () => {
    this.setState({ openCollapse: false });
  };

  render() {
    const { dados, responseError, openCollapse } = this.state;
    return (
      <div className="panel-management">
        <Fragment>
          <div className="card">
            <div className="card-body">
              <FiltroEscolas
                openCollapse={openCollapse}
                alterCollapse={this.alterCollapse}
                updateDadosPainelGerencial={this.updateDadosPainelGerencial}
              />
              {!dados && !responseError && <div>Carregando... </div>}
              {responseError && <div>Erro ao carregar painel gerencial.</div>}
              {dados && (
                <div className="row">
                  <div className="col-6">
                    <div className="card">
                      <div className="card-title">Cadastros validados</div>
                      <hr />
                      <div className="card-body padding-altered">
                        <div className="row">
                          <div className="col-6">
                            <div
                              className={`colored ${
                                perfilEscola() ? "cursor" : undefined
                              } first-card`}
                            >
                              <div className="number">
                                {dados["Cadastros Validados"][
                                  "alunos online"
                                ].toString()}
                              </div>
                              <div className="bigger-label">
                                {dados["Cadastros Validados"][
                                  "alunos online"
                                ] === 1
                                  ? "aluno"
                                  : "alunos"}
                              </div>
                              <div className="smaller-label">on-line</div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div
                              className={`colored ${
                                perfilEscola() ? "cursor" : undefined
                              } second-card`}
                            >
                              <div className="number">
                                {dados["Cadastros Validados"][
                                  "alunos escola"
                                ].toString()}
                              </div>
                              <div className="bigger-label">
                                {dados["Cadastros Validados"][
                                  "alunos escola"
                                ] === 1
                                  ? "aluno"
                                  : "alunos"}
                              </div>
                              <div className="smaller-label">escola</div>
                            </div>
                          </div>
                        </div>
                        <div
                          onClick={() =>
                            perfilEscola() &&
                            this.props.history.push(
                              `/lista-alunos?status=Cadastro Atualizado e validado`
                            )
                          }
                          className={`colored ${
                            perfilEscola() ? "cursor" : undefined
                          } third-card mt-4`}
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
                    {perfilEscola() && (
                      <div className="card">
                        <div className="card-title">
                          Cadastros desatualizados
                        </div>
                        <hr />
                        <div className="card-body padding-altered">
                          <div
                            onClick={() =>
                              perfilEscola() &&
                              this.props.history.push(
                                `/lista-alunos?status=Cadastro Desatualizado`
                              )
                            }
                            className={`colored ${
                              perfilEscola() ? "cursor" : undefined
                            } fourth-card`}
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
                    )}
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
                                perfilEscola() &&
                                this.props.history.push(
                                  `/lista-alunos?status=Cadastro com Pendência Resolvida`
                                )
                              }
                              className={`colored ${
                                perfilEscola() ? "cursor" : undefined
                              } fifth-card`}
                            >
                              <span className="number">
                                {dados[
                                  "Cadastros com pendências resolvidas"
                                ].toString()}
                              </span>
                              <br />
                              <span className="bigger-label">
                                {dados[
                                  "Cadastros com pendências resolvidas"
                                ] === 1
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
                                perfilEscola() &&
                                this.props.history.push(
                                  `/lista-alunos?status=Cadastro Divergente`
                                )
                              }
                              className={`colored ${
                                perfilEscola() ? "cursor" : undefined
                              } sixth-card`}
                            >
                              <span className="number">
                                {dados["Cadastros divergentes"].toString()}
                              </span>
                              <br />
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
              {!dados && !responseError && <div>Carregando...</div>}
              {dados && dados["total alunos"] === 0 && (
                <div>Nenhum dado disponível para o gráfico.</div>
              )}
              {responseError && <div>Erro ao carregar gráficos.</div>}
              {dados && dados["total alunos"] > 0 && (
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
        </Fragment>
      </div>
    );
  }
}

export default withRouter(PainelGerencial);
