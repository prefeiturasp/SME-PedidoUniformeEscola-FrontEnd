export const required = value =>
  value !== undefined ? undefined : "Campo obrigatório";

export const length = size => value =>
  value && value.length !== size
    ? `Deve ter exatamente ${size} caracteres`
    : undefined;
