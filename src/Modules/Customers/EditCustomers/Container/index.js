import { connect } from "react-redux";
import { setCustomer } from '../../actions'
import selectors from "../../customerselectors";
import CustomerEdit from "../index";

const mapStateToProps = state =>({
    getCustomer : selectors.getCustomer(state),
})
const mapDispatchToProps = {
    setCustomer,
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerEdit)