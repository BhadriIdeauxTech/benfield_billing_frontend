import {connect} from 'react-redux'
import { productsForTable,taxType } from '../Action'
import selectors from '../PurchaseSelector'
import {PurchasePendingEntryForm} from '../PendingEntry/index'

const mapStateToProps =state=>({
    getPurch: selectors.getPurch(state)
})

const mapDispatchToProps= {
    productsForTable,
    taxType
}


export default connect(mapStateToProps, mapDispatchToProps)(PurchasePendingEntryForm)