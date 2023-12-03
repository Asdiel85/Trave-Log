export const INITIAL_STATE = {
  loading: false,
  post: {},
  likePost: false,
  likesCount: 0,
};

export const postDetailsReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return {
        loading: true,
        post: {},
        likePost: false,
        likesCount: 0,
      };
      case "FETCH_SUCCES":
        return {
            loading: false,
            post: action.payload,
            likesCount: action.payload.likes.length,
            likePost: action.payload.likes.includes(action.userId),
          };
      case "LIKE_POST":
        return {
           ...state,
           likesCount: state.likesCount + 1,
           likePost: !state.likePost        
        };
        case "UNLIKE_POST":
        return {
           ...state,
           likesCount: state.likesCount - 1,
           likePost: !state.likePost        
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
