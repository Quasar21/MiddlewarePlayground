import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
//import store from "./stores/Store.js";
import App from "./components/App.jsx";

// Redux utility functions
import { compose, createStore, applyMiddleware } from "redux";
// Redux DevTools store enhancers
import { devTools, persistState } from "redux-devtools";
// React components for Redux DevTools
import { DevTools, DebugPanel, LogMonitor } from "redux-devtools/lib/react";


function logger({ getState }) {
  return (next) => (action) => {
    console.log("will dispatch", action)

    // Call the next dispatch method in the middleware chain.
    let returnValue = next(action)

    console.log("state after dispatch", getState())

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue
  }
}

function mid1({ getState, dispatch }) {
  return (next) => (action) => {

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    if(action.type === "2") {
      dispatch({type:"1", content: "dostuff"});
      var result = next(action);
      console.log("res");
      console.log(result);
      return result;
    }
    return next(action);
  }
}

const app = function(state, action) {
  console.log("Inside app reducer");
  console.log(action.type);
  switch(action.type) {
    case "1":
      return Object.assign({}, state, {
        content: action.content
      });
    case "2":
      return Object.assign({}, state, {
        content: action.content
      });
    case "3":
      return Object.assign({}, state, {
        content: action.content
      });
    default:
    return state;
  }
}

const finalCreateStore = compose(
  applyMiddleware(
    logger,
    mid1
  ),
  // Provides support for DevTools:
  devTools(),
// Lets you write ?debug_session=<name> in address bar to persist debug sessions
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

const store = finalCreateStore(app);

ReactDOM.render(
  <div>
  <DebugPanel top right bottom>
  <DevTools store={store} monitor={LogMonitor} />
  </DebugPanel>
  <Provider store={store}>
    <App/>
  </Provider>
  </div>,
  document.getElementById("app")
);
