export const getColor = (status) => {
  switch (status) {
    case "Cadastro Divergente":
      return "orange";
    case "Cadastro com Pendência Resolvida":
    case "Cadastro com CPF inválido":
    case "Cadastro com e-mail inválido":
    case "Cadastro com mais de um e-mail cadastrado":
      return "yellow";
    case "Cadastro Desatualizado":
      return "red";
    default:
      return "green";
  }
};

export const getStatusOptions = (estudantes) => {
  let optionStatus = [{ nome: "Situação Cadastral", uuid: null }];
  estudantes.forEach((estudante) => {
    if (!optionStatus.find((option) => option.nome === estudante.status)) {
      optionStatus.push({
        nome: estudante.status,
        uuid: estudante.status,
      });
    }
  });
  return optionStatus;
};

export const formatarCPF = (cpf) => {
  cpf = cpf.replace(/\D/g, "");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return cpf;
};
