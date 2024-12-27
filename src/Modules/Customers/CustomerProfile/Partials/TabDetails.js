import React from 'react'
import Creditpay from './Creditpay';
import Debitpay from './Debitpay';
import Sales from './Sales';
import { Tabs } from '../../../../Components/Tabs';
import SalesRetun from './SalesRetun';
import { useEffect } from 'react';
import { useState } from 'react';
import EstimateDebPay from './EstimateDebPay';
import EstimateCreditPay from './EstimateCreditPay';
import EstimateSale from './EstimateSale';
import EstimateSaleReturn from './EstimateSaleReturn';
import Quotation from './Quotation';
import EstimateQuotation from './EstimateQuotation';

const TabDetails = ({ customerProfile }) => {

    const [CustomerDetails, setCustomerDetails] = useState([])

    useEffect(() => {
        setCustomerDetails(customerProfile)
    }, [customerProfile])

    const items = [
        {
            key: '1',
            label: `Sales`,
            children: <Sales CustomerDetails={CustomerDetails} />,

        },
        {
            key: '2',
            label: `Sales Return`,
            children: <SalesRetun CustomerDetails={CustomerDetails} />,
        },
        {
            key: '3',
            label: `Credit Pay`,
            children: <Creditpay CustomerDetails={CustomerDetails} />,
        },
        {
            key: '4',
            label: `Debit Pay`,
            children: <Debitpay CustomerDetails={CustomerDetails} />,
        },
        {
            key: '5',
            label: `Estimate Sale`,
            children: <EstimateSale CustomerDetails={CustomerDetails} />,
        },
        {
            key: '6',
            label: `Estimate Return Sale`,
            children: <EstimateSaleReturn CustomerDetails={CustomerDetails} />,
        },
        {
            key: '7',
            label: `Estimate Debit Pay`,
            children: <EstimateDebPay CustomerDetails={CustomerDetails} />,
        },
        {
            key: '8',
            label: `Estimate Credit Pay`,
            children: <EstimateCreditPay CustomerDetails={CustomerDetails} />,
        },
        {
            key: '9',
            label: `Quotation`,
            children: <Quotation CustomerDetails={CustomerDetails} />,
        },
        {
            key: '10',
            label: `Estimate Quotation`,
            children: <EstimateQuotation CustomerDetails={CustomerDetails} />,
        },
    ];
    const onChange = (key) => {
        console.log(key);
    };
    return (
        <div>
            <Tabs onChange={onChange} items={items} />
        </div>
    )
}

export default TabDetails