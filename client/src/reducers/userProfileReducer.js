export const INITIAL_STATE = {
  loading: true,
  user: {},
  showPosts: false,
};

export const userProfileReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_USER":
      return {
        ...state,
        loading: false,
        user: action.payload,
        showPosts: false
      };
    case "HANDLE_POSTS":
      return {
        ...state,
        loading: false,
        showPosts: !action.payload,
      };
      default: 
      return state
  }
};
