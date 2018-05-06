import { MESSAGES_FETCH_DATA_SUCCESS } from "../constants/action-types";

const initialCounterState =  {
    messages: [],
}

export function messages(state = initialCounterState, action) {
    switch (action.type) {
      case MESSAGES_FETCH_DATA_SUCCESS:
        console.log("Update state with messages");
        return {
          messages: action.messages
        }
      default:
        return state;
  }
}
