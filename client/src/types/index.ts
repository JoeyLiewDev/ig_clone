import { ThunkAction } from "redux-thunk";
import { Action } from "redux";

import { reducer } from "../redux";

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  typeof reducer,
  unknown,
  Action<string>
>;
