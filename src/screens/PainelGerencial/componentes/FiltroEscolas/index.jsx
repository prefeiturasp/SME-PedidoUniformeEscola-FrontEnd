import React, { Component } from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { Collapse } from "react-collapse";
import { InputText } from "../../../../components/Input/InputText";
import { ToggleExpandir } from "../../../../components/ToggleExpandir";
import "./style.scss";
import Botao from "../../../../components/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "../../../../components/Botao/constants";
import {
  perfilSME,
  perfilDRE,
  getInstituicao,
} from "../../../../helpers/utils";

export class FiltroEscolas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openCollapse: true,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (perfilDRE()) {
      this.props.change("nome_dre", getInstituicao());
    }
  }

  resetForm() {
    this.props.reset("FiltroEscolasForm");
    if (perfilDRE()) {
      this.props.change("nome_dre", getInstituicao());
    }
  }

  onSubmit(values) {
    this.props.updateDadosPainelGerencial(values.cod_eol_escola);
  }

  render() {
    const { handleSubmit, openCollapse, alterCollapse } = this.props;
    return (
      <div className={`list-filter ${perfilDRE() ? "mb-5" : undefined}`}>
        {perfilDRE() && (
          <div className="top-collapse pt-2 pb-2">
            <label>Buscar por {perfilSME() && "DRE's ou "}Escolas</label>
            <ToggleExpandir
              onClick={() => alterCollapse()}
              ativo={openCollapse}
              className="float-right"
            />
          </div>
        )}
        {openCollapse && (
          <Collapse isOpened={openCollapse}>
            <form formKey={1} onSubmit={handleSubmit(this.onSubmit)}>
              <div className="form-group row">
                <div className="col-6">
                  <Field
                    component={InputText}
                    disabled={perfilDRE()}
                    name="nome_dre"
                    type="text"
                    label="Nome da DRE"
                  />
                </div>
                <div className="col-6">
                  <Field
                    label="Código EOL da Escola"
                    component={InputText}
                    type="number"
                    name="cod_eol_escola"
                    helpText="Insira 6 dígitos"
                  />
                </div>
              </div>
              <div className="row pb-5">
                <div className="col-6">
                  <Botao
                    style={BUTTON_STYLE.RED_OUTLINE}
                    type={BUTTON_TYPE.BUTTON}
                    texto="Limpar"
                    onClick={() => this.resetForm()}
                  />
                </div>
                <div className="col-6 text-right">
                  <Botao
                    style={BUTTON_STYLE.BLUE}
                    type={BUTTON_TYPE.SUBMIT}
                    texto="Buscar"
                  />
                </div>
              </div>
            </form>
          </Collapse>
        )}
      </div>
    );
  }
}

FiltroEscolas = reduxForm({
  form: "FiltroEscolasForm",
  enableReinitialize: true,
})(FiltroEscolas);
const selector = formValueSelector("FiltroEscolasForm");
const mapStateToProps = (state) => {
  return {
    cod_eol_escola: selector(state, "cod_eol_escola"),
  };
};

export default connect(mapStateToProps)(FiltroEscolas);
