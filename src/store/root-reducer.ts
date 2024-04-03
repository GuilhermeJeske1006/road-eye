import { combineReducers } from "redux";
import AdressReducer from "./Adress/reducers";
import UserReducer from "./User/reducers";
import SchoolReducer from "./school/reducers";

const rootReducer = combineReducers({
    AdressReducer,
    UserReducer,
    SchoolReducer
})

export default rootReducer;