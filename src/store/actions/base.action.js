export const SET_ALERT = "SET_ALERT";

export const setAlert = (payload) => {
  return {
    type: SET_ALERT,
    value: payload
  };
};
