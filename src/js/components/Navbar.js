import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logInUser, logOutUser} from '../actions/session';
import AuthButton from "./AuthButton";

class NavBar extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <Link to="/public" className="nav-link">Public Page</Link>
            </li>
            <li className="nav-item">
              <Link to="/protected" className="nav-link">Protected Page</Link>
            </li>
            <li className="nav-item">
              <Link to="/add-phone" className="nav-link">Add your Phone</Link>
            </li>
            <li className="nav-item">
              <Link to="/meetups" className="nav-link">Meetups</Link>
            </li>
          </ul>
          <span className="navbar-text">
              <AuthButton />
          </span>
        </div>
      </nav>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logInUser: credentials => dispatch(logInUser(credentials))
  };
};


export default connect(null, mapDispatchToProps)(NavBar);
