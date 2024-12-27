import { connect } from "react-redux";
import BusinessProfiles from "../index";
import { setCompanyProfile } from "../../actions";
import selectors from "../../CompanySelectors";

const mapStateToProps = state =>({
    getCompanyProfile:selectors.getCompanyProfile(state),
})
const mapDispatchToProps = {
    setCompanyProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessProfiles)

  