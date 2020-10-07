import { perfilEscola } from "../../helpers/utils";

export const formatarDados = (dados) => {
  let dadosFormatados = [];
  dadosFormatados.push({
    dado: "Cadastros validados online",
    valor: dados.cadastros_validados.alunos_online,
  });
  dadosFormatados.push({
    dado: "Cadastros validados na escola",
    valor: dados.cadastros_validados.alunos_escola,
  });
  dadosFormatados.push({
    dado: "Cadastros divergentes",
    valor: dados.cadastros_divergentes,
  });
  dadosFormatados.push({
    dado: "Cadastros com pendências resolvidas",
    valor: dados.cadastros_com_pendencias_resolvidas,
  });
  dadosFormatados.push({
    dado: "Cadastros com e-mail inválido",
    valor: dados.email_invalido,
  });
  dadosFormatados.push({
    dado: "Cadastros com CPF inválido",
    valor: dados.cpf_invalido,
  });
  dadosFormatados.push({
    dado: "Cadastros com mais de um e-mail cadastrado",
    valor: dados.multiplos_emails,
  });
  dadosFormatados.push({
    dado: "Inconsistências resolvidas",
    valor: dados.inconsistencias_resolvidas,
  });
  dadosFormatados.push({
    dado: "Créditos concedidos",
    valor: dados.creditos_concedidos,
  });
  perfilEscola() &&
    dadosFormatados.push({
      dado: "Cadastros desatualizados",
      valor: dados.cadastros_desatualizados,
    });
  return dadosFormatados;
};
