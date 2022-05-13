import { SET_ALERT } from "@/store/actions/base.action";

export const defaultState = {
  alert: { msg: "", type: "" }
};

const MainReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_ALERT:
      return { ...state, alert: action.value };

    default:
      return state;
  }
};

export default MainReducer;
