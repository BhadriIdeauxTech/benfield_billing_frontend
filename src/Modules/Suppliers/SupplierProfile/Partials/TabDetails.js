import React from 'react'
import { Tabs } from '../../../../Components/Tabs'
import PurchaseTabs from './PurchaseTabs';
import PurchaseRetun from './PurchaseRetun';
import Creditpay from './Creditpay';
import Debitpay from './Debitpay';
import EstimatePay from './EstimatePay';
import EstimateReturnPay from './EstimateReturnPay';
import { Col, Input, Row } from 'antd';
import EstimateDebPay from './EstimateDebPay';
import EstimateCreditPay from '../EstimateCreditPay';

const TabDetails = ({ getSupplier }) => {
    const items = [
        {
            key: '1',
            label: `Purchase`,
            children: <PurchaseTabs getSupplier={getSupplier} />,
        },
        {
            key: '2',
            label: `Purchase Return`,
            children: <PurchaseRetun getSupplier={getSupplier} />,
        },
        {
            key: '3',
            label: `Debt Pay`,
            children: <Debitpay getSupplier={getSupplier} />,
        },
        {
            key: '4',
            label: `Credit Pay`,
            children: <Creditpay getSupplier={getSupplier} />,
        },
        {
            key: '5',
            label: `Estimate Purchase`,
            children: <EstimatePay getSupplier={getSupplier} />,
        },
        {
            key: '6',
            label: `Estimate Return Purchase`,
            children: <EstimateReturnPay getSupplier={getSupplier} />,
        },
        {
            key: '7',
            label: `Estimate Debt Pay`,
            children: <EstimateDebPay getSupplier={getSupplier} />,
        },
        {
            key: '8',
            label: `Estimate Credit Pay`,
            children: <EstimateCreditPay getSupplier={getSupplier} />,
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