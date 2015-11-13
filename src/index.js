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

function mid1({ dispatch }) {
  return (next) => (action) => {

    if(action.type === "3") {
      dispatch({type:"2", content: "test2"});
    }
    return next(action);
  }
}

function mid2({ dispatch }) {
  return (next) => (action) => {

    if(action.type === "2") {
      dispatch({type:"1", content: "test1"});
    }
    return next(action);
  }
}


const app = function(state = {content: "test0"}, action) {
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
    mid1,
    mid2
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
