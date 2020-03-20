import { validarCPF } from "../../helpers/utils";

export const validarForm = (values, state) => {
  let erro = false;
  if (values.registro_funcional && values.registro_funcional.length !== 7) {
    erro = "Campo registro funcional deve conter 7 números";
  } else if (!validarCPF(values.cpf)) {
    erro = "CPF inválido";
  } else if (values.password !== values.confirmar_password) {
    erro = "Campos senha e confirmar senha divergem";
  }
  return erro;
};
