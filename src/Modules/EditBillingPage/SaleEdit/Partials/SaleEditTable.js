import React, { Fragment, useEffect, useState } from 'react'

import { SalesEntryPage } from '../../../Sales/Partials/SalesEntryPage';
import { useDispatch, useSelector } from 'react-redux';
import request from '../../../../utils/request';
import Flex from '../../../../Components/Flex';
import Button from '../../../../Components/Form/Button';
import { Modal } from '../../../../Components/Modal';
import { Table } from '../../../../Components/Table';
import Input from '../../../../Components/Form/Input';
import { FaRegEdit } from 'react-icons/fa';
import { EyeOutlined } from '@ant-design/icons';
import NewPrintDessign from '../../../ViewSaleBills/Partials/NewPrintDessign';
import { setCompanyProfile } from '../../../BusinessProfile/actions';
import { BillDetNow } from '../../../ViewSaleBills/Partials/BillDetNow';
import { updatesale } from '../../../Sales/action';
import Switch from '../../../../Components/Form/Switch';
import { SalesEntryPageGst } from '../../../NonGstSales/Partials/SalesEntryPage';
import { MdLocalPrintshop } from 'react-icons/md';
import NewFixedPrintDesign from '../../../ViewSaleBills/Partials/NewFixedPrintDesign';

const SaleEditTableDetails = () => {

    const dispatch = useDispatch();

    const [searchText, setSearchText] = useState([]);
    const [trigger, setTrigger] = useState(0)
    const [click, setClick] = useState(false);
    const [isGSTClicked, setIsGSTClicked] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [dataSourceEstimate, setDataSourceEstimate] = useState([]);

    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);
    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
    const [modalWidth, setModalWidth] = useState(0);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const FormCloseUpdate = () => {
        handleOk();
        GetEstimateSale();
    }

    const handleSwitched = () => {
        setClick(!click);
    };

    const handleGSTSwitch = () => {
        setIsGSTClicked(prevState => !prevState);
    };

    const handleSearch = (value) => {
        setSearchText(value);
    };

    const CompanyProfile = useSelector((state) => state?.companyprofile?.companyprofile)

    const Invoices = useSelector((state) => state?.invoice?.invoices?.sale)

    const URLS = 'sales/get_sale_det_invoice/'
    const BusinessURL = 'profile/business_view'

    useEffect(() => {
        GetInvoices();
        GetBusines();
        GetEstimateSale();
        dispatch(updatesale())
    }, [])

    useEffect(() => {
        GetInvoices();
    }, [trigger])

    const handleGet = ()=>{
        GetInvoices();
        GetEstimateSale();
    }

    const GetInvoices = (values) => {
        request.get(`${URLS}`, values)
            .then(function (response) {
                setDataSource(response.data?.sale)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const GetBusines = (values) => {
        request.get(`${BusinessURL}`, values)
            .then(function (response) {
                dispatch(setCompanyProfile(response.data))
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const GetEstimateSale = () => {
        request.get('sales/add_sale_new/')
            .then(function (response) {
                setDataSourceEstimate(response.data)
            })
            .catch(function (error) {
                console.log(error.response.data, 'getEstimatesale error');
            });
    }
    const onViewDetails = (record) => {
        setModalWidth(1000);
        showModal();
        setModalContent(<BillDetNow record={record} CompanyProfile={CompanyProfile}  />);
    }

    const editBill = (record) => {
        setTrigger(trigger + 1);
        setModalWidth(1200);
        showModal();
        setModalContent(<SalesEntryPage record={record} ViewEditTrigger={trigger} closeingModel={handleOk} handleGet={handleGet}/>);
    }

    const editBillEstimate = (record) => {
        setTrigger(trigger + 1);
        setModalWidth(1200);
        showModal();
        setModalContent(<SalesEntryPageGst record={record} ViewEditTrigger={trigger} 
            FormCloseUpdate={FormCloseUpdate} />);
    }

    const onFixedPrintView = (record) => {
        setModalWidth(1000);
        showModal();
        setModalContent(<NewFixedPrintDesign record={record} companyProfile={CompanyProfile} isGSTClicked={isGSTClicked} />);
    }
    const columns = [
        {
            title: 'S.No',
            render: (value, item, index) => index + 1,
        },
        {
            title: 'Invoice Number',
            dataIndex: 'invoice_no',
            filteredValue: searchText ? [searchText] : null,
            onFilter: (value, record) => {
                return String(record.invoice_no).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.invoice_no).includes(value.toUpperCase());
            },
        },
        {
            title: 'Date',
            dataIndex: 'invoice_date'
        },
        {
            title: 'Customer Name',
            dataIndex: 'customer_name',

        },
        {
            title: 'Phone Number',
            dataIndex: 'mobile_number',
            render:(text)=>{
                return text !== null ? text:"_"
            }
        },
        {
            title: 'Total Amount',
            dataIndex: 'grand_total'
        },
        {
            title: 'Action',
            render: (record) => {
                return (
                    <>
                        <Flex spaceEvenly gap={'10px'}>
                            {/* <Button.Success onClick={() => { onEditStudent(record) }} text={<EditOutlined />} /> */}
                            <Button.Primary 
                            onClick={click ? () => { editBillEstimate(record) } : () => { editBill(record) }} text={<FaRegEdit  />}
                            />
                            <Button.Success text={<EyeOutlined  />}  onClick={() => { onViewDetails(record) }}  />
                            <Button.Default  text={<MdLocalPrintshop size={22} onClick={()=>{onFixedPrintView(record)}} />} />
                        </Flex>
                    </>
                );
            },
        },

    ]
    return (
        <Fragment>
            <Flex spaceBetween={true}>
                <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
                    <h3>Invoice</h3>
                    <Switch onClick={handleSwitched}/>
                    <h3>Estimate</h3>
                </div>
                {click && (
                    <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
                        <h3>GST Disabled</h3>
                        <Switch onClick={handleGSTSwitch} checked={isGSTClicked}/>
                        <h3>GST Enabled</h3>
                    </div>
                )}
                <Input
                    placeholder="Search by Customer Name"
                    value={searchText}
                    onSearch={handleSearch}
                    onChange={(e) => handleSearch(e.target.value)}

                />
            </Flex>
            {click ? <Table columns={columns} data={dataSourceEstimate}/> :
                <Table columns={columns} data={dataSource}/>}

            <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={modalWidth} modalTitle={modalTitle} modalContent={modalContent} />
        </Fragment>
    )
}

export default SaleEditTableDetails