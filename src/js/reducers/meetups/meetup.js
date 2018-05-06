import {
  MEETUP_HAS_ERRORED,
  MEETUP_IS_LOADING,
  MEETUP_FETCH_DATA_SUCCESS,
} from "../../constants/action-types";

export function meetupHasErrored(state = false, action) {
    switch (action.type) {
        case MEETUP_HAS_ERRORED:
            return action.hasErrored;
        default:
            return state;
    }
}

export function meetupIsLoading(state = false, action) {
    switch (action.type) {
        case MEETUP_IS_LOADING:
            return action.isLoading;
        default:
            return state;
    }
}

export function meetup(state = [], action) {
    switch (action.type) {
        case MEETUP_FETCH_DATA_SUCCESS:
            return action.meetup;
        default:
            return state;
    }
}
