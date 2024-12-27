import { SET_INVOICE } from "./action"

const initialState = {
    invoices : [],
}

export default (state= initialState,action) => {
    switch (action.type) {  
            case SET_INVOICE :
            return {...state,invoices:action.payload}        
        default:
            return state
    }
}
