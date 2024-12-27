import { connect } from "react-redux";
import { AddItems } from "../Partials/AddItems";
import { setProduct } from "../../actions";
import selectors from "../../productselector";
import { AddProduct } from "..";


const mapStateToProps = state =>({
    getProduct : selectors.getProduct(state),
})
const mapDispatchToProps = {
    setProduct,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct)
