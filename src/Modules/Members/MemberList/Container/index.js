import { connect } from "react-redux";

import MemberList from "../Partials/MemberList";
import selectors from "../../memberselectors";
import { setMembers } from "../../actions";


const mapStateToProps = state =>({
    getMembers :selectors.getMembers(state),
})
const mapDispatchToProps = {
    setMembers,
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberList)

  
