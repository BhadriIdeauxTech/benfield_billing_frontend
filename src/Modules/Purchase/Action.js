export const PRODUCTS_FOR_TABLE = 'PRODUCTS_FOR_TABLE'
export const TAX_TYPE = 'TAX_TYPE'

export const productsForTable = (data) => {
    return {
        type: PRODUCTS_FOR_TABLE,
        data: data
    }
}

export const taxType = (data) => {
    return {
        type: TAX_TYPE,
        data: data
    }
}