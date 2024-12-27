import React, { useEffect, useState } from 'react'
import { TopTitle } from '../../../Components/Form/TopTitle'
import { Table } from '../../../Components/Table'
import { Col, Form } from 'antd'
import { CustomDatePicker } from '../../../Components/Form/CustomDatePicker'
import dayjs from 'dayjs'
import { Row } from '../../../Components/Row'
import Button from '../../../Components/Form/Button'
import { OverHid } from './Style'
import CardPayment from './CardPayment'
import request from '../../../utils/request'
import { toast } from 'react-toastify'

const Daybook = ({ setDaybook, getDaybook }) => {

  const URLS = 'report/daybook/'

  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [selectedDateData, setSelectedDateData] = useState([]);
  const[passdata,setPassdata] = useState([])
  const [selectedSupplier, setSelectedSupplier] = useState({})
  const [dataSource, setDataSource] = useState([]);

  const URL = 'report/daybook/'

  const [form] = Form.useForm();

  const onFinish = (values) => {
    const NewValue = { ...values, start_date: selectedDate }
    Daybookasx(NewValue)
    Daybookasm(NewValue)
    
  };

  const onFinishFailed = (errorInfo) => {
    toast.warn("Please fill in all the required details !");
  };

  const Daybookasx = (values) => {
    request.post(`${URL}`, values)
      .then(function (response) {
        setDataSource(response.data?.day_book)
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const Daybookasm = (values) => {
    request.post(`${URL}`, values)
      .then(function (response) {
        setPassdata(response.data?.transactions)
        setSelectedSupplier(response.data?.transactions)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    GetDaybook();
    GetDaybooks();
  }, [])

  const GetDaybook = (values) => {
    request.get(`${URLS}`, values)
      .then(function (response) {
        setDataSource(response.data?.day_book)
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const GetDaybooks = (values) => {
    request.get(`${URLS}`, values)
      .then(function (response) {
        setPassdata(response.data?.transactions)
        setSelectedSupplier(response.data?.transactions)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    setDataSource(dataSource)
  }, [dataSource])

  const handleOnChange = (date) => {
    setSelectedDate(date);
  };

  const columns = [
    {
      title: 'S.No',
      render: (value, item, index) => index + 1,
    },
    {
      title: 'Date',
      dataIndex: 'Date',
      render: (date) => {
        return dayjs(date).format('DD\\MM\\YYYY');
      },
    },
    {
      title: 'Bill No',
      dataIndex: 'Invoice_No'
    },
    {
      title: 'Party Name',
      dataIndex: 'Party_Name'
    },
    {
      title: 'Transactions',
      dataIndex: 'Transactions'
    },
    {
      title: 'Payment Type',
      dataIndex: 'Payment_Type'
    },
    {
      title: 'Bill Amount',
      dataIndex: 'Amount'
    },
    {
      title: 'Balance',
      dataIndex: 'Balance_Due'
    },

  ]

  return (
    <div>
      <TopTitle Heading={'Day Book'} />
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        initialValues={
          {
            start_date: dayjs()
          }
        }
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
        <Row gutter={[12, 12]}>
          {/* <Flex> */}
          <Col span={24} md={5}>
            <CustomDatePicker name={'start_date'} onChange={handleOnChange}
              rules={[{
                required: 'true',
                message: 'Enter the details !'
              }]} />
          </Col>
          <Col span={24} md={5}>
            <Button.Primary text={'Submit'} htmlType={'submit'} />
          </Col>
          {/* </Flex> */}
        </Row>
      </Form>
      <br />
      <OverHid>
        <Table columns={columns} data={dataSource} pagination={false}/>
      </OverHid>
      <br />
      <CardPayment PassData={passdata} selectedSupplier={selectedSupplier} />
    </div>
  )
}

export default Daybook