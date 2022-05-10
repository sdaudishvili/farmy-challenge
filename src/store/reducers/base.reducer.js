import { SET_BREADCRUMB } from "@/store/actions/base.action";

export const defaultState = {
  breadcrumb: []
};

const MainReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_BREADCRUMB:
      return { ...state, breadcrumb: action.value };

    default:
      return state;
  }
};

export default MainReducer;
