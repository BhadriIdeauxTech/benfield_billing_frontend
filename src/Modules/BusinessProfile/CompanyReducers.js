import { SET_COMPANY_PROFILE } from "./actions"


const initialState = {
    companyprofile: {},
}

export default (state = initialState, action) => {
    switch (action.type) {

        case SET_COMPANY_PROFILE:
            return { ...state, companyprofile: action.payload }
        default:
            return state
    }
}
