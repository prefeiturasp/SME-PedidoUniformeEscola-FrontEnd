import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import formularioAlunoReducer from "./reducers/formularioAluno.reducer";

const rootReducer = combineReducers({
  form: formReducer,
  formAluno: formularioAlunoReducer
});

export default rootReducer;
