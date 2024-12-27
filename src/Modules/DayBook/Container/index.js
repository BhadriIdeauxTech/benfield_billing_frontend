import { connect } from "react-redux";
import DayBookMain from '../index'
import { setDaybook } from "../actions";
import selectors from "../daybookselector";


const mapStateToProps = state =>({
    getDaybook : selectors.getDaybook(state),
})
const mapDispatchToProps = {
    setDaybook,
}

export default connect(mapStateToProps, mapDispatchToProps)(DayBookMain)

