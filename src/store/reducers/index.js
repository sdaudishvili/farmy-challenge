import { combineReducers } from "redux";
import productsReducer from "./products.reducer";
import businessLogicReducer from "./businessLogic.reducer";

const rootReducer = combineReducers({
  products: productsReducer,
  businessLogic: businessLogicReducer
});

export default rootReducer;
