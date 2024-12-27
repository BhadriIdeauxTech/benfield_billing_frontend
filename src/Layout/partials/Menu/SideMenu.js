
import { HiOutlineNewspaper, HiShoppingCart } from 'react-icons/hi';
import { TiFlowSwitch, TiPrinter } from 'react-icons/ti';
import { MdCrisisAlert, MdOutlineToday, MdPointOfSale } from 'react-icons/md'
import { FaBusinessTime, FaChartLine, FaFileInvoice, FaProductHunt, FaUserCheck, FaUserEdit } from 'react-icons/fa'
import { Menu } from "antd";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { UsergroupAddOutlined } from '@ant-design/icons';
import { GoRepoPull } from 'react-icons/go';
import request from '../../../utils/request';
import { useDispatch, useSelector } from 'react-redux';
import { setCompanyProfile } from '../../../Modules/BusinessProfile/actions'

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const SideMenu = () => {

  const [CompanyPro, setCompanyPro] = useState([])
  const dispatch = useDispatch();

  const company = useSelector((state) => state?.companyprofile?.companyprofile)

  useEffect(() => {
    GetCompany();
  }, [])

  useEffect(() => {
  }, [company])

  const UserRole = useSelector((state) => state?.auth?.token?.role)

  useEffect(() => {
  }, [UserRole])

  const GetCompany = () => {

    request.get('profile/business_view')
      .then(function (response) {
        setCompanyPro(response.data)
        dispatch(setCompanyProfile(response.data))
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const rootSubinmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4', 'sub5', 'sub6', 'sub7', 'sub8', 'sub9', 'sub10', 'sub11', 'sub12', 'sub13','sub14'];
  const [openKeys, setOpenKeys] = useState(['sub1']);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubinmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const itemsSite = [
    getItem('Product', "Product/Table", <FaProductHunt />),
    getItem('Site Status', "SiteStatus/Table", <FaChartLine />),
  ]

  const items = [
    getItem('Dashboard', ''),

    //============== Admin Page start =================

    getItem('Sales', 'sub1', <MdCrisisAlert />, [
      getItem('Bill Page', 'sales/add_sale'),
      getItem('Sales Return', 'sales_return'),
      getItem(' Estimate Sales', 'sales_estimate'),
      getItem(' Estimate Sales Return', 'estimate_sales_return'),
    ]),
    getItem('Purchase', 'sub2', <HiShoppingCart />, [
      getItem('Add Purchase', 'purchase'),
      getItem('Purchase Return', 'purchase_return'),
      getItem('Estimate Purchase', 'estimate_purchase'),
      getItem('Estimate Purchase Return', 'estimate_purchase_return'),
      getItem('Pending Entry', 'pending_entry'),
    ]),

    getItem('Quotation', 'sub3', <UsergroupAddOutlined />, [
      getItem('Quotation', 'estimate'),
      getItem('Estimate Quotation', 'quotation_estimate'),
    ]),

    getItem('Product', 'sub4', <FaProductHunt />, [
      getItem('Add Product', 'addproduct'),
      getItem('View Product', 'viewproducts'),
    ]),

    getItem('Panel', 'sub5', <TiFlowSwitch />, [
      getItem('Add Panel', 'addpanel'),
      getItem('View Panel', 'viewpanel'),
    ]),

    getItem('Supplier', 'sub6', <MdPointOfSale />, [
      getItem('Add Supplier', 'add_supplier'),
      getItem('View Supplier', 'edit_suplier'),
    ]),

    getItem('Customers', 'sub7', <FaUserEdit />, [
      getItem('Add Customers', 'addcustomers'),
      getItem('View Customer', 'editcustomers'),
    ]),

    // getItem('Daybook', 'daybook', <MdOutlineToday />),

    getItem('Unpaid Bills', 'sub8', <FaUserEdit />, [
      getItem('Sales Bills', 'unpaidsalebill', <HiOutlineNewspaper />),
      getItem('Sales Return Bills', 'unpaidsalerutunbill', <HiOutlineNewspaper />),
      getItem('Purchase Bills', 'unpaidpurchsebill', <HiOutlineNewspaper />),
      getItem('Purchase Return Bills', 'unpaidpurchseretunbill', <HiOutlineNewspaper />),
    ]),


    // getItem('Print Bills', 'sub8', <TiPrinter />, [
    //   getItem('Invoice Bill', 'view_invoice'),
    //   getItem('Quotation Bill', 'quationinvoice'),
    //   getItem('Quotation Estimate Bill', 'view_quotationestimate'),
    //   getItem('Estimation Bill', 'view_estimation'),
    // ]),

    getItem('Business Profile', 'sub9', <FaBusinessTime />, [
      Object.keys(company).length === 0 && getItem('Add Profile', 'business_profile'),
      getItem('View Profile', 'edit_business_profile'),
    ]),

    getItem('Proforma Invoice', 'sub10', <FaFileInvoice />, [
      getItem('Invoice Page', 'proformainvoice'),
      getItem('Estimate Proforma', 'Estimate/proformainvoice'),
      getItem('View Invoice', 'proformainvoice/View'),
      getItem('View Estimate', 'EstimateProformainvoice/View'),
    ]),

  ];

  if (UserRole !== 'GST-Biller') {
    items.push(
      getItem('Site Status', 'site_status', <FaChartLine />,)
    );
  }

  if (UserRole !== 'GST-Biller') {
    items.push(
      getItem('Daybook', 'daybook', <MdOutlineToday />),

      getItem('User Create', 'sub11', <FaUserCheck />, [
        getItem('Create User', 'add_members'),
        getItem('View User', 'member_list'),
      ]),

      getItem('Report', 'sub12', <GoRepoPull />, [
        getItem('Sales', 'sales_report'),
        getItem('Sales Return', 'salereturn_report'),
        getItem('Purchase', 'purchase_report'),
        getItem('Purchase Return', 'purchasereturn_report'),
        getItem('Quotation', 'quotation_report')
      ]),

      getItem('Update Billing', 'sub13', <GoRepoPull />, [
        getItem('Sales', 'salesEdit'),
        // getItem('Sales Return', 'salereturn_report'),
        getItem('Purchase', 'PurchaseEdit'),
        // getItem('Purchase Return', 'purchasereturn_report'),
        getItem('Quotation', 'quotationEdit')
      ]),
    );
  }


  // const onOopenSub = (keys) => {
  //   const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
  //   if (rootSubinmenuKeys.indexOf(latestOpenKey) === -1) {
  //     setOpenKeys(keys);
  //   } else {
  //     setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  //   }
  // };

  const navigate = useNavigate();
  const onClick = ({ key }) => {

    if (key === null) {
      console.log('no navigate')

    }
    else {
      navigate(`${key}/`)
    }
  }
  return (
    <>

      <Menu
        onClick={onClick}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        defaultSelectedKeys={['1']}
        // onClick={()=> onOopenSub()}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={UserRole === 'Site' ? itemsSite : items}
      />
    </>
  )
}

export default SideMenu
