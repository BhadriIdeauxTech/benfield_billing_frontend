export const SET_INVOICE = 'SET_INVOICE'


export const setInvoice = supplier => {
    return {
        type : SET_INVOICE,
        payload : supplier,
    }
}