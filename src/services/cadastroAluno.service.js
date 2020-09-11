import { API_URL } from "../config";
import { AUTH_TOKEN } from "./constants";

export const getAluno = codigoEol => {
  const url = `${API_URL}/alunos/${codigoEol}/`;
  let status = 0;
  return fetch(url, {
    method: "GET",
    headers: AUTH_TOKEN
  })
    .then(res => {
      status = res.status;
      return res.json();
    })
    .then(data => {
      return { data: data, status: status };
    })
    .catch(error => {
      return error;
    });
};

export const getAlunoEOL = payload => {
  const url = `${API_URL}/dados-responsavel/busca_dados/`;
  let status = 0;
  return fetch(url, {
    method: "POST",
    headers: AUTH_TOKEN,
    body: JSON.stringify(payload)
  })
    .then(res => {
      status = res.status;
      return res.json();
    })
    .then(data => {
      return { data: data, status: status };
    })
    .catch(error => {
      return error;
    });
};

export const updateAluno = payload => {
  const url = `${API_URL}/alunos/`;
  let status = 0;
  return fetch(url, {
    method: "POST",
    headers: AUTH_TOKEN,
    body: JSON.stringify(payload)
  })
    .then(res => {
      status = res.status;
      return res.json();
    })
    .then(data => {
      return { data: data, status: status };
    })
    .catch(error => {
      return error;
    });
};
