export const formatarNomesEstudantes = (responsaveis) => {
  let nomesEstudantes = [];
  responsaveis.forEach((responsavel) => {
    nomesEstudantes.push(responsavel.nome_aluno);
  });
  return nomesEstudantes;
};

export const formatarNomesResponsaveis = (responsaveis) => {
  let nomesResponsaveis = [];
  responsaveis.forEach((responsavel) => {
    nomesResponsaveis.push(responsavel.nome);
  });
  return nomesResponsaveis;
};
