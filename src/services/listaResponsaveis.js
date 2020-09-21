import { API_URL } from "../config";
import { AUTH_TOKEN } from "./constants";

export const getListaResponsaveis = (getParams) => {
  const url = `${API_URL}/responsaveis/${getParams}`;
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

export const getTodosResponsaveisInconsistentes = () => {
  const url = `${API_URL}/responsaveis/`;
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
