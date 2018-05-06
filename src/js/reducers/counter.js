import { ADD_TO_COUNTER } from "../constants/action-types";

const initialCounterState =  {
    number: 0,
    error: false
}

export function counter(state = initialCounterState, action) {
    switch (action.type) {
      case ADD_TO_COUNTER:
        return {
          number: ++state.number,
          error: (state.number >= 10) ? true : false
        }
      default:
        return state;
  }
}
