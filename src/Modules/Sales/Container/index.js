import { connect } from "react-redux";
import SalesMain from "../index";
import { setSale } from "../action";
import selectors from "../saleselector";


const mapStateToProps = state =>({
    getSale : selectors.getSale(state),
})
const mapDispatchToProps = {
    setSale,
}

export default connect(mapStateToProps, mapDispatchToProps)(SalesMain)

