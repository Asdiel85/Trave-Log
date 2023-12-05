export const INITIAL_STATE = {
  loading: false,
  post: {},
  likePost: false,
  likesCount: 0,
  error: false
};

export const postDetailsReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        loading: true,
        post: {},
        likePost: false,
        likesCount: 0,
      };
      case "FETCH_SUCCES":
        return {
          ...state,
            loading: false,
            post: action?.payload,
            likesCount: action.payload?.likes.length,
            likePost: action.payload?.likes.includes(action.userId),
          };
          case "FETCH_FAILED":
            return {
              ...state,
              loading: false,
              error: true
              };
      case "LIKE_POST":
        return {
           ...state,
           likesCount: state.likesCount + 1,
           likePost: true        
        };
        case "UNLIKE_POST":
        return {
           ...state,
           likesCount: state.likesCount - 1,
           likePost: false        
        };
        case "DELETE_POST":
        return {
           ...state,
           post: {} 
        };
      default:
      return state;
  }
};
