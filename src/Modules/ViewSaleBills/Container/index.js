import { connect } from "react-redux";
import { ViewBillsPrint } from "../index";
import { setInvoice } from '../action'
import selectors from "../selectors";


const mapStateToProps = state =>({
    getInvoice : selectors.getInvoice(state),
})
const mapDispatchToProps = {
    setInvoice,
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewBillsPrint)

