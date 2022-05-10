import { dataService } from "@/utils/dataService";

export const SET_PRODUCTS = "SET_PRODUCTS";

export const setProducts = (payload) => {
  return {
    type: SET_PRODUCTS,
    value: payload
  };
};

export const loadProducts = () => async (dispatch) => {
  try {
    const data = await dataService.get("products");
    dispatch(setProducts(data));
  } catch (error) {
    console.log(error);
  }
};
