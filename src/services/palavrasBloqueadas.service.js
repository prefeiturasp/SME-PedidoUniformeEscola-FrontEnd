import { API_URL } from "../config";
import { AUTH_TOKEN } from "./constants";

export const getPalavrasBloqueadas = () => {
  const url = `${API_URL}/palavras-bloqueadas/`;
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
