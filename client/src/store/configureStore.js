import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/rootReducer";
import thunk from "redux-thunk";

export const configureStore = () => {
  const middlewares = [thunk];
  const conposedEnhancer = applyMiddleware(...middlewares);
  const store = createStore(rootReducer, conposedEnhancer);

  return store;
};
