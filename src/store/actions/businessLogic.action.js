import { dataService } from "@/utils/dataService";

export const SET_MARGIN = "SET_MARGIN";
export const SET_SALAD_TYPES = "SET_SALAD_TYPES";

export const setMargin = (payload) => {
  return {
    type: SET_MARGIN,
    value: payload
  };
};

export const setSaladTypes = (payload) => {
  return {
    type: SET_SALAD_TYPES,
    value: payload
  };
};

export const loadBusinessLogic = () => async (dispatch) => {
  try {
    const { margin, saladTypes } = await dataService.get("businessLogic");
    dispatch(setMargin(margin));
    dispatch(setSaladTypes(saladTypes));
  } catch (error) {
    console.log(error);
  }
};
