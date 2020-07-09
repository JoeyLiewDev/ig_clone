import reduxThunk from "redux-thunk";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";

import { authentication, LOGOUT_SUCCESS } from "./authentication";
import { authenticationActionTypes } from "../types/authentication";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const resetEnhancer = (rootReducer: typeof reducer) => (
  state: any,
  action: any
) => {
  if (action.type !== LOGOUT_SUCCESS) return rootReducer(state, action);

  const newState = rootReducer(undefined, {} as authenticationActionTypes);
  return newState;
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [reduxThunk];

export const reducer = combineReducers({
  authentication,
});

export const store = createStore(
  resetEnhancer(reducer),
  composeEnhancers(applyMiddleware(...middlewares))
);
