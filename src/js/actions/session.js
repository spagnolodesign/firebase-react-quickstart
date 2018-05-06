import * as firebase from "firebase";
import { LOG_IN_SUCCESS, LOG_OUT_USER, AUTH_ERROR } from "../constants/action-types";

export function loginSuccess(data) {
  return { type: LOG_IN_SUCCESS, authdata: data }
}

export function logOutSuccess() {
  return { type: LOG_OUT_USER }
}

export function authError(errorMessage) {
  return { type: AUTH_ERROR, error: errorMessage  }
}

export function logInUser(credentials) {
  return function(dispatch) {
    const {email, password} = credentials
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(data){
      dispatch(loginSuccess(data));
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      dispatch(authError(errorMessage));
    });
  };
}

export function logOutUser(){
  return function(dispatch){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      dispatch(logOutSuccess());
    }).catch(function(error) {
      // An error happened.
      var errorCode = error.code;
      var errorMessage = error.message;
      dispatch(authError(errorMessage));
    });
  }
}
