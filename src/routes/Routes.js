// import React from 'react'
// import { Routes, Route } from 'react-router-dom'
// import AdminLayout from '../Layout/AdminMain'

// //----------------- Home --------------------------------


// import LoginPagemain from '../Modules/Loginpage'

// import AddMembers from '../Modules/Members/AddMembers/Container/index'
// import MemberList from '../Modules/Members/MemberList/Container/index'
// import {AddProduct} from '../Modules/Products/Add Items/index'
// import SalesReturn from '../Modules/SalesReturn'
// import PurchaseReport from '../Modules/Reports/Report/Partials/MainBar'
// import AddSpplier from '../Modules/Suppliers/AddSupplier'
// import EditSppliers from '../Modules/Suppliers/EditSupplier'
// import SupplierPayment from '../Modules/Suppliers/SupplierPayment'
// import EditSupplierPayment from '../Modules/Suppliers/EditSupplierPayement'
// import AddCustomers from '../Modules/Customers/AddCustomers/Container'
// import CustomerEdit from '../Modules/Customers/EditCustomers'
// import CustomerPaymentDetails from '../Modules/Customers/CustomerPayment'
// import CustomerEditPayment from '../Modules/Customers/EditPaymentCustomer'
// import BusinessProfiles from '../Modules/BusinessProfile/AddBusiness'
// import EditBusinessProfiles from '../Modules/BusinessProfile/EditProfile'
// import Estimate from '../Modules/Estimate'
// import Expense from '../Modules/Expense'
// import SupplierProfiles from '../Modules/Suppliers/SupplierProfile'
// import SaleReportMain from '../Modules/Reports/SaleReport'
// import CustomerProfiles from '../Modules/Customers/CustomerProfile'
// import PurchaseReportMain from '../Modules/Reports/PurchaseReport'
// import SalesReturnReportMain from '../Modules/Reports/SalesReturnReport'
// import PurchaseReturnReportMain from '../Modules/Reports/PrchaseReturnReport'
// import QuatationReportMain from '../Modules/Reports/QuatationReport'
// import ExpenseReportMain from '../Modules/Reports/Expense'
// import TotalCustomersMain from '../Modules/Reports/TotalCustomersReports'
// import TotalSupplierMain from '../Modules/Reports/TotalSupplierReport'
// import SalesMain from '../Modules/Sales'
// import Purchase from '../Modules/Purchase/Purchase'
// import PurchaseReturn from '../Modules/Purchase/PurchaseReturn'
// import Dashboard from '../Modules/Dashboard'
// import DayBook from '../Modules/DayBook'
// import SupplierProfile from '../Modules/Suppliers/SupplierProfile/Partials/SupplierProfile'
// import CustomerProfilesDetails from '../Modules/Customers/CustomerProfile/Partials/CustomerProfiles'




// //----------------- Home end ------------------------------

// //-------------- Admin Pages start --------------



// //============================== End======================================================//



// const ProjectRoutes = () => {
//   return (
//     <Routes>
//       <Route path='/login_page' element={<LoginPagemain />} />

//       <Route path='/' exact element={<AdminLayout />} >

//         <Route index element={<Dashboard />} />
//         <Route path='dashboard/' element={<Dashboard />} />

//         <Route path='add_members/' element={<AddMembers />} />
//         <Route path='member_list/' element={<MemberList />} />
//         <Route path='addcustomers/' element={<AddCustomers />} />
//         <Route path='editcustomers/' element={<CustomerEdit />} />
//         <Route path='daybook/' element={<DayBook />} />
//         {/* <Route path='add_items/' element={<AddingItems />} /> */}
//         <Route path='editpayment_supplier/' element={<EditSupplierPayment />} />
//         <Route path='add_supplier/' element={<AddSpplier />} />
//         <Route path='edit_suplier/' element={<EditSppliers />} />
//         {/* <Route path='supplier_profile/' element={<SupplierProfiles />} /> */}
//         <Route path='sales_return/' element={<SalesReturn />} />
//         <Route path='expense/' element={<Expense />} />
//         <Route path='sales_page/' element={<SalesMain />} />
//         <Route path='sales_report/' element={<SaleReportMain />} />
//         <Route path='purchase_report/' element={<PurchaseReportMain />} />
//         <Route path='salereturn_report/' element={<SalesReturnReportMain />} />
//         <Route path='purchasereturn_report/' element={<PurchaseReturnReportMain />} />
//         <Route path='expense_report/' element={<ExpenseReportMain />} />
//         <Route path='totalcustomer_report/' element={<TotalCustomersMain />} />
//         <Route path='supplier_report/' element={<TotalSupplierMain />} />
//         <Route path='quotation_report/' element={<QuatationReportMain />} />
//         <Route path='estimate/' element={<Estimate />} />
//         <Route path='business_profile/' element={<BusinessProfiles />} />
//         <Route path='edit_business_profile/' element={<EditBusinessProfiles />} />
//         <Route path='supplier_payments/' element={<SupplierPayment />} />
//         <Route path='editpayment/' element={<CustomerEditPayment />} />
//         <Route path='customerpayment/' element={<CustomerPaymentDetails />} />
//         {/* <Route path='customer_profile/' element={<CustomerProfiles />} /> */}
//         <Route path='purchase_report/' element={<PurchaseReport />} />
//         <Route path='purchase/' element={<Purchase />} />
//         <Route path='addproduct/' element={<AddProduct />} />
//         <Route path='SupplierProfiles' element={<SupplierProfile/>}/>
//         <Route path='CustomerProfiless' element={<CustomerProfilesDetails/>}/>
//         <Route path='purchase_return/' element={<PurchaseReturn />} />
//         {/* //========== End =========================== */}

//         <Route path='*' element={<div>not available</div>} />


//       </Route>

//     </Routes>
//   )
// }
// export default ProjectRoutes
