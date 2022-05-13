import { SET_SALADS } from "@/store/actions/salads.action";

export const defaultState = {
  salads: []
};

const MainReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_SALADS:
      return { ...state, salads: action.value };

    default:
      return state;
  }
};

export default MainReducer;
