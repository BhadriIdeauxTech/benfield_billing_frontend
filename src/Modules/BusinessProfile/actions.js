
export const SET_COMPANY_PROFILE = 'SET_COMPANY_PROFILE'



export const setCompanyProfile = value => {
    console.log()
    return {
        type: SET_COMPANY_PROFILE,
        payload: value,
    }
}
