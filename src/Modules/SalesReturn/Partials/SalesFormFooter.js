import { Card, Col, Form } from 'antd'
import React, { Fragment } from 'react'
import { Row } from '../../../Components/Row'
import { CustomInputNumber } from '../../../Components/Form/CustomInputNumber'
import Checkbox from '../../../Components/Form/Checkbox'
import Flex from '../../../Components/Flex'
import { useState } from 'react'
import { Select } from '../../../Components/Form/Select'
import { useEffect } from 'react'

export const SalesFormFooter = ({ BalanceOnChange,payType,setPayType, TotalBalance, HandleCheQueChage,setRoundDecimalValue, RoundOffChecked, round, footerCalData, setSaleorder, tableSecondaryData }) => {
    

    const [disRoundOff, setDisRoundOff] = useState(false)

const [ischeck,setIscheck]= useState(false)

    const handleSelectChange = (value) => {
        if (value === 'Cheque') {
            setDisRoundOff(true)
            TotalBalance();
        }
        else{
            setDisRoundOff(false)
           
        }
        setPayType(value);
        // TotalBalance();
        HandleCheQueChage(value);
    }

    useEffect(() => {
        if (payType === 'Cheque') {
            setDisRoundOff(true)
        }
        else {
            setDisRoundOff(false)
        }
    }, [payType])

    const handleRoundChecked = (e) => {
        RoundOffChecked(e.target.checked)
        const num = tableSecondaryData[0].total_amount;
        const newInteger = parseInt(num);
        const newDecimal = (num - newInteger).toFixed(2).substr(1);
        setRoundDecimalValue(newDecimal);
    }

    const balanceCheck = (e) => {
        TotalBalance(e.target.checked)
        // setIscheck(!ischeck)
    }

    const Cheque = [

        { label: 'Cash', value: 'Cash' },
        { label: 'Cheque', value: 'Cheque' },
        { label: 'UPI', value: 'UPI' },
    ]

    const HandleOnchange = (val) => {
        BalanceOnChange(val)
    }

    return (
        <Fragment>
            <Row gutter={[24, 24]} >
                <Col lg={10} md={12} span={24}>
                    <Row gutter={[12, 12]} style={{ backgroundColor: 'white', padding: '15px', borderRadius: '6px' }}>
                        <Col span={24} md={20} >
                            <Select options={Cheque} label={'Payment type '} placeholder={'Select Payement Type'} onChange={handleSelectChange} name={'supplier_pay_type'} rules={[
                                {
                                    required: true,
                                    message: 'Select the payment type !'
                                }
                            ]} /></Col>
                        <Col span={24} md={20} >
                            {/* Supplier Advanced Payment */}
                            {payType === 'Cheque' && (
                                <div>
                                    <CustomInputNumber label={'Ref No.'} placeholder={'Reference Number'} name={'refno'} rules={[
                                        {
                                            required: true,
                                            message: 'Enter the Ref no!'
                                        }
                                    ]} />
                                </div>
                            )}
                        </Col>
                        {/* Supplier Credit Payment */}
                        <Col span={24} md={24}></Col>
                    </Row>
                </Col>

                <Col lg={4} md={0} span={0}></Col>

                <Col lg={10} md={12} span={24}>
                    <Card>
                        <Row gutter={[12, 12]}>
                            <Col span={24} lg={12}>
                                <CustomInputNumber precision={2}
                                    label={'Total Quantity'}
                                    name={'total_qty'}
                                    placed={'end'}
                                    disabled
                                />
                            </Col>
                            <Col span={24} lg={12}>
                                <CustomInputNumber precision={2}
                                    label={'Total Discount'}
                                    name={'total_discount'}
                                    placed={'end'}
                                    disabled
                                />
                            </Col>
                            <Col span={24} lg={12}>
                                <CustomInputNumber precision={2}
                                    label={'Total Tax'}
                                    name={'total_tax'}
                                    placed={'end'}
                                    disabled
                                />
                            </Col>
                            <Col span={24} lg={12}>
                                <CustomInputNumber precision={2}
                                    label={'Total Amount'}
                                    name={'total_amount'}
                                    placed={'end'}
                                    disabled
                                />
                            </Col>
                        </Row>
                    </Card>
                </Col>

                <Col lg={10} md={10} span={24}>
                    <Row gutter={[12, 12]} style={{ backgroundColor: 'white', padding: '15px', borderRadius: '6px' }}>                      
                    
                        <Col span={24} lg={20}>
                            <CustomInputNumber precision={2}
                                label={'Cutomer Debit'}
                                name={'customer_debit'}
                                // placed={'end'}
                                disabled
                            />
                        </Col>                      
                    </Row>
                </Col>

                <Col lg={14} md={20} span={24}>
                    <Row gutter={[12, 12]}>
                        <Col span={24}>
                            <Row gutter={[12, 12]}>
                                <Col sm={12} span={24} style={{
                                    display: 'flex',
                                    alignItems: 'end',
                                }}>
                                    <Row gutter={[12, 12]}>
                                        <Col lg={16} span={12}>
                                            <Checkbox label={'Round Off'} name={'round_status'}  onChange={handleRoundChecked} />
                                        </Col>

                                        <Col lg={8} span={12}>
                                            <CustomInputNumber precision={2} name={'round_off'} placed={'end'} disabled />
                                        </Col>
                                    </Row>
                                </Col>

                                <Col sm={12} span={24}>
                                    <CustomInputNumber precision={2} name={'roundoff_amount'} label={'Total'} placed={'end'} disabled />
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24}>
                            <Row gutter={[12, 12]}>
                                <Col sm={6} span={0}></Col>

                                <Col sm={6} span={6} style={{ display: 'flex', width: '100%', alignItems: 'center', }}>
                                    <Row gutter={[12, 12]}>
                                        <Col span={12}>
                                        </Col>

                                            <Col span={12}>
                                                <Checkbox name={'paid'} disabled={disRoundOff} onChange={balanceCheck} />
                                            </Col>
                                    </Row>
                                </Col>

                                { payType === 'Cheque' ? (
                                    <Col md={12} span={18}>
                                        <CustomInputNumber
                                            precision={2}
                                            name={'received'}
                                            label={'Paid'}
                                            placed={'end'}
                                            onChange={(val) => HandleOnchange(val)}
                                            disabled
                                        />
                                    </Col>
                                ) : (
                                    <Col md={12} span={18}>
                                        <CustomInputNumber
                                            precision={2}
                                            name={'received'}
                                            label={'Paid'}
                                            placed={'end'}
                                            onChange={(val) => HandleOnchange(val)}
                                        />
                                    </Col>
                                )}
                            </Row>
                        </Col>
                        <Col span={24}>
                            <Row gutter={[12, 12]}>
                                <Col sm={12} span={0}></Col>

                                { payType === 'Cheque' ? (
                                     <Col md={12} span={18}>
                                   <CustomInputNumber
                                        precision={2}
                                        name={'balance'}
                                        label={'Balance'}
                                        placed={'end'}
                                        disabled
                                
                                    />
                                     </Col>
                                    
                                ) : (
                                    <Col md={12} span={18}>
                                        <CustomInputNumber
                                            precision={2}
                                            name={'balance'}
                                            label={'Balance'}
                                            placed={'end'}
                                            disabled
                                        />
                                    </Col>
                                )}
                            </Row>
                        </Col>
                    </Row>
                </Col >
            </Row >
            <Flex flexEnd gap={'10px'}>


            </Flex>
        </Fragment>
    )
}

