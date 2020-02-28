const LOAD_ALUNO = "LOAD_ALUNO";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case LOAD_ALUNO:
      if (action.data !== null) {
        action.data.responsavel = action.data.responsaveis[0];
        action.data.check = false;
      }
      return {
        data: {
          ...action.data
        }
      };
    default:
      return state;
  }
}

export const loadAluno = data => dispatch =>
  dispatch({ type: LOAD_ALUNO, data });
