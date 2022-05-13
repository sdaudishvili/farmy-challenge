import { dataService } from "@/utils/dataService";

export const SET_SALADS = "SET_SALADS";

export const setSalads = (payload) => {
  return {
    type: SET_SALADS,
    value: payload
  };
};

export const loadSalads = () => async (dispatch) => {
  try {
    const res = await dataService.get("salads");
    dispatch(setSalads(res));
  } catch (error) {
    console.log(error);
  }
};
