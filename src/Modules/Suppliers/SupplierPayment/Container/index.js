import { connect } from "react-redux";
import { setSupplier } from '../../action'
import SupplierPayment from "../index";
import selectors from "../../supplierselectors";


const mapStateToProps = state =>({
    getSupplier : selectors.getSupplier(state),
})
const mapDispatchToProps = {
    setSupplier,
}

export default connect(mapStateToProps, mapDispatchToProps)(SupplierPayment)

