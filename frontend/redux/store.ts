import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

export const initialState = {
  error: {
    message: "",
  },
  auth: false,
  user: null,
};

export const AuthLoggedInAction = () => ({
  type: "AUTH/LOGGED_IN"
})

export const UserSetAction = (user: any) => ({
  type: "USER/SET",
  payload: user
})

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "AUTH/LOGGED_IN":
        return {
          ...state,
          auth: true
        };
    case "USER/SET":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export const initializeStore = (preloadedState = initialState) => {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  );
};
