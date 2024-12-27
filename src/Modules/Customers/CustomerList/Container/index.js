import { connect } from "react-redux";
import {setCustomers } from '../../actions'

import CustomerList from "../index";
import selectors from "../../customerselectors";


const mapStateToProps = state =>({
    getCustomers :selectors.getCustomers(state),
})
const mapDispatchToProps = {
    setCustomers,
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList)

  