import React from "react";
import { BrowserRouter as Router, Route, Link, Redirect, withRouter, Switch } from "react-router-dom";

import List from "./List";
import Form from "./Form";
import ItemList from "./ItemList";
import NavBar from "./NavBar";
import Login from "./Login";
import NotFound from "./NotFound";
import MeetUpListing from "./meetup/MeetUpListing";
import MeetUpView from './meetup/MeetUpView';

const Public = () => <h3>Public</h3>;

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      sessionStorage.auth ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const App = () => (
  <Router>
    <div>
      <NavBar />
      <div className="container">
        <Switch>
          <Route exact path='/' />
          <Route path="/public" component={Public} />
          <Route path="/login" component={Login} />
          <Route exact path="/meetups" component={MeetUpListing} />
          <Route path="/meetups/:id" component={MeetUpView} />
          <PrivateRoute path="/protected" component={ItemList} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  </Router>
);

export default App;
