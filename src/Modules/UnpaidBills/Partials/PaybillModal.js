import React, { useEffect } from 'react'
import { Row } from '../../../Components/Row'
import Input from '../../../Components/Form/Input'
import { Col, Form } from 'antd'
import { InputNumber } from '../../../Components/Form/InputNumber'
import { CustomDatePicker } from '../../../Components/Form/CustomDatePicker'
import Flex from '../../../Components/Flex'
import Button from '../../../Components/Form/Button'
import { CustomInputNumber } from '../../../Components/Form/CustomInputNumber'
import { useState } from 'react'
import dayjs from 'dayjs'
import request from '../../../utils/request'
import { toast } from 'react-toastify'
import { Select } from '../../../Components/Form/Select'
import { useDispatch } from "react-redux";
import { Notification } from "../../../Layout/partials/NavHeader/actions";


const PaybillModal = ({ trigger, suppilerData, SetChecked, checkedGST, handleUnpaid, tabledata, onSelectPaymentType, }) => {

  const [formData, setFormData] = useState({})
  const dispatch = useDispatch()
  const [paymentshow, setPaymentshow] = useState(false)

  const [form] = Form.useForm();
  const URL = 'sales/unpaid_bill_sale/';

  const [selectedSupplier, setSelectedSupplier] = useState();
  const [show, setShow] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [balanceAmount, setBalanceAmount] = useState(0);
  const [disablePayment, setdisablePayment] = useState(false)

  const handleOnChange = (date) => {
    setSelectedDate(date);
  };

  const handleShow = () => {
    setShow(!show);
  };

  const handleShowPay = () => {
    setPaymentshow(true)
  }

  const paymentOptions = [
    {
      label: 'Cash',
      value: 'Cash'
    },
    {
      label: 'UPI',
      value: 'UPI',
    },
    {
      label: 'Cheque',
      value: 'Cheque'
    },
  ]

  const onFinish = (values) => {
    const record = { ...values };
    const result = {
      sales: record.id,
      supplier_name: record.supplier_name,
      payment_date: record.selected_date,
      bill_date: record.invoice_date,
      mobile_number: record.mobile_number,
      purchase_invoice_no: record.purchase_invoice_no,
      grand_total: record.grand_total,
      balance_amt: record.balance,
      payment_type: record.selected_payment_type,
      // extend_credit_period: record.extend_period || 0,
      extend_credit_period: record.extend_period,
      paying_debt_amt: record.payment,
      cheque_no: record.cheque_no
    };

    if (checkedGST) {
      AddsaleunpaidNonGST(result);
    }
    else {
      Addsaleunpaid(result);
    }
    const selectedPaymentType = values.select_payment_type; // Get the selected payment type
    onSelectPaymentType(selectedPaymentType); // Pass it back to the parent component
    handleUnpaid(); // Update the table data

  };

  const onFinishFailed = (errorInfo) => {
    toast.warn("Please fill in all the required details !");
  };

  const Addsaleunpaid = (values) => {
    request.post(`payment/add_credit_pay_sale/`, values)
      .then(function (response) {
        console.log(response);
        toast.success('Successfully');
        SetChecked(false);
        dispatch(Notification());
        // form.resetFields();
        if (handleUnpaid) {
          handleUnpaid();
          form.resetFields();
        }
      })
      .catch(function (error) {
        console.log(error);
        toast.error('Failed');
      });


  };

  useEffect(() => {
    if (trigger) {
      form.setFieldsValue({ payment: "" })
      form.setFieldsValue(suppilerData)
      form.setFieldsValue({ selected_payment_type: "Cash" })
      form.setFieldsValue({ cheque_no: '' })
      setPaymentType("Cash")
    }
  }, [trigger])




  const AddsaleunpaidNonGST = (values) => {
    console.log(values, 'colin');

    request.post(`payment/add_credit_pay_sale_new/`, values)
      .then(function (response) {
        console.log(response);
        toast.success('Successfully');
        SetChecked(false)
        // form.resetFields();
        if (handleUnpaid) {
          handleUnpaid();
          form.resetFields();
        }
      })
      .catch(function (error) {
        console.log(error);
        toast.error('Failed');
      });
  };


  const handlePaymentAmountChange = (value) => {

    let Bal = suppilerData?.balance
    const newPaymentAmount = Number(value);

    let RecBal = Bal - newPaymentAmount;
    
    setPaymentAmount(RecBal.toFixed(2));
    setBalanceAmount(Bal);


    setIsSubmitDisabled(RecBal < 0 || newPaymentAmount === 0);
  };

  const [paymentType, setPaymentType] = useState('Select');

  const handlePaymentTypeChange = (value) => {
    setPaymentType(value)
    if (value === 'Cheque') {
      setdisablePayment(true)
      form.setFieldsValue({ payment: "0.00" })
      form.setFieldsValue({ balance: formData?.balance })
      setIsSubmitDisabled(false)

    } else if (value === 'Cash') {
      setdisablePayment(false)
      form.setFieldsValue({ payment: "" })
      form.setFieldsValue({ balance: formData?.balance })

    }
  };

  useEffect(() => {
    if (form.getFieldsValue('payment' === 'Cash')) {
      form.setFieldsValue({ payment: "" })
      setdisablePayment(false)
    }
  }, [trigger]);

  useEffect(() => {
    setFormData(suppilerData)
    // form.setFieldsValue({ payment: 0 })

  }, [suppilerData])

  useEffect(() => {
    form.setFieldsValue(formData);
  }, [formData])


  useEffect(() => {
    form.setFieldsValue({ balance: paymentAmount })
  }, [paymentAmount])


  // ============= Credit field extent ==========

  const [recordData, setRecordData] = useState({ payment_type: '' });

  const handlePaymentTypeChangeDefault = (value) => {
    setRecordData({ ...recordData, payment_type: value });
  };

  return (
    <div>
      <Form
        form={form}
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        initialValues={{
          selected_date: dayjs(),
          selected_payment_type: 'Cash'
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row gutter={[24, 24]}>
          <Col span={24} md={12}>
            <Input label={'Customer Name'} disabled name={'customer_name'} placeholder={'Customer Name'} />
          </Col>

          <Col span={24} md={12}>
            <CustomDatePicker label={'Date'} name={'selected_date'} placeholder={'Select'} onChange={handleOnChange} />
          </Col>

          <Col span={24} md={12}>
            <Input label={'Bill Date'} disabled name={'invoice_date'} placeholder={'Date'} />
          </Col>

          <Col span={24} md={12}>
            <InputNumber label={'Mobile Number'} disabled name={'mobile_number'} placeholder={'Mobile Number'} />
          </Col>

          <Col span={24} md={12}>
            <InputNumber label={'Bill No'} disabled name={'invoice_no'} placeholder={'Bill No'} />
          </Col>

          <Col span={24} md={12}>
            <CustomInputNumber label={'Bill Amount'} disabled precision={2} name={'grand_total'} placeholder={'Bill Amount'} />
          </Col>

          <Col span={24} md={12}>

            <Input label={'Balance Amount'} name={'balance'} disabled />

            <Input name={'id'} display={'none'} />
          </Col>

          {formData?.cheque_field ? (
            <Col span={24} md={12}>
              <CustomInputNumber
                precision={2}
                label={'Payment'}
                name={'payment'}
                disabled
                placeholder={'Amount'}
                onChange={handlePaymentAmountChange}
              />
            </Col>
          ) :
            <Col span={24} md={12}>
              <CustomInputNumber
                // precision={2}
                label={'Payment'}
                name={'payment'}
                placeholder={'Amount'}

                rules={[
                  {
                    required: true,
                    message: 'Please Enter the Payment Amount!',
                  },
                  // {
                  //   min: 1,
                  //   message: 'Enter payment',
                  // }
                ]}
                disabled={disablePayment}
                onChange={handlePaymentAmountChange}
              />
            </Col>}



          <Col span={24} md={12}>

            <Select
              label={'Payment Type'}
              options={paymentOptions}
              name={'selected_payment_type'}
              value={tabledata}
              onChange={handlePaymentTypeChange}
            />
          </Col>


          {paymentType === 'Cheque' && (
            <Col span={24} md={12}>
              <InputNumber label={'Ref.No'} name={'cheque_no'} placeholder={'Ref.No'}
                rules={[
                  {
                    required: true,
                    message: 'Please Enter Ref.No!',
                  },
                ]} />
            </Col>
          )
          }


          <Input
            label={'Payment Type'}
            display={'none'}
            name={'payment_type'}
            value={recordData.payment_type}
            onChange={(value) => handlePaymentTypeChangeDefault(value)}
          />




          {/* {formData?.cheque_field && (
            <>
              <Col span={24} md={12}>
                <Input
                  label={'Old Extend Period'}
                  disabled
                  name={'calculated_credit_period'}
                  placeholder={'Extend Period'} />
              </Col>
              <Col span={24} md={12}>
                <Input
                  label={'Add Extend Period'}
                  name={'extend_period'}
                  placeholder={'Add Extend Period'}
                  
                />
              </Col>
            </>
          )} */}

        </Row>
        <Flex center gap={'20px'} style={{ margin: '20px 0px' }}>
          <Button.Primary text={'Submit'} htmlType={'submit'} disabled={isSubmitDisabled} />
          {/* <Button.Danger text={'Cancel'} onClick={()=>reset()} /> */}
        </Flex>
      </Form>
    </div>
  );
};

export default PaybillModal;