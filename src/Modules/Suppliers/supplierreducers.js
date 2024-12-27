import { SET_SUPPLIER, UPDATE_SUPPLIER } from "./action"

const initialState = {
    supplier : [],
}

export default (state= initialState,action) => {
    switch (action.type) {
        case UPDATE_SUPPLIER :
            return {...state,supplier:[...state.supplier,action.payload]}    
            case SET_SUPPLIER :
            return {...state,supplier:action.payload}        
        default:
            return state
    }
}
