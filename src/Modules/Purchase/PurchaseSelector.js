const getPurch = state => state.AddingPendingEntry.PendingEntryTableData
const getTaxType = state => state.AddingPendingEntry.TaxType

const selectors = {
    getPurch, 
    getTaxType,
}

export default selectors