export const formatarPayload = (values, aluno) => {
  values.responsaveis = [];
  values.responsavel.codigo_eol_aluno = aluno.codigo_eol || aluno.cd_aluno.toString();
  values.responsaveis.push(values.responsavel);
  values.atualizado_na_escola = true;
  values.codigo_eol = aluno.codigo_eol || aluno.cd_aluno.toString();
  values.data_nascimento =
    aluno.data_nascimento || aluno.dt_nascimento_aluno.slice(0, 10);
  return values;
};
