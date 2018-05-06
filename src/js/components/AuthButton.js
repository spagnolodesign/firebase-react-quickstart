import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logInUser, logOutUser} from '../actions/session';


class AuthButton extends Component {

  handleLogOut = () => {
    this.props.logOutUser();
    this.props.history.push('/')
  }

  render(){
    const { history } = this.props;
    const { authenticated, authData } = this.props.session;

    return(
      authenticated ? (
        <p>
          Welcome! { authData.email } <button onClick={this.handleLogOut}>Sign out</button>
        </p>
      ) : (
        <p>You are not logged in.</p>
      )
    )
  }
}

const mapStateToProps = state => {
  return { session: state.session };
};

const mapDispatchToProps = dispatch => {
  return {
    logOutUser: credentials => dispatch(logOutUser())
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AuthButton)
);
// export default withRouter(AuthButton, { history });
