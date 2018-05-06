import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logInUser, logOutUser} from '../actions/session';
import PhoneVerification from "./PhoneVerification";

class Login extends Component {

  state = {
    redirectToReferrer: false
  }

  handleSubmit = (event) => {
    const credentials = {
     email: this.refs.email.value,
     password: this.refs.password.value
    };
    this.props.logInUser(credentials);
    event.preventDefault();
  }


  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { authenticated, error } = this.props.session;
    const { redirectToReferrer } = this.state;

    if (authenticated) {
      return <Redirect to={from} />;
    }

    return (
      <div className="row justify-content-center">
        <div className="col-12 col-md-5">
          <div className="form-group mt-5 card">
            <div className="card-body">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label>Email address</label>
                  <input ref="email" type="text" placeholder="email" required={true} className="form-control" />
                  <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input ref="password" type="password" placeholder="password" required={true} className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Sign in</button>
              </form>
              <p>{ error }</p>
              <p>Sign In by Phone</p>
              <PhoneVerification />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { session: state.session };
};

const mapDispatchToProps = dispatch => {
  return {
    logInUser: credentials => dispatch(logInUser(credentials))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);
