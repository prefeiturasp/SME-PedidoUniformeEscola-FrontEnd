import DashboardPage from "../pages/DashboardPage";
import ListaAlunosPage from "../pages/ListaAlunosPage";
import CadastroAlunoPage from "../pages/CadastroAlunoPage";

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
  },
  {
    path: "/cadastro-aluno",
    component: CadastroAlunoPage,
    exact: true
  }
];
