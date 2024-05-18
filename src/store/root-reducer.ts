import { combineReducers } from "redux";
import AdressReducer from "./Adress/reducers";
import UserReducer from "./User/reducers";
import SchoolReducer from "./school/reducers";
import RouteReducer from "./Route/reducers";

const rootReducer = combineReducers({
    AdressReducer,
    UserReducer,
    SchoolReducer,
    RouteReducer
})

export default rootReducer;