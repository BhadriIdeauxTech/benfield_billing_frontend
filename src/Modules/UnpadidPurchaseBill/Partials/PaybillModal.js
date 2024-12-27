import React from 'react'
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
import { useEffect } from 'react'
import request from '../../../utils/request'
import { toast } from 'react-toastify'
import { Select } from '../../../Components/Form/Select'


const PaybillModal = ({ trigger,purchaseData, SetChecked, handleUnpaid, checkedGST }) => {

  const [form] = Form.useForm();
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({})
  const [passdata, setpassdata] = useState([]);
  // const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [balanceAmount, setBalanceAmount] = useState(0);
  const [disablePayment, setdisablePayment] = useState(false)

  const [paymentType, setPaymentType] = useState('Select');

  const handleOnChange = (selectedDate) => {
    setSelectedDate(selectedDate);
  };

  const handleShow = () => {
    setShow(!show);
  };

  const [totalAmount, setTotalAmount] = useState(null);

  useEffect(() => {
    form.setFieldsValue(purchaseData);
    setTotalAmount(purchaseData?.grand_total); // Assuming grand_total exists in purchaseData
  }, [form, purchaseData]);

  const handlePayingAmountChange = (value, record) => {
    if (record && record.grand_total) {
      const balance_amount = record.grand_total - value;
      form.setFieldsValue({ balance_amount });
    }
  };

  useEffect(() => {
    if(trigger){
      form.setFieldsValue({ Payment: "" })
      form.setFieldsValue(purchaseData)
      form.setFieldsValue({selected_payment_type: 'Cash'});
      form.setFieldsValue({cheque_no: ''});
      setPaymentType('Cash')
      setdisablePayment(false)
    }
  }, [trigger])
  


  // ==== balance new ===========================


  const handlePaymentAmountChange = (value) => {

    let Bal = purchaseData?.balance_amount_new
    const newPaymentAmount = Number(value);
    let RecBal = Bal - newPaymentAmount;
    setPaymentAmount(RecBal.toFixed(2));
    setBalanceAmount(Bal);
    setIsSubmitDisabled(RecBal < 0 || newPaymentAmount === 0);
  };

  useEffect(() => {
    setFormData(purchaseData)
  }, [purchaseData])


  useEffect(() => {
    form.setFieldsValue(formData);
    form.setFieldsValue({ purchase_date: dayjs(formData?.purchase_date).format('YYYY-MM-DD') });
  }, [formData])


  useEffect(() => {
    form.setFieldsValue({ balance_amount_new: paymentAmount })
  }, [paymentAmount])


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


    const record = { ...values, selected_date: selectedDate };
    const result = {

      supplier_name: record.supplier_name,
      payment_date: record.selected_date,
      bill_date: record.purchase_date,
      mobile_number: record.mobile_number,
      bill_number: record.purchase_invoice_no,
      bill_amt: record.grand_total,
      balance_amt: record.balance_amount_new,
      payment_type: record.selected_payment_type,
      paying_debt_amt: record.Payment,
      purchase: record.id,
      cheque_no: record.cheque_no,
    };

    if (checkedGST) {
      AddsaleunpaidNonGST(result);
    }
    else {
      Addproduct(result);
    }
  };

  const onFinishFailed = (errorInfo) => {
    toast.warn("Please fill in all the required details !");
  };

  const Addproduct = (values) => {
    request.post(`pay/add_debit_pay_purchase/`, values)
      .then(function (response) {
        toast.success('Successfully');
        SetChecked(false)
        setPaymentType(false)
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

  const AddsaleunpaidNonGST = (values) => {
    request.post(`pay/add_debit_pay_purchase_nongst/`, values)
      .then(function (response) {
        console.log(response);
        toast.success('Successfully');
        SetChecked(false)
        setPaymentType(false)
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

  const handlePaymentTypeChange = (value) => {
    setPaymentType(value)
    if (value === 'Cheque') {
      setdisablePayment(true)
      form.setFieldsValue({ Payment: "0.00" })
      form.setFieldsValue({ balance_amount_new: formData?.balance_amount_new })
      setIsSubmitDisabled(false)
    } else {
      setdisablePayment(false)
      form.setFieldsValue({ Payment: "" })
      form.setFieldsValue({ balance_amount_new: formData?.balance_amount_new })
    }
  }
 

  return (
    <Form
      form={form}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      initialValues={{
        selected_date: dayjs(),
        selected_payment_type: 'Cash',
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Row gutter={[24, 24]}>
        <Col span={24} md={12}>
          <Input label={'Supplier Name'} disabled name={'supplier_name'} placeholder={'Supplier Name'} />
        </Col>

        <Col span={24} md={12}>
          <CustomDatePicker label={'Date'} name={'selected_date'} placeholder={'Select'} onChange={handleOnChange} />
        </Col>

        <Col span={24} md={12}>
          <Input label={'Bill Date'} disabled name={'purchase_date'} format="DD\\MM\\YYYY" placeholder={'Date'} />
        </Col>

        <Col span={24} md={12}>
          <InputNumber label={'Mobile Number'} disabled name={'mobile_number'} placeholder={'Mobile Number'} />
        </Col>

        <Col span={24} md={12}>
          <InputNumber label={'Bill No'} disabled name={'purchase_invoice_no'} placeholder={'Bill No'} />
        </Col>

        <Col span={24} md={12}>
          {/* <CustomInputNumber label={'Bill Amount'} disabled precision={2} name={'grand_total'} placeholder={'Bill Amount'} /> */}
          <Form.Item label="Total Amount" name="grand_total">
            <Input value={totalAmount} disabled />
          </Form.Item>

        </Col>

        <Col span={24} md={12}>
          <Form.Item label="Balance Amount" name="balance_amount_new">
            <Input disabled />
          </Form.Item>
        </Col>

        <Input name={'id'} display={'none'} />

        <Col span={24} md={12}>
          <CustomInputNumber
            precision={2}
            label={'Payment'}
            name={'Payment'}
            placeholder={'Amount'}
            rules={[
              {
                required: true,
                message: 'Please Enter the Payment Amount!',
              },
            ]}
            disabled={disablePayment}
            onChange={handlePaymentAmountChange} />
        </Col>

        <Col span={24} md={12}>
          <Select
            label={'Payment Type'}
            options={paymentOptions}
            name={'selected_payment_type'}
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
      </Row><br />

      <Flex center gap={'20px'}>
        <Button.Primary htmlType="submit" text="Submit" disabled={isSubmitDisabled} />
      </Flex>
    </Form>
  );

};

export default PaybillModal;