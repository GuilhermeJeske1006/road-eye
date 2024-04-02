import { combineReducers } from "redux";
import AdressReducer from "./Adress/reducers";
import userReducer from "./User/reducers";
import SchoolReducer from "./school/reducers";

const rootReducer = combineReducers({
    AdressReducer,
    userReducer,
    SchoolReducer
})

export default rootReducer;