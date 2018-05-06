import * as firebase from "firebase";
import store from "../../store/index";
import { MEETUP_HAS_ERRORED, MEETUP_FETCH_DATA_SUCCESS, MEETUP_IS_LOADING, MESSAGES_FETCH_DATA_SUCCESS } from "../../constants/action-types";

require("firebase/firestore");


const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);



export function meetupHasErrored(bool) {
    return {
        type: MEETUP_HAS_ERRORED,
        hasErrored: bool
    };
}

export function meetupFetchDataSuccess(meetup) {
    return {
        type: MEETUP_FETCH_DATA_SUCCESS,
        meetup
    };
}

export function messagesFetchDataSuccess(messages) {
    return {
        type: MESSAGES_FETCH_DATA_SUCCESS,
        messages
    };
}

export function meetupIsLoading(bool) {
    return {
        type: MEETUP_IS_LOADING,
        isLoading: bool
    };
}

export function meetupFetchData(id) {
    return (dispatch) => {
        const meetup = db.collection("meetups").doc(id);
        dispatch(meetupIsLoading(true));
        meetup.get().then(function(doc) {
          if (doc.exists) {
            dispatch(meetupIsLoading(false));
            const data = doc.data();
            return data;
          } else {
            console.log("No such document!");
          }
        })
        .then((data) => dispatch(meetupFetchDataSuccess(data)))
        .catch((error) => dispatch(meetupHasErrored(true)));
    };
}

export function sendMessageToMeetup(channel, message) {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    return (dispatch) => {
      const collection = db.collection('meetups').doc(channel).collection('messages');
      collection.add({...message, timestamp})
      .then(function(docRef) {
        console.log("Write success", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
    }
}


export function meetupFetchMessagesData(channel) {
  return (dispatch) => {
    const messagesRef = db.collection("meetups").doc(channel).collection("messages").orderBy("timestamp", "asc");
    messagesRef.onSnapshot(function(snapshot) {
      let messages = [];

      snapshot.forEach(function(doc) {
          if(doc.data().timestamp){
            messages.push(doc.data());
          }
      });
      dispatch(messagesFetchDataSuccess(messages));
    })
  }
}
