export const SET_BREADCRUMB = "SET_BREADCRUMB";

export const setBreadcrumb = (payload) => {
  return {
    type: SET_BREADCRUMB,
    value: payload
  };
};
