import { combineReducers } from 'redux'
import authReducer from '../Modules/Auth/reducers'
import memberreducers from "../Modules/Members/memberreducers";
import customerreducers from "../Modules/Customers/customerreducers";
import productreducers from '../Modules/Products/productreducers';
import supplierreducers from '../Modules/Suppliers/supplierreducers';
import daybookreducer from '../Modules/DayBook/daybookreducer';
import salereducer from '../Modules/Sales/salereducer';
import Dashreducer from '../Modules/Dashboard/reducer'
import InvoiceReducer from '../Modules/ViewSaleBills/reducers'
import PanelReducer from '../Modules/Panel/PanelReducer'
import PurchaseReducer from '../Modules/Purchase/PurchaseReducer'
import CompanyProfileReducer from '../Modules/BusinessProfile/CompanyReducers'
import navreducers from '../Layout/partials/NavHeader/navreducers';

export default combineReducers({
  auth: authReducer,
  dash:Dashreducer,
  invoice:InvoiceReducer,
  AddingMembers : memberreducers,
  AddingCustomers : customerreducers,
  AddingSale : salereducer,
  AddingProduct :  productreducers,
  AddingSupplier : supplierreducers,
  AddingDaybook : daybookreducer,
  AddingPanel : PanelReducer,
  AddingPendingEntry : PurchaseReducer,
  companyprofile:CompanyProfileReducer,
  navigationheader:navreducers,
})

