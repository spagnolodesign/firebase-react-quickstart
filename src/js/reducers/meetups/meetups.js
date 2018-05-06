import {
  MEETUPS_HAS_ERRORED,
  MEETUPS_IS_LOADING,
  MEETUPS_FETCH_DATA_SUCCESS,
} from "../../constants/action-types";

export function meetupsHasErrored(state = false, action) {
    switch (action.type) {
        case MEETUPS_HAS_ERRORED:
            return action.hasErrored;
        default:
            return state;
    }
}

export function meetupsIsLoading(state = false, action) {
    switch (action.type) {
        case MEETUPS_IS_LOADING:
            return action.isLoading;
        default:
            return state;
    }
}

export function meetups(state = [], action) {
    switch (action.type) {
        case MEETUPS_FETCH_DATA_SUCCESS:
            return action.meetups;
        default:
            return state;
    }
}
