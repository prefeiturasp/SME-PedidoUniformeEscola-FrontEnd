import PainelGerencialPage from "../pages/PainelGerencialPage";
import ListaAlunosPage from "../pages/ListaAlunosPage";
import ResponsaveisComInconsistenciaPage from "../pages/ResponsaveisComInconsistenciaPage";

export const routes = [
  {
    path: "/",
    component: PainelGerencialPage,
    exact: true,
  },
  {
    path: "/lista-alunos",
    component: ListaAlunosPage,
    exact: true,
  },
  {
    path: "/inconsistencias-mp",
    component: ResponsaveisComInconsistenciaPage,
    exact: true,
  },
];
