import { Card, Col, Form } from 'antd'
import React, { Fragment, useEffect } from 'react'
import { Row } from '../../../Components/Row'
import { CustomInputNumber } from '../../../Components/Form/CustomInputNumber'
import Checkbox from '../../../Components/Form/Checkbox'
import Flex from '../../../Components/Flex'
import { useState } from 'react'
import { Select } from '../../../Components/Form/Select'
import { InputNumber } from '../../../Components/Form/InputNumber'

export const SalesFormFooter = (props) => {

    const { BalanceOnChange, payType,setPayType,HandleCheQueChage, setRoundDecimalValue, RoundOffChecked, footerCalData, tableFooterData } = props;

    // const handleSelectChange = (value) => {
    //     if (value === 'Cheque' || value === 'Credit') {
    //         setDisRoundOff(true)
    //     }
    //     else {
    //         setDisRoundOff(true)                     

    //     }
      
    //     setPayType(value);
    //     HandleCheQueChage(value);
        
    // }

    // useEffect(() => {
    //     if (payType === 'Cheque'|| payType === 'Credit') {
    //         setDisRoundOff(true)
    //     }
    //     else {
    //         setDisRoundOff(false)
            
    //     }
    // }, [payType])

    const handleRoundChecked = (e) => {
        RoundOffChecked(e.target.checked)
        const num = tableFooterData?.grand_total;
        const newInteger = parseInt(num);
        const newDecimal = (num - newInteger).toFixed(2).substr(1);
        setRoundDecimalValue(newDecimal);
    }

    const optionted = [

        { label: 'Cash', value: 'Cash' },
        { label: 'Cheque', value: 'Cheque' },
        { label: 'Credit', value: 'Credit' },
        { label: 'UPI', value: 'UPI' },
    ]

    const HandleOnchange = (val) => {
        BalanceOnChange(val)
    }


    return (
        <Fragment>
            <Row gutter={[12, 12]} >
                <Col xl={10} md={12} span={24}>
                    <Row gutter={[12, 12]} style={{ backgroundColor: 'white', borderRadius: '6px' }}>
                        <Col span={24} lg={20} >
                            <Select options={optionted} label={'Payment type '} placeholder={'Select Payement Type'}
                                name={'payment_type'} rules={[
                                    {
                                        required: true,
                                        message: 'Select the payment type !'
                                    }
                                ]} /></Col>
                      
                        <Col span={24} lg={20} >
                            {payType === 'Cheque' && (
                                <div>
                                    <CustomInputNumber label={'Ref No.'} precision={0} placeholder={'Reference Number'} name={'reference_no'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Enter the Ref no!'
                                            }
                                        ]} />
                                </div>
                            )}
                            {payType === 'Credit' && (
                                <div>
                                    <InputNumber label={'Credit Period'} placeholder={'No of days'} name={'credit_period'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Enter the Ref no!'
                                            }
                                        ]} />
                                </div>
                            )}
                        </Col>
                    </Row>
                </Col>
                <Col xl={4} md={0} span={0}></Col>
                <Col xl={10} md={12} span={24}>
                    <Card>
                        <Row gutter={[12, 12]}>
                            <Col span={24} lg={12}>
                                <CustomInputNumber precision={2}
                                    label={'Total Quantity'}
                                    name={'qty_total'}
                                    placed={'end'}
                                    disabled
                                />
                            </Col>
                            <Col span={24} lg={12}>
                                <CustomInputNumber precision={2}
                                    label={'Total Discount'}
                                    name={'discount_total'}
                                    placed={'end'}
                                    disabled
                                />
                            </Col>
                            <Col span={24} lg={12}>
                                <CustomInputNumber precision={2}
                                    label={'Total Tax'}
                                    name={'tax_total'}
                                    placed={'end'}
                                    disabled
                                />
                            </Col>
                            <Col span={24} lg={12}>
                                <CustomInputNumber precision={2}
                                    label={'Total '}
                                    name={'sub_total'}
                                    placed={'end'}
                                    disabled
                                />
                            </Col>
                     
                        </Row>
                    </Card>
                </Col>

                <Col lg={8} md={12} span={24}>
                    <Row gutter={[12, 12]} style={{ backgroundColor: 'white', padding: '15px', borderRadius: '6px' }}>
                        <Col span={24}>
                            <CustomInputNumber precision={2}
                                label={'Old Balance'}
                                name={'old_balance'}
                                // placed={'end'}
                                disabled
                            />
                        </Col>
                        {/* <Col span={24} lg={20}>
                            <CustomInputNumber precision={2}
                                label={'Advanced Amount'}
                                name={'advanced_amt'}
                                // placed={'end'}
                                disabled
                            />
                        </Col> */}
                    </Row>
                </Col>

                <Col lg={16} span={24}>
                    <Row gutter={[12, 12]}>
                        <Col span={24}>
                            <Row gutter={[12, 12]}>
                                <Col sm={12} span={24} style={{
                                    display: 'flex',
                                    alignItems: 'end',
                                }}>
                                    <Row gutter={[12, 12]}>
                                        <Col lg={14} span={12}>
                                            <Checkbox label={'Round Off'} onChange={handleRoundChecked}
                                                name={'round_off'} />
                                        </Col>

                                        <Col lg={10} span={12}>
                                            <CustomInputNumber precision={2} name={'round_off_value'} placed={'end'} disabled />
                                        </Col>
                                    </Row>
                                </Col>

                                <Col sm={12} span={24}>
                                    <CustomInputNumber precision={2} name={'grand_total'} label={'Total'} placed={'end'} disabled />
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24}>
                            <Row gutter={[12, 12]}>
                                <Col sm={6} span={0}></Col>

                                {/* <Col sm={6} span={6} style={{ display: 'flex', width: '100%', alignItems: 'center', }}>
                                    <Row gutter={[12, 12]}>
                                        <Col span={12}>
                                        </Col>
                                        <Col span={12}>
                                            <Checkbox name={'recevied_status'} disabled={disRoundOff} onChange={balanceCheck} />
                                        </Col>
                                    </Row>
                                </Col> */}
                                <Col md={12} span={18}>
                                {payType === 'Credit' || payType === 'Cheque' ?
                                    <CustomInputNumber
                                        precision={2}
                                        name={'received_amt'}
                                        label={'Received'}
                                        placed={'end'}
                                        onChange={(val) => HandleOnchange(val)}
                                        disabled
                                    />:
                                    <CustomInputNumber
                                        precision={2}
                                        name={'received_amt'}
                                        label={'Received'}
                                        placed={'end'}
                                        onChange={(val) => HandleOnchange(val)}
                                        
                                    />}
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
                                        </Col>
                                    </Row>
                                </Col>
                                {payType === 'Credit' || payType === 'Cheque' ? (
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