import DashboardPage from "../pages/DashboardPage";
import ListaAlunosPage from "../pages/ListaAlunosPage";

export const routes = [
  {
    path: "/",
    component: DashboardPage,
    exact: true
  },
  {
    path: "/lista-alunos",
    component: ListaAlunosPage,
    exact: true
  }
];
