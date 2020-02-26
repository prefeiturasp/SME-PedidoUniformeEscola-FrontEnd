export const getColor = status => {
  switch (status) {
    case "Divergente":
      return "yellow";
    case "Desatualizado":
      return "red";
    default:
      return "green";
  }
};

export const getStatusOptions = estudantes => {
  let optionStatus = [{ nome: "Situação Cadastral", uuid: null }];
  estudantes.forEach(estudante => {
    if (!optionStatus.find(option => option.nome === estudante.status)) {
      optionStatus.push({
        nome: estudante.status,
        uuid: estudante.status
      });
    }
  });
  return optionStatus;
};
