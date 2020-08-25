import { validarCPF } from "./utils";

export const caracteresEspeciais = (value) =>
  value && !/^[\w&.-]+$/i.test(value)
    ? `Não permite caracteres especiais`
    : undefined;

export const required = (value) =>
  value !== undefined ? undefined : "Campo obrigatório";

export const length = (size) => (value) =>
  value && value.length !== size
    ? `Deve ter exatamente ${size} caracteres`
    : undefined;

export const semTresCaracteresConsecutivos = (value) =>
  value && /(.)\1\1/.test(value)
    ? `Não pode conter três carateres iguais consecutivos`
    : undefined;

export const somenteLetrasEEspacos = (value) =>
  value && !/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/i.test(value)
    ? `Permitido somente letras e espaços`
    : undefined;

export const somenteLetrasEPontos = (value) =>
  value && !/^[A-Za-z._]+$/i.test(value)
    ? `Permitido somente letras, pontos e underline`
    : undefined;

export const somenteNumeros = (value) =>
  value && !/^[0-9]+$/i.test(value) ? `Permitido somente número` : undefined;

export const validaCPF = (value) =>
  value && !validarCPF(value) ? `CPF inválido` : undefined;

export const semPalavrasBloqueadas = (value) =>
  value &&
  [
    "porra",
    "anal",
    "arrombada",
    "bacanal",
    "bastarda",
    "bissexuais",
    "bissexual",
    "boquete",
    "boquetes",
    "buceta",
    "bucetas",
    "bucetinha",
    "bucetinhas",
    "bucetona",
    "bunda",
    "bundas",
    "bundudas",
    "cacete",
    "chupada",
    "chupadas",
    "chupando",
    "chupou",
    "clitoris",
    "cuzao",
    "cuzinho",
    "cuzinhos",
    "ejaculacao",
    "encoxada",
    "enrabadas",
    "eretil",
    "foda",
    "fodendo",
    "fodis",
    "fudendo",
    "gozada",
    "gozadas",
    "homossexual",
    "impotente",
    "incesto",
    "lesbian",
    "lesbias",
    "lesbica",
    "lesbicas",
    "lolitas",
    "lolitos",
    "masoquismo",
    "masturbacao",
    "masturbador",
    "masturbadores",
    "metendo",
    "ninfeta",
    "ninfetas",
    "ninfetinhas",
    "orgasmo",
    "orgasmos",
    "orgias",
    "pausudo",
    "pausudas",
    "peituda",
    "peitudas",
    "pelada",
    "pelado",
    "penianos",
    "penis",
    "piriguete",
    "piriguetes",
    "piroca",
    "pirocas",
    "pornografico",
    "pornos",
    "prostituta",
    "prostitutas",
    "punheta",
    "puta",
    "putaria",
    "putas",
    "putinha",
    "rabuda",
    "rabudas",
    "sacanas",
    "sadismo",
    "safada",
    "safadas",
    "safado",
    "safados",
    "sexboys",
    "sexgatas",
    "sexologista",
    "sexshoping",
    "sexx",
    "sexxy",
    "sexxyshop",
    "sexyclube",
    "sexys",
    "siririca",
    "sotravesti",
    "suruba",
    "surubas",
    "tarada",
    "tesuda",
    "tesudas",
    "transa",
    "transando",
    "transas",
    "transesex",
    "transex",
    "transexuais",
    "transexual",
    "transgenero",
    "transsexual",
    "travecas",
    "traveco",
    "travecos",
    "travesti",
    "travestis",
    "travetis",
    "trepada",
    "trepadas",
    "vagabunda",
    "vagina",
    "vaginal",
    "vaginas",
    "vaginismo",
    "viadinho",
    "viado",
    "vibrador",
    "vibradores",
    "vibro",
    "vibros",
    "xoxota",
    "xoxotas",
    "xupaxota",
    "zoofilia",
    "zoofilias",
    "zooofilia",
  ].some((palavra) => value.toLowerCase().split(" ").includes(palavra))
    ? `Não são permitidas palavras inapropriadas`
    : undefined;
