import { registerData, loginData } from "../types/authentication";
import {
  User,
  authenticationActionTypes,
  authenticationState,
} from "../types/authentication";
import { AppThunk } from "../types";

// Action Types
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";
export const LOAD_SESSION_REQUEST = "LOAD_SESSION_REQUEST";
export const LOAD_SESSION_SUCCESS = "LOAD_SESSION_SUCCESS";
export const LOAD_SESSION_FAILURE = "LOAD_SESSION_FAILURE";

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

const logoutRequest = (): authenticationActionTypes => ({
  type: LOGOUT_REQUEST,
});

const logoutSuccess = (): authenticationActionTypes => ({
  type: LOGOUT_SUCCESS,
});

const logoutFailure = (error?: any): authenticationActionTypes => ({
  type: LOGOUT_FAILURE,
  error,
});

const loadSessionRequest = () => ({
  type: LOAD_SESSION_REQUEST,
});

const loadSessionSuccess = (session: User): authenticationActionTypes => ({
  type: LOAD_SESSION_SUCCESS,
  payload: session,
});

const loadSessionFailure = (error?: any): authenticationActionTypes => ({
  type: LOAD_SESSION_FAILURE,
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

export const loadSession = (
  setLoading: (loading: boolean) => void
): AppThunk => async (dispatch) => {
  dispatch(loadSessionRequest());
  try {
    const accessToken = localStorage.getItem("act");
    if (!accessToken) {
      dispatch(loadSessionFailure("Access token is required"));
    }
    const response = await fetch("/api/authentication/load_session", {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.ok) {
      const { user } = await response.json();
      dispatch(loadSessionSuccess(user));
    } else {
      dispatch(loadSessionFailure());
    }
    setLoading(false);
  } catch (error) {
    dispatch(loadSessionFailure(error));
  }
};

export const logout = (): AppThunk => async (dispatch) => {
  dispatch(logoutRequest());
  try {
    const response = await fetch("/api/authentication/logout", {
      credentials: "include",
    });
    if (response.ok) {
      dispatch(logoutSuccess());
      localStorage.removeItem("act");
    }
  } catch (error) {
    dispatch(logoutFailure(error));
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
    case LOAD_SESSION_REQUEST:
    case LOGOUT_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case LOAD_SESSION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        session: action.payload,
      };
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case LOAD_SESSION_FAILURE:
    case LOGOUT_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};
