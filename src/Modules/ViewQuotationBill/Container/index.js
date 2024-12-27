import { connect } from "react-redux";
import QuatationBill from "../index";
import { setInvoice } from '../action'
import selectors from "../selectors";


const mapStateToProps = state =>({
    getInvoice : selectors.getInvoice(state),
})
const mapDispatchToProps = {
    setInvoice,
}

export default connect(mapStateToProps, mapDispatchToProps)(QuatationBill)

