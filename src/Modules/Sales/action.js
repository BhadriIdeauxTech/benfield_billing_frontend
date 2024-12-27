export const SET_SALE = 'SET_SALE'
export const UPDATE_SALE = 'UPDATE_SALE'


export const setSale = sale => {
    return {
        type : SET_SALE,
        payload : sale,
    }
}

export const updatesale = sale => {
    return {
        type : UPDATE_SALE,
        payload : sale,
    }
}