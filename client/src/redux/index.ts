import reduxThunk from "redux-thunk";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";

import { authentication } from "./authentication";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [reduxThunk];

export const reducer = combineReducers({
  authentication,
});

export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middlewares))
);
