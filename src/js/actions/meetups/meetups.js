import * as firebase from "firebase";
import store from "../../store/index";
import { MEETUPS_HAS_ERRORED, MEETUPS_FETCH_DATA_SUCCESS, MEETUPS_IS_LOADING } from "../../constants/action-types";

require("firebase/firestore");

console.log(store.getState())

const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);


export function meetupsHasErrored(bool) {
    return {
        type: MEETUPS_HAS_ERRORED,
        hasErrored: bool
    };
}

export function meetupsFetchDataSuccess(meetups) {
    return {
        type: MEETUPS_FETCH_DATA_SUCCESS,
        meetups
    };
}

export function meetupsIsLoading(bool) {
    return {
        type: MEETUPS_IS_LOADING,
        isLoading: bool
    };
}

export function meetupsFetchData() {
    return (dispatch) => {
        dispatch(meetupsIsLoading(true));
        db.collection("meetups")
        .orderBy("timestamp", "desc")
        .get()
        .then(function(querySnapshot) {
            const meetups = [];
            querySnapshot.forEach(function(doc) {
                const data = {
                    id: doc.id,
                    ...doc.data()
                }
                meetups.push(data);
            });
            dispatch(meetupsIsLoading(false));
            return meetups
        })
        .then((meetups) => dispatch(meetupsFetchDataSuccess(meetups)))
        .catch((error) => dispatch(meetupsHasErrored(true)));
    };
}


export function addMeetUp(meetup) {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    return (dispatch) => {
        dispatch(meetupsIsLoading(true));
        db.collection("meetups").add({...meetup, timestamp})
        .then(() => dispatch(meetupsIsLoading(false)) )
        .then(() => dispatch(meetupsFetchData()))
        .catch((error) => dispatch(meetupsHasErrored(true)));
    };
}
