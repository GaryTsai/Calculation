import { combineReducers } from "redux"; // 1.
import changeMutualInfo from "./changeMutualInfo"; 

const rootReducer = combineReducers({
  allInfo: changeMutualInfo
});

export default rootReducer;
