import { PRODUCTS_FOR_TABLE } from './Action'
import { TAX_TYPE } from './Action';

const InitialState = {
    PendingEntryTableData: [],
    TaxType: {}
}

export default (state = InitialState, action) => {

    switch (action.type) {

        case PRODUCTS_FOR_TABLE:
            return {
                ...state,
                PendingEntryTableData: action.data,
            }
        case TAX_TYPE:
            return {
                ...state,
                TaxType: action.data,
            }

        default:
            return state;
    }
}