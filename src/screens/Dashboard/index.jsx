import React, { Component } from "react";
import "./style.scss";

export default class Dashboard extends Component {
  render() {
    return (
      <div className="panel-management">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-6">
                <div className="card">
                  <div className="card-title">Cadastros validados</div>
                  <hr />
                  <div className="card-body padding-altered">
                    <div className="row">
                      <div className="col-6">
                        <div className="colored first-card">
                          <div className="number">03</div>
                          <div className="bigger-label">alunos</div>
                          <div className="smaller-label">on-line</div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="colored second-card">
                          <div className="number">03</div>
                          <div className="bigger-label">alunos</div>
                          <div className="smaller-label">escola</div>
                        </div>
                      </div>
                    </div>
                    <div className="colored third-card mt-4">
                      <span className="bigger-label">Total:</span>
                      <span className="number">03</span>
                      <span className="bigger-label">alunos</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="card">
                  <div className="card-title">Cadastros desatualizados</div>
                  <hr />
                  <div className="card-body padding-altered">
                    <div className="colored fourth-card">
                      <span className="number">03</span>
                      <span className="bigger-label">alunos</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="card">
                      <div className="card-title">
                        Cadastros com pendências resolvidas
                      </div>
                      <hr />
                      <div className="card-body padding-altered">
                        <div className="colored fourth-card">
                          <span className="number">03</span>
                          <span className="bigger-label">alunos</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="card">
                      <div className="card-title">Cadastros divergentes</div>
                      <hr />
                      <div className="card-body padding-altered">
                        <div className="colored fourth-card">
                          <span className="number">03</span>
                          <span className="bigger-label">alunos</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
