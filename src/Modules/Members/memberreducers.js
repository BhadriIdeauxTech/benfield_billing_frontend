import { SET_MEMBERS } from "./actions";

const initialState = {
    members : [],
}

export default (state= initialState,action) => {
    switch (action.type) {
        case SET_MEMBERS :
            return {...state,members:[...state.members,action.payload]}         
        default:
            return state
    }
}
