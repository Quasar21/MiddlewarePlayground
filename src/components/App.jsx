/*
        Главный компонент приложения
 */
import React from "react";
import { connect } from "react-redux";

const App = React.createClass({
  render () {
    let dispatch = this.props.dispatch;
    dispatch({type:"3", content: "test"});

    return <h1>Hello middleware</h1>
  }
});

function select() {
  return {};
}

export default connect(select)(App);
