import { connect } from "react-redux";
import Dashboard from '../index'
import { setDashboard } from "../action";
import selectors from "../selectors";


const mapStateToProps = state =>({
    getDash : selectors.getDash(state),
})
const mapDispatchToProps = {
    setDashboard,
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

