import { ThunkAction } from "redux-thunk";
import { Action } from "redux";

import { reducer } from "../redux";
import { User } from "./authentication";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "../redux/authentication";

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

export interface authenticationState {
  session: null | User;
  isFetching: boolean;
  isAuthenticated: boolean;
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  typeof reducer,
  unknown,
  Action<string>
>;

export type authenticationActionTypes =
  | registerRequestAction
  | registerSuccessAction
  | registerFailureAction;
