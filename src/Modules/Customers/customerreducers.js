import { SET_CUSTOMERS, UPDATE_CUSTOMER  } from "./actions"


const initialState = {
    customer : [],
}

export default (state= initialState,action) => {
    switch (action.type) {
        case UPDATE_CUSTOMER :
            return {...state,customer:[...state.customer,action.payload]}  
            case SET_CUSTOMERS :
            return {...state,customer:action.payload}             
        default:
            return state
    }
}
