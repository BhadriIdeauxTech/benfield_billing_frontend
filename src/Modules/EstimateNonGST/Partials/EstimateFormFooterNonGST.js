
import { Card, Col } from 'antd'
import React, { Fragment } from 'react'
import { Row } from '../../../Components/Row'
import { CustomInputNumber } from '../../../Components/Form/CustomInputNumber'
import Flex from '../../../Components/Flex'



export const EstimateFormFooternongst = () => {


    return (
        <Fragment>
            <Row gutter={[24, 24]} >
                <Col lg={10} md={12} span={24}>
                </Col>

                <Col lg={4} md={0} span={0}></Col>

                <Col lg={10} md={12} span={24}>
                    <Card>
                        <Row gutter={[12, 12]}>
                            <Col span={24} lg={12}>
                                <CustomInputNumber precision={2}
                                    label={'Total Quantity'}
                                    name={'qty_total'}
                                    placed={'end'}
                                    disabled />
                            </Col>
                            <Col span={24} lg={12}>
                                <CustomInputNumber precision={2}
                                    label={'Total Discount'}
                                    name={'discount_total'}
                                    placed={'end'}
                                    disabled />
                            </Col>
                            <Col span={24} lg={12}>
                                <CustomInputNumber precision={2}
                                    label={'Total Amount'}
                                    name={'sub_total'}
                                    placed={'end'}
                                    disabled />
                            </Col>
                        </Row>
                    </Card>
                </Col>

                <Col lg={10} md={4} span={0}>
                </Col>

                <Col lg={14} md={20} span={24}>
                    <Row gutter={[12, 12]}>
                        <Col span={24}>
                            <Row gutter={[12, 12]}>
                                <Col sm={12} span={24}>
                                </Col>
                                <Col sm={12} span={24}>
                                    <CustomInputNumber precision={2} name={'grand_total'} label={'Total'} placed={'end'} disabled />
                                </Col>
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


