export const SET_CUSTOMERS = 'SET_CUSTOMERS'
export const UPDATE_CUSTOMER = 'UPDATE_CUSTOMER'


export const setCustomer = customer => {
    return {
        type : SET_CUSTOMERS,
        payload : customer,
    }
}

export const updatecustomer = customer => {
    return {
        type : UPDATE_CUSTOMER,
        payload : customer,
    }
}