export const INITIAL_STATE = {
  loading: false,
  posts: [],
};

export const feedReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return {
        loading: true,
        posts: [],
      };
    case "FETCH_SUCCESS":
      return {
        loading: false,
        posts: action.payload,
      };
    case "FETCH_FAIL":
      return {
        loading: false,
        posts: [],
      };
      case "DELETE_POST":
      return {
        loading: false,
        posts: action.payload,
      };
    default:
      return state;
  }
};
