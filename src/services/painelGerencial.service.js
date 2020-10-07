import { API_URL } from "../config";
import { AUTH_TOKEN } from "./constants";

export const getDadosPainelGerencial = (cod_eol_escola = null) => {
  let url = `${API_URL}/alunos/dashboard/`;
  if (cod_eol_escola) {
    url += `?cod_eol_escola=${cod_eol_escola}`;
  }
  let status = 0;
  return fetch(url, {
    method: "GET",
    headers: AUTH_TOKEN,
  })
    .then((res) => {
      status = res.status;
      return res.json();
    })
    .then((data) => {
      return { data: data, status: status };
    })
    .catch((error) => {
      return error;
    });
};
