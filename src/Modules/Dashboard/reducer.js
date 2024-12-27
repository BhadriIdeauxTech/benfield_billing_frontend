import { SET_DASHBOARD } from "./action";

const initialState = {
    dashdetails: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_DASHBOARD:
            return { ...state, dashdetails: action.payload }
        default:
            return state
    }
}
