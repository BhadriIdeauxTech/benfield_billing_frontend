import { connect } from "react-redux";
import { setSupplier } from '../../action'
import selectors from "../../supplierselectors";
import EditSppliers from "../index";


const mapStateToProps = state =>({
    getSupplier : selectors.getSupplier(state),
})
const mapDispatchToProps = {
    setSupplier,
}

export default connect(mapStateToProps, mapDispatchToProps)(EditSppliers)

