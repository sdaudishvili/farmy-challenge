import { SET_MARGIN, SET_SALAD_TYPES } from "@/store/actions/businessLogic.action";

export const defaultState = {
  margin: 0,
  saladTypes: {}
};

const MainReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_MARGIN:
      return { ...state, margin: action.value };
    case SET_SALAD_TYPES:
      return { ...state, saladTypes: action.value };

    default:
      return state;
  }
};

export default MainReducer;
