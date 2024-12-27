import { connect } from "react-redux";
import { updateTable,deleteTable,deleteTableData } from "../Action";
import selectors from "../Partials/PanelSelectors";
import { PanelMain } from "..";

const mapStateToProps =state=>({
    getPanel: selectors.getPanel(state)
})

const mapDispatchToProps= {
    updateTable,
    deleteTable,
    deleteTableData
}


export default connect(mapStateToProps, mapDispatchToProps)(PanelMain)