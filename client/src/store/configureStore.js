import { applyMiddleware } from 'redux';
// import { legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';
import { createStore } from 'redux';

export const configureStore = () => {
  const middlewares = [thunk];
  let conposedEnhancer = composeWithDevTools(applyMiddleware(...middlewares));
  if (process.env.NODE_ENV === 'production') {
    conposedEnhancer = applyMiddleware(...middlewares);
  }
  const store = createStore(rootReducer, conposedEnhancer);

  return store;
};
