import { connect } from "react-redux";
import { setCustomer } from '../../actions'
import CustomerProfiles from "../index";
import selectors from "../../customerselectors";

const mapStateToProps = state =>({
    getCustomer : selectors.getCustomer(state),
})
const mapDispatchToProps = {
    setCustomer,
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerProfiles)