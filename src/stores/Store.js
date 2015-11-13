import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import app from "../reducers/App.js";

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore);

function configureStore(initialState) {
  return createStoreWithMiddleware(app, initialState)
}

var store = configureStore(app);

export default store;
