import { API_URL } from "../config";
import { AUTH_TOKEN } from "./constants";

export const getListaAlunos = getParams => {
  const url = `${API_URL}/alunos/${getParams}`;
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

export const getTodosAlunos = () => {
  const url = `${API_URL}/alunos/`;
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
