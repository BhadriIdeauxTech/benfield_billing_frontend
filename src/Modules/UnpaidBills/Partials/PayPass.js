import { Col, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Flex from '../../../Components/Flex';
import Input from '../../../Components/Form/Input';
import { Row } from '../../../Components/Row';
import Button from '../../../Components/Form/Button';
import request from '../../../utils/request';
import { toast } from 'react-toastify';

const PayPassForm = ({ purchaseData, handleUnpaid, checkedGST }) => {
  const [form] = Form.useForm();
  const [passdata, setpassdata] = useState([]);

  const onFinish = (values) => {
    const record = { ...values };
    let result = {
      purchase: record.id,
    };
    Addproduct(result, record.id); // Pass the 'id' parameter to the 'Addproduct' function
  };

  const onFinishFailed = (errorInfo) => {
    toast.warn("Please fill in all the required details !");
  };

  const Addproduct = (values, id) => {
    if (checkedGST) {
      request.get(`payment/cheque_pass_sale_new/${id}/`, values)
        .then(function (response) {
          toast.success('Successfully');
          if (handleUnpaid) {
            handleUnpaid();
          }
          form.resetFields();
          setpassdata([]);
        })
        .catch(function (error) {
          console.log(error);
          toast.error('Failed');
        });
    }
    else {
      request.get(`payment/cheque_pass_sale/${id}/`, values)
        .then(function (response) {
          toast.success('Successfully');
          if (handleUnpaid) {
            handleUnpaid();
          }
          form.resetFields();
          setpassdata([]);
        })
        .catch(function (error) {
          console.log(error);
          toast.error('Failed');
        });
    }

  };

  useEffect(() => {
    form.setFieldsValue(purchaseData);
  }, [purchaseData]);

  const onReset = () => {
    form.resetFields();
    if (handleUnpaid) {
      handleUnpaid();
    }
  }
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
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row gutter={[24, 24]}>
          <Col span={24} md={24}>
            <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              Are You Sure to Pass Cheque
            </h3>
          </Col>

          <Col span={24} md={12}>
            <Input name={'id'} display={'none'} />
          </Col>
        </Row>
        <Flex center gap={'20px'} style={{ margin: '20px 0px' }}>
          <Button.Primary text={'Ok'} htmlType={'submit'} />
          <Button.Danger text={'Cancel'} onClick={() => onReset()} />
        </Flex>
      </Form>
    </div>
  );
};

export default PayPassForm;