
import { SET_SALE, UPDATE_SALE } from "./action"

const initialState = {
    sale : [],
}

export default (state= initialState,action) => {
    switch (action.type) {
        case UPDATE_SALE :
            return {...state,sale:[...state.sale,action.payload]}    
            case SET_SALE :
            return {...state,sale:action.payload}        
        default:
            return state
    }
}
