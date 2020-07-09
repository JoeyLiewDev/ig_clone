import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOAD_SESSION_REQUEST,
  LOAD_SESSION_SUCCESS,
  LOAD_SESSION_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from "../redux/authentication";

// React
export interface AuthState {
  authentication: {
    isAuthenticated: boolean;
  };
}

// Redux
interface registerRequestAction {
  type: typeof REGISTER_REQUEST;
}

interface registerSuccessAction {
  type: typeof REGISTER_SUCCESS;
  payload: User;
}

interface registerFailureAction {
  type: typeof REGISTER_FAILURE;
  error: any;
}

interface loginRequestAction {
  type: typeof LOGIN_REQUEST;
}

interface loginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: User;
}

interface loginFailureAction {
  type: typeof LOGIN_FAILURE;
  error: any;
}

interface logoutRequestAction {
  type: typeof LOGOUT_REQUEST;
}

interface logoutSuccessAction {
  type: typeof LOGOUT_SUCCESS;
}

interface logoutFailureAction {
  type: typeof LOGOUT_FAILURE;
  error: any;
}

interface loadUserRequestAction {
  type: typeof LOAD_SESSION_REQUEST;
}

interface loadUserSuccessAction {
  type: typeof LOAD_SESSION_SUCCESS;
  payload: User;
}

interface loadUserFailureAction {
  type: typeof LOAD_SESSION_FAILURE;
  error: any;
}

export interface authenticationState {
  session: null | User;
  isFetching: boolean;
  isAuthenticated: boolean;
}

export type authenticationActionTypes =
  | registerRequestAction
  | registerSuccessAction
  | registerFailureAction
  | loginRequestAction
  | loginSuccessAction
  | loginFailureAction
  | loadUserRequestAction
  | loadUserSuccessAction
  | loadUserFailureAction
  | logoutRequestAction
  | logoutSuccessAction
  | logoutFailureAction;

export interface User {
  id: number;
  name: string;
  email: string;
  token_version: number;
  created_at: string;
  updated_at: string;
}

export type registerData = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

export type loginData = {
  email: string;
  password: string;
};
