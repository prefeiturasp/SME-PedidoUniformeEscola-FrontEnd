export const formatarPayload = (values, state) => {
  values.responsaveis = [];
  values.responsavel.codigo_eol_aluno =
    state.aluno.codigo_eol || state.aluno.cd_aluno.toString();
  values.responsavel.nao_possui_email = state.nao_possui_email;
  values.responsavel.nao_possui_celular = state.nao_possui_celular;
  values.responsaveis.push(values.responsavel);
  values.atualizado_na_escola = true;
  values.codigo_eol = state.aluno.codigo_eol || state.aluno.cd_aluno.toString();
  values.data_nascimento =
    state.aluno.data_nascimento || state.aluno.dt_nascimento_aluno.slice(0, 10);
  return values;
};
