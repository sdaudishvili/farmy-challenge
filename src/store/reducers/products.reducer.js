import { SET_PRODUCTS } from "@/store/actions/products.action";

export const defaultState = {
  products: []
};

const MainReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...state, products: action.value };

    default:
      return state;
  }
};

export default MainReducer;
