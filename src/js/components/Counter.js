import React, { Component } from "react";
import { connect } from "react-redux";
import { addCounter } from "../actions/index";
import { logOutUser } from "../actions/session";

class Counter extends Component {

  constructor(){
    super();
  }

  handleCounterClick = () => {
    this.props.addCounter();
  }

  logOut = () => {
    console.log('hello');
    this.props.logOutUser();
  }

  render(){
    const { error } = this.props.counter
    return(
      <div>
        {error ?
          <p>Number is to high!!</p> :
          <div>
            <p>{this.props.counter.number}</p>
            <button onClick={() => this.handleCounterClick()}>Add</button>
            <button onClick={() => this.logOut()}>Log out</button>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
       counter: state.counter
    };
};

const mapDispatchToProps = dispatch => {
  return {
    addCounter: () => dispatch(addCounter()),
    logOutUser: () => dispatch(logOutUser())
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Counter);
