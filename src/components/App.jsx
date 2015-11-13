/*
        Главный компонент приложения
 */
import React from "react";
import { connect } from "react-redux";

const App = React.createClass({
  render () {
    let dispatch = this.props.dispatch;
    dispatch({type:"2", content: "Wow"});

    return <h1>Hello middleware</h1>
  }
});

function select() {
  return {};
}

export default connect(select)(App);
