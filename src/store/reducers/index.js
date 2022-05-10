import { combineReducers } from "redux";
import baseReducer from "./base.reducer";
import productsReducer from "./products.reducer";

const rootReducer = combineReducers({
  base: baseReducer,
  products: productsReducer
});

export default rootReducer;
