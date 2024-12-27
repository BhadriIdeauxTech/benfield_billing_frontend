import { SET_DAYBOOK } from "./actions"


const initialState = {
    daybook : [],
}

export default (state= initialState,action) => {
    switch (action.type) {
        case SET_DAYBOOK :
            return {...state,daybook:[...state.daybook,action.payload]}         
        default:
            return state
    }
}
