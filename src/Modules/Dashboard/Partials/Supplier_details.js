import React, { useEffect } from 'react'
import Flex from '../../../Components/Flex'
import { Box, Card,CardWrapper } from './style'
import { FormTitle } from '../../../Components/Form/FormTitle'
import { useState } from 'react'

const Supplier_details = ({ getDash }) => {


    const [dashSupplierData, setDashSupplierData] = useState([])

    useEffect(() => {
        setDashSupplierData(getDash?.supplier_dbt)
    }, [getDash])
    
    return (
        <div>
            <Card>
                <FormTitle Title={'Supplier Debt'}/>

                <CardWrapper>
                    {dashSupplierData?.map(({ supplier, mobile_no,dbt_amt }, i) => {
                        return (
                            <div style={{ padding: '10px 0px' }} key={i}>
                                <Box>
                                    <Flex centerVertically spaceBetween>
                                        <div><h1>{supplier}</h1>
                                            <h3>{mobile_no}</h3></div>
                                        <div>
                                            <p>{dbt_amt}</p>
                                        </div>
                                    </Flex>
                                </Box>
                            </div>
                        )
                    })}
                </CardWrapper>
            </Card>
        </div>

    )
}

export default Supplier_details