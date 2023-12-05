export const INITIAL_STATE = {
  loading: true,
  userId: null,
  users: [],
  showModal: false,
};

export const usersTableReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_USERS":
      return {
        ...state,
        loading: false,
        userId: null,
        users: action.payload,
        showModal: false,
      };
    case "SET_USERID":
      return {
        ...state,
        userId: action.payload,
      };
    case "SHOW_CONFIRM_MODAL":
      return {
        ...state,
        showModal: true,
      };
      case "HIDE_CONFIRM_MODAL":
      return {
        ...state,
        showModal: false,
      };
      default: 
      return state
  }
};
