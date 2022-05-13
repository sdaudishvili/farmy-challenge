import { combineReducers } from "redux";
import productsReducer from "./products.reducer";
import businessLogicReducer from "./businessLogic.reducer";
import saladsReducer from "./salads.reducer";
import baseReducer from "./base.reducer";

const rootReducer = combineReducers({
  salads: saladsReducer,
  base: baseReducer,
  products: productsReducer,
  businessLogic: businessLogicReducer
});

export default rootReducer;
