import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { IUser, IError, ISpinner } from "../types";

export interface ApplicationState {
  error: IError | null;
  spinner: ISpinner | null;
  auth: boolean;
  user: IUser | null;
}

export const initialState: ApplicationState = {
  error: null,
  spinner: null,
  auth: false,
  user: null,
};

export const AuthLoggedInAction = () => ({
  type: "AUTH/LOGGED_IN",
});

export const UserSetAction = (user: IUser) => ({
  type: "USER/SET",
  payload: user,
});

export const ErrorSetAction = (error: IError) => ({
  type: "ERROR/SET",
  payload: error,
});

export const ErrorClearAction = () => ({
  type: "ERROR/CLEAR",
});

export const SpinnerSetAction = (error: IError) => ({
  type: "SPINNER/SET",
  payload: error,
});

export const SpinnerClearAction = () => ({
  type: "SPINNER/CLEAR",
});

export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "AUTH/LOGGED_IN":
      return {
        ...state,
        auth: true,
      };
    case "USER/SET":
      return {
        ...state,
        user: action.payload,
      };
    case "ERROR/SET":
      return {
        ...state,
        error: action.payload,
      };
    case "ERROR/CLEAR":
      return {
        ...state,
        error: null,
      };
    case "SPINNER/SET":
      return {
        ...state,
        spinner: action.payload,
      };
    case "SPINNER/CLEAR":
      return {
        ...state,
        spinner: null,
      };
    default:
      return state;
  }
};

export const initializeStore = (
  preloadedState: ApplicationState = initialState
) => {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  );
};
