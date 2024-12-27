import { SET_PRODUCT } from "./actions"


const initialState = {
    product : [],
}

export default (state= initialState,action) => {
    switch (action.type) {
        case SET_PRODUCT :
            return {...state,product:[...state.product,action.payload]}         
        default:
            return state
    }
}
