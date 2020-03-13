export const validaFormulario = (values, aluno) => {
  let erro = false;
  if (
    values.responsavel.cd_ddd_celular_responsavel &&
    values.responsavel.cd_ddd_celular_responsavel.length !== 2
  ) {
    erro = "Campo DDD deve ter exatamente 2 dígitos";
  } else if (
    values.responsavel.nr_celular_responsavel &&
    values.responsavel.nr_celular_responsavel.length !== 9
  ) {
    erro = "Campo celular deve ter exatamente 9 dígitos";
  } else if (aluno.data_nascimento < values.responsavel.data_nascimento) {
    erro =
      "Data de nascimento do responsável não pode ser mais recente que do aluno";
  }
  return erro;
};
