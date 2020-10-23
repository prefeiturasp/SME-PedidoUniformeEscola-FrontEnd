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

export const STATUS_INCONSISTENCIAS = [
  {
    nome: "Selecione",
    uuid: ""
  },
  {
    nome: "CPF inválido",
    uuid: "Cadastro com CPF inválido",
  },
  {
    nome: "E-mail inválido",
    uuid: "Cadastro com e-mail inválido",
  },
  {
    nome: "Múltiplos e-mails",
    uuid: "Cadastro com mais de um e-mail cadastrado",
  },
];
