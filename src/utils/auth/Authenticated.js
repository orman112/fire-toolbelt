import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Consumer } from "./AppProvider";

class Authenticated extends Component {
  render() {
    return (
      <Consumer>
        {({ state }) =>
          state.currentUser ? this.props.children : <Redirect to="/" />
        }
      </Consumer>
    );
  }
}

export default Authenticated;
