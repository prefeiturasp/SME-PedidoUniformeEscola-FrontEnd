export const formatarPayload = (values, aluno) => {
  values.responsaveis = [];
  values.responsaveis.push(values.responsavel);
  values.atualizado_na_escola = true;
  values.codigo_eol = aluno.codigo_eol;
  values.data_nascimento = aluno.data_nascimento;
  return values;
};
