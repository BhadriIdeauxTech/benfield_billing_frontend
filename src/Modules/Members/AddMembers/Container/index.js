import { connect } from "react-redux";
import selectors from "../../memberselectors";
import AddMembers from "../index";
import { setMembers } from "../../actions"


const mapStateToProps = state =>({
    getMembers : selectors.getMembers(state),
})
const mapDispatchToProps = {
    setMembers,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMembers)

