export const SET_PRODUCT = 'SET_PRODUCT'

export const setProduct = product => {
    return{
        type:'SET_PRODUCT',
        payload : product ,
    }
}
