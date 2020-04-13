import { createTextMask } from "redux-form-input-masks";

export const MaskCPF = createTextMask({
  pattern: "999.999.999-99",
  allowEmpty: false,
  guide: false
});

export const validarCPF = cpf => {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf === "") return false;
  // Elimina CPFs invalidos conhecidos
  if (
    cpf.length !== 11 ||
    cpf === "00000000000" ||
    cpf === "11111111111" ||
    cpf === "22222222222" ||
    cpf === "33333333333" ||
    cpf === "44444444444" ||
    cpf === "55555555555" ||
    cpf === "66666666666" ||
    cpf === "77777777777" ||
    cpf === "88888888888" ||
    cpf === "99999999999"
  )
    return false;
  // Valida 1o digito
  let add = 0;
  let i, rev;
  for (i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
  rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(9))) return false;
  // Valida 2o digito
  add = 0;
  for (i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(10))) return false;
  return true;
};

export const getNome = () => {
  return localStorage.getItem("name");
};

export const getRF = () => {
  return localStorage.getItem("rf");
};

export const getInstituicao = () => {
  return localStorage.getItem("nome_escola");
};

export const getPerfil = () => {
  return localStorage.getItem("perfil");
};

export const perfilEscola = () => {
  return localStorage.getItem("perfil") === "perfil_escola";
};

export const perfilDRE = () => {
  return localStorage.getItem("perfil") === "perfil_dre";
};

export const perfilSME = () => {
  return localStorage.getItem("perfil") === "perfil_sme";
};


export const getKey = obj => {
  return Object.keys(obj)[0];
};

export const getError = obj => {
  let result = "Erro";
  if (!obj[getKey(obj)]) {
    return "Erro";
  } else if (
    (obj[getKey(obj)][0] !== undefined &&
      typeof obj[getKey(obj)][0] !== "string") ||
    typeof obj[getKey(obj)] !== "string"
  ) {
    result = getError(obj[getKey(obj)]);
  } else {
    if (typeof obj[getKey(obj)] === "string") return obj[getKey(obj)];
    else return obj[getKey(obj)][0];
  }
  return result;
};
