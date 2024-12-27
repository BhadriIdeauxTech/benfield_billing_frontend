import React from 'react'
import { TopTitle } from '../../../../Components/Form/TopTitle'
import { Table } from '../../../../Components/Table'
import Flex from '../../../../Components/Flex'
import Button from '../../../../Components/Form/Button'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Switch from '../../../../Components/Form/Switch'
import { Row } from '../../../../Components/Row'
import { Col } from 'antd'
import request from '../../../../utils/request'
import { useEffect } from 'react'
import dayjs from 'dayjs'

export const PendingEntrys = ({ productsForTable, taxType }) => {

  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([])
  const [gstPurchase, setGstPurchase] = useState([])
  const [nongstPurchase, setNongstPurchase] = useState([])
  const [checked, setChecked] = useState(true)

  useEffect(() => {

    if (checked) {
      request.get('outer/outer_sale_purchase/')
        .then(resp => {
          setGstPurchase(resp.data.outer)
        })
        .catch(error => console.log(error, 'ERRORRRRRRRRRRRRR'))
    } else {
      request.get('outer/outer_sale_purchase_new/')
        .then(resp => {
          setNongstPurchase(resp.data.outer)
        })
        .catch(error => console.log(error, 'ERRORRRRRRRRRRRRR'))
    }

  }, [checked])


  const columns = [
    {
      title: 'S.No',
      render: (value, item, index) => index + 1,
    },
    {
      title: 'Sales Bill No',
      dataIndex: 'sale_invoice_no'
    }, {
      title: 'Total Quantity',
      dataIndex: 'total_qty'
    },
    {
      title: 'Date',
      dataIndex: 'created_at',
      render: (date) => {
        return dayjs(date).format('DD\\MM\\YYYY');
      },
    }, {
      title: 'Action',
      render: (record) => {
        // console.log(record, "record")
        return (
          <>
            <Flex spaceEvenly>
              <Button.Success
                text={'Entry'} onClick={() => change(record.id, record.tax_type)} />
            </Flex>
          </>
        )
      }
    },
  ]


  const change = (id, tax) => {
    let toMain;
    request.post(`purchase/outer_purchase_supplier_list_item_detail/${id}/`)
      .then(resp => {
        toMain = resp.data
        productsForTable(toMain)
        if (tax === 'NOGST') {
          navigate(`/PendingEntryEstimate/${id}`)
        } else {
          navigate(`/MainPurchase/${id}`)
        }
      })
      .catch(error => console.log(error, 'error'))

  }



  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
    setChecked(checked)
  };

  return (
    <div>
      <Row gutter={[24, 24]}>
        <Col span={24} md={20}>
          <TopTitle Heading={'Outer Purchase to Purchase Entry'} />
        </Col>
        <Col span={24} md={4} style={{ marginTop: '20px' }} >
          <Flex centerVertically>
           <span style={{fontWeight:'bold'}}>OFF</span>  &nbsp;
           <Switch defaultChecked={true} onChange={onChange} />&nbsp;<span style={{fontWeight:'bold'}}>ON</span> 
          </Flex>
        </Col>
      </Row>

      <Table columns={columns} data={checked ? gstPurchase : nongstPurchase} />

    </div>
  )
}

