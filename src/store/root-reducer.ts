import { combineReducers } from "redux";
import AdressReducer from "./Adress/reducers";
import userReducer from "./User/reducers";

const rootReducer = combineReducers({
    AdressReducer,
    userReducer,
})

export default rootReducer;