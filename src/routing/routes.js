import PainelGerencialPage from "../pages/PainelGerencialPage";
import ListaAlunosPage from "../pages/ListaAlunosPage";

export const routes = [
  {
    path: "/",
    component: PainelGerencialPage,
    exact: true
  },
  {
    path: "/lista-alunos",
    component: ListaAlunosPage,
    exact: true
  }
];
