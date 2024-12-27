import { connect } from "react-redux";
import { productsForTable } from "../Action";
import selectors from "../PurchaseSelector";
import { PendingEntryEstimate } from "../PendingEntry/estimateIndex";

const mapStateToProps =state=>({
    getPurch: selectors.getPurch(state),
})
 
const mapDispatchToProps= {
    productsForTable,
}


export default connect(mapStateToProps, mapDispatchToProps)(PendingEntryEstimate)