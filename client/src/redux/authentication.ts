import { registerData } from "../types/authentication";
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
      return {
        ...state,
        isFetching: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        session: action.payload,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};
