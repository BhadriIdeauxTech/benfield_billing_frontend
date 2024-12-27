import { NOTIFICATION_HEADER } from "./actions";

const InitialState = {
    NotificationHeaderData: {},
  
}

export default (state = InitialState, action) => {

    switch (action.type) {

        case NOTIFICATION_HEADER:
            return {
                ...state,
                NotificationHeaderData: action.data,
            }
        default:
            return state;
    }
}