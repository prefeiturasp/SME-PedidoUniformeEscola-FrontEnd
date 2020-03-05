export const formatarDados = dados => {
  let dadosFormatados = [];
  dadosFormatados.push({
    dado: "Cadastros validados online",
    valor: dados["Cadastros Validados"]["alunos online"]
  });
  dadosFormatados.push({
    dado: "Cadastros validados na escola",
    valor: dados["Cadastros Validados"]["alunos escola"]
  });
  dadosFormatados.push({
    dado: "Cadastros desatualizados",
    valor: dados["Cadastros desatualizados"]
  });
  dadosFormatados.push({
    dado: "Cadastros divergentes",
    valor: dados["Cadastros divergentes"]
  });
  dadosFormatados.push({
    dado: "Cadastros com pendências resolvidas",
    valor: dados["Cadastros com pendências resolvidas"]
  });
  return dadosFormatados;
};
