import { registerData, loginData } from "../types/authentication";
import {
  authenticationActionTypes,
  AppThunk,
  authenticationState,
} from "../types/redux";
import { User } from "../types/authentication";

// Action Types
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

// Action Creators
const registerRequest = (): authenticationActionTypes => ({
  type: REGISTER_REQUEST,
});

const registerSuccess = (payload: User): authenticationActionTypes => ({
  type: REGISTER_SUCCESS,
  payload,
});

const registerFailure = (error?: any): authenticationActionTypes => ({
  type: REGISTER_FAILURE,
  error,
});

const loginRequest = (): authenticationActionTypes => ({
  type: LOGIN_REQUEST,
});

const loginSuccess = (payload: User): authenticationActionTypes => ({
  type: LOGIN_SUCCESS,
  payload,
});

const loginFailure = (error?: any): authenticationActionTypes => ({
  type: LOGIN_FAILURE,
  error,
});

// Thunk Actions
export const registerAction = (data: registerData): AppThunk => async (
  dispatch
) => {
  dispatch(registerRequest());
  try {
    const response = await fetch("/api/authentication/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const {
        user,
        accessToken,
      }: { user: User; accessToken: string } = await response.json();
      dispatch(registerSuccess(user));
      localStorage.setItem("act", accessToken);
    } else {
      dispatch(registerFailure());
    }
  } catch (error) {
    dispatch(registerFailure(error));
  }
};

export const loginAction = (data: loginData): AppThunk => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await fetch("/api/authentication/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const {
        user,
        accessToken,
      }: { user: User; accessToken: string } = await response.json();
      dispatch(loginSuccess(user));
      localStorage.setItem("act", accessToken);
    } else {
      dispatch(loginFailure());
    }
  } catch (error) {
    dispatch(loginFailure(error));
  }
};

// State of Reducer
const initialState: authenticationState = {
  session: null,
  isFetching: false,
  isAuthenticated: false,
};
// Reducer
export const authentication = (
  state = initialState,
  action: authenticationActionTypes
) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        session: action.payload,
      };
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};
