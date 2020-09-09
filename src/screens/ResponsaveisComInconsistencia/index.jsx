import React, { useState, useEffect } from "react";
import HTTP_STATUS from "http-status-codes";
import { FiltroResponsaveis } from "./components/FiltroResponsaveis";
import { getTodosResponsaveisInconsistentes } from "../../services/listaResponsaveis";
import { toastError } from "../../components/Toast/dialogs";

export const ResponsaveisComInconsistencia = () => {
  const [codigoEol, setCodigoEol] = useState(null);
  const [openCollapse, setOpenCollapse] = useState(false);
  const [responsaveis, setResponsaveis] = useState(null);

  const alterCollapse = () => {
    setOpenCollapse(!openCollapse);
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
        <FiltroResponsaveis
          codigoEol={codigoEol}
          openCollapse={openCollapse}
          alterCollapse={alterCollapse}
          setResponsaveis={setResponsaveis}
          setCodigoEol={setCodigoEol}
        />
      </div>
    </div>
  );
};
