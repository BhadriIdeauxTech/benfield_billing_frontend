import {connect} from 'react-redux'
import { productsForTable } from '../Action'
import selectors from '../PurchaseSelector'
import MainPurchaseentry from '../PendingEntry/Partials/MainPurchase'

const mapStateToProps =state=>({
    getPurch: selectors.getPurch(state),
    getTaxType: selectors.getTaxType(state)
})

const mapDispatchToProps= {
    productsForTable,
}


export default connect(mapStateToProps, mapDispatchToProps)(MainPurchaseentry)