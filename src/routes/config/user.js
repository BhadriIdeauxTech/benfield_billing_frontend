import PageNotFound from '../Components/PageNotFound'
import UserSignin from '../../Modules/Auth/Container/index'
import Dashboard from '../../Modules/Dashboard/Container/index'
import SalesMain from '../../Modules/Sales/Container/index'
import SalesReturn from '../../Modules/SalesReturn'
import Purchase from '../../Modules/Purchase/Purchase'
import PurchaseReturn from '../../Modules/Purchase/PurchaseReturn'
import Estimate from '../../Modules/Estimate'
import AddSpplier from '../../Modules/Suppliers/AddSupplier'
import EditSppliers from '../../Modules/Suppliers/EditSupplier/Container/index'
import AddCustomers from '../../Modules/Customers/AddCustomers'
import CustomerEdit from '../../Modules/Customers/EditCustomers/Container/index'
import { AddProduct } from '../../Modules/Products/Add Items'
import BusinessProfiles from '../../Modules/BusinessProfile/AddBusiness'
import EditBusinessProfiles from '../../Modules/BusinessProfile/EditProfile'
import AddMembers from '../../Modules/Members/AddMembers'
import MemberList from '../../Modules/Members/MemberList/Container/index'
import SaleReportMain from '../../Modules/Reports/SaleReport'
import PurchaseReportMain from '../../Modules/Reports/PurchaseReport'
import QuatationReportMain from '../../Modules/Reports/QuatationReport'
import DayBook from '../../Modules/DayBook/Container/index'
import ProductViewItems from '../../Modules/Products/ViewItems'
import ViewBillsPrint from '../../Modules/ViewSaleBills/Container/index'
import QuatationBill from '../../Modules/ViewQuotationBill/Container/index'
import UnPaidBill from '../../Modules/UnpaidBills'
import Panel from '../../Modules/Panel/Container/index'
import SupplierProfiles from '../../Modules/Suppliers/SupplierProfile/Container/index'
import CustomerProfiles from '../../Modules/Customers/CustomerProfile/Container/index'
import ViewPanel from '../../Modules/Panel/Partials/ViewPanel'
import UnpaidPurchaseBill from '../../Modules/UnpadidPurchaseBill/Index'
import SalesReturnReportMain from '../../Modules/Reports/SalesReturnReport'
import PurchaseReturnReportMain from '../../Modules/Reports/PrchaseReturnReport'
import SalesEntryNonGst from '../../Modules/NonGstSales'
import { AddProductNonGST } from '../../Modules/ProductNonGST/Add Items'
import NonGSRPurchase from '../../Modules/Purchase/NonGstPurchse'
import MainPurchaseentry from '../../Modules/Purchase/Container/index2'
import PurchasePendingEntryForm from '../../Modules/Purchase/Container/index'
import NonGstPurchaseReturn from '../../Modules/Purchase/NonGSTPurchaseReturn'
import NonGst_SalesReturn from '../../Modules/Nongst SaleReturn'
import EstimateNongst from '../../Modules/EstimateNonGST'
import PendingEntryEstimate from '../../Modules/Purchase/Container/index3'
import UnPaidBillRetun from '../../Modules/UnpaidSaleReturn'
import UnpaidPurchaseReturn from '../../Modules/UnpaidPurchaseReturn/Index'
import { ViewEstimationPrint } from '../../Modules/ViewEstimation/index'
import { ViewQuotationNonGSTPrint } from '../../Modules/ViewQuotationNonGst'
import SiteStatusEntry from '../../Modules/Site/Partials/SiteStatusEntry'
import { SiteStatus } from '../../Modules/Site/index'
// import ProformaMain from '../../Modules/ProformaInvoice'
import ProformaNonGSTMain from '../../Modules/PorformaNonGSTInvoice'
import { ProformaInvoiceTable } from '../../Modules/ViewprofromaInvoice/Invoice/ProformaInvoiceTable'
import { EstimationProformaInvoiceTable } from '../../Modules/ViewprofromaInvoice/Estimation/EstimationProformaInvoiceTable'
import ProformaMain from '../../Modules/ProformaInvoice/index'
import SiteProduct from '../../Modules/RollSitePages/Product'
import { SiteSiteSection } from '../../Modules/RollSitePages/SiteStatus'
import PurchaseViewTable from '../../Modules/EditBillingPage/PurchaseEdit'
import SaleEditTable from '../../Modules/EditBillingPage/SaleEdit'
import QuotationEditTable from '../../Modules/EditBillingPage/QuotationEdit'



export const anonymous = [
  {
    routePath: '/signin',
    Component: UserSignin,
  },
]

