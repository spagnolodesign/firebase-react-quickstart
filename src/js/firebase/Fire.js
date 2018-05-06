import * as firebase from "firebase";

console.log(process.env.API_KEY);

class Fire {

  constructor() {
    const config = {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      databaseURL: process.env.DATABASE_URL,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID
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
