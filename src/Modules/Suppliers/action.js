export const SET_SUPPLIER = 'SET_SUPPLIER'
export const UPDATE_SUPPLIER = 'UPDATE_SUPPLIER'


export const setSupplier = supplier => {
    return {
        type : SET_SUPPLIER,
        payload : supplier,
    }
}
export const updateSupplier = supplier => {
    return {
        type : UPDATE_SUPPLIER,
        payload : supplier,
    }
}