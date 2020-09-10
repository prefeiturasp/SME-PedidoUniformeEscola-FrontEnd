import React, { useState, useEffect } from "react";
import HTTP_STATUS from "http-status-codes";
import { FiltroResponsaveis } from "./components/FiltroResponsaveis";
import { getTodosResponsaveisInconsistentes } from "../../services/listaResponsaveis";
import { toastError } from "../../components/Toast/dialogs";
import { TabelaResultados } from "./components/TabelaResultado";
import { FormularioAluno } from "../FormularioAluno";

export const ResponsaveisComInconsistencia = () => {
  const [codigo_eol, setCodigoEol] = useState(null);
  const [openCollapse, setOpenCollapse] = useState(false);
  const [responsaveis, setResponsaveis] = useState(null);

  const alterCollapse = () => {
    setOpenCollapse(!openCollapse);
  };

  const closeCollapse = () => {
    setOpenCollapse(false);
  };

  useEffect(() => {
    getTodosResponsaveisInconsistentes().then((response) => {
      if (response.status === HTTP_STATUS.OK) {
        setResponsaveis(response.data);
      }
    });
  }, []);

  return (
    <div className="card">
      <div className="card-body">
        {responsaveis && (
          <FiltroResponsaveis
            codigo_eol={codigo_eol}
            openCollapse={openCollapse}
            alterCollapse={alterCollapse}
            setResponsaveis={setResponsaveis}
            setCodigoEol={setCodigoEol}
            responsaveis={responsaveis}
          />
        )}
        {responsaveis && responsaveis.length > 0 && !codigo_eol && (
          <div className="pt-4">
            <TabelaResultados
              setCodigoEol={setCodigoEol}
              alterCollapse={alterCollapse}
              closeCollapse={closeCollapse}
              responsaveis={responsaveis}
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
};