export const authenticated = [
  {
    routePath: '/',
    Component: Dashboard,
  },
  {
    routePath: 'sales/add_sale',
    Component: SalesMain,
  },
  {
    routePath: 'sales_return/',
    Component: SalesReturn,
  },
  {
    routePath: 'sales_estimate/',
    Component: SalesEntryNonGst,
  },
  {
    routePath: 'estimate_sales_return/',
    Component: NonGst_SalesReturn,
  },

  {
    routePath: 'purchase/',
    Component: Purchase,
  },
  {
    routePath: 'purchase_return/',
    Component: PurchaseReturn,
  },
  {
    routePath: 'estimate_purchase/',
    Component: NonGSRPurchase,
  },
  {
    routePath: 'estimate_purchase_return/',
    Component: NonGstPurchaseReturn,
  },
  {
    routePath: 'pending_entry/',
    Component: PurchasePendingEntryForm,
  },
  {
    routePath: 'estimate/',
    Component: Estimate,
  },
  {
    routePath: 'quotation_estimate/',
    Component: EstimateNongst,
  },
  {
    routePath: 'addproduct/',
    Component: AddProduct,
  },
  {
    routePath: 'viewproducts/',
    Component: ProductViewItems,
  },
  {
    routePath: 'addproduct_non_gst/',
    Component: AddProductNonGST,
  },
  // {
  //   routePath: 'viewproducts_non_gst/',
  //   Component: ProductViewItems,
  // },
  {
    routePath: 'addpanel/',
    Component: Panel,
  },
  {
    routePath: 'viewpanel/',
    Component: ViewPanel,
  },
  {
    routePath: 'add_supplier/',
    Component: AddSpplier,
  },
  {
    routePath: 'edit_suplier/',
    Component: EditSppliers,
  },
  {
    routePath: 'addcustomers/',
    Component: AddCustomers,
  },
  {
    routePath: 'editcustomers/',
    Component: CustomerEdit,
  },
  {
    routePath: 'daybook/',
    Component: DayBook,
  },
  {
    routePath: 'unpaidsalebill/',
    Component: UnPaidBill,
  },
  {
    routePath: 'unpaidsalerutunbill/',
    Component: UnPaidBillRetun,
  },
  {
    routePath: 'unpaidpurchseretunbill/',
    Component: UnpaidPurchaseReturn,
  },
  {
    routePath: 'unpaidpurchsebill/',
    Component: UnpaidPurchaseBill,
  },
  {
    routePath: 'view_invoice/',
    Component: ViewBillsPrint,
  },
  {
    routePath: 'quationinvoice/',
    Component: QuatationBill,
  },
  {
    routePath: 'business_profile/',
    Component: BusinessProfiles,
  },
  {
    routePath: 'edit_business_profile/',
    Component: EditBusinessProfiles,
  },
  {
    routePath: 'add_members/',
    Component: AddMembers,
  },
  {
    routePath: 'member_list/',
    Component: MemberList,
  },
  {
    routePath: 'sales_report/',
    Component: SaleReportMain,
  },
  {
    routePath: 'purchase_report/',
    Component: PurchaseReportMain,
  },
  {
    routePath: 'salereturn_report/',
    Component: SalesReturnReportMain,
  },
  {
    routePath: 'purchasereturn_report/',
    Component: PurchaseReturnReportMain,
  },
  {
    routePath: 'quotation_report/',
    Component: QuatationReportMain,
  },

  // {
  //   routePath: 'SupplierProfilesNonGST/:id',
  //   Component: SupplierProfilesNonGST,
  // },
  {
    routePath: 'SupplierProfiles/:id',
    Component: SupplierProfiles,
  },
  {
    routePath: 'CustomerProfiless/:id',
    Component: CustomerProfiles,
  },
  {
    routePath: 'MainPurchase/',
    Component: MainPurchaseentry,
  },
  {
    routePath: 'MainPurchase/:id',
    Component: MainPurchaseentry,
  },
  {
    routePath: 'PendingEntryEstimate/',
    Component: PendingEntryEstimate,
  },
  {
    routePath: 'PendingEntryEstimate/:id',
    Component: PendingEntryEstimate,
  },

  // ===========  New ========

  {
    routePath: 'view_estimation/',
    Component: ViewEstimationPrint,
  },
  {
    routePath: 'view_quotationestimate/',
    Component: ViewQuotationNonGSTPrint,
  },
  //============= Site Status ==============
  {
    routePath: 'add_site/',
    Component: SiteStatusEntry,
  },
  {
    routePath: 'site_status/',
    Component: SiteStatus,
  },

  {
    routePath: 'proformainvoice/',
    Component: ProformaMain,
  },
  {
    routePath: 'Estimate/proformainvoice/',
    Component: ProformaNonGSTMain,
  },
  {
    routePath: 'proformainvoice/View',
    Component: ProformaInvoiceTable,
  },
  {
    routePath: 'EstimateProformainvoice/View',
    Component: EstimationProformaInvoiceTable,
  },
  {
    routePath: 'Product/Table',
    Component: SiteProduct,
  },
  {
    routePath: 'SiteStatus/Table',
    Component: SiteStatus,
  },
  {
    routePath: 'salesEdit',
    Component: SaleEditTable,
  },
  {
    routePath: 'PurchaseEdit',
    Component: PurchaseViewTable,
  },
  {
    routePath: 'quotationEdit',
    Component: QuotationEditTable,
  },
  {
    routePath: '*',
    Component: PageNotFound,
  },
]

export const authenticated2 = [
  {
    routePath: '/',
    Component: SiteProduct,
  },
  {
    routePath: 'Product/Table',
    Component: SiteProduct,
  },
  {
    routePath: 'add_site/',
    Component: SiteStatusEntry,
  },
  {
    routePath: 'SiteStatus/Table',
    Component: SiteStatus,
  },
  {
    routePath: '*',
    Component: PageNotFound,
  },
]
