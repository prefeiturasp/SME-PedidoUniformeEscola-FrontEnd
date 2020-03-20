export const formatarEstudantes = estudantes => {
  let nomesEstudantes = [];
  estudantes.forEach(estudante => {
    nomesEstudantes.push(estudante.nome);
  });
  return nomesEstudantes;
};

export const formatarNomesResponsaveis = estudantes => {
  let nomesResponsaveis = [];
  estudantes.forEach(estudante => {
    nomesResponsaveis.push(estudante.responsavel_nome);
  });
  return nomesResponsaveis;
};
