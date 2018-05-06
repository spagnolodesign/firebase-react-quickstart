import * as firebase from "firebase";

class Fire {

  constructor() {
    const config = {
      apiKey: "AIzaSyDHfDBF5_57Py_SxnsW5un4VUy8Om_wSyM",
      authDomain: "test-expo-3a1ef.firebaseapp.com",
      databaseURL: "https://test-expo-3a1ef.firebaseio.com",
      projectId: "test-expo-3a1ef",
      storageBucket: "test-expo-3a1ef.appspot.com",
      messagingSenderId: "321537572961"
    };

    firebase.initializeApp(config);
  }

  checkAuth(onSuccess) {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        onSuccess(user);
      }
    });
  }

  setAutoCaptcha() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible'
    });
  }

  sendVerificationCode(phoneNumber, onSuccess) {
    let appVerifier = window.recaptchaVerifier;

    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    .then(function (confirmationResult) {
      window.confirmationResult = confirmationResult;
      onSuccess();
    }).catch(function (error) {
      console.log(error)
    });
  }

  logInUserWithCode (code) {
    window.confirmationResult.confirm(code).then(function (result) {
      var user = result.user;
      console.log(user);
    }).catch(function (error) {
      console.log(error);
    });
  }

}


export default new Fire;
