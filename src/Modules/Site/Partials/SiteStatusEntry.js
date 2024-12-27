import { Col, Form } from "antd";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import Flex from "../../../Components/Flex";
import Button from "../../../Components/Form/Button";
import { CustomDatePicker } from "../../../Components/Form/CustomDatePicker";
import Input from "../../../Components/Form/Input";
import { Select } from "../../../Components/Form/Select";
import { Row } from "../../../Components/Row";
import { DeleteButtonWrapper, Table } from "../../../Components/Table";
import dayjs from "dayjs";
import { TextAreas } from "../../../Components/Form/TextArea";
import { DeleteOutlined } from "@ant-design/icons";
import { InputNumber } from "../../../Components/Form/InputNumber";
import request from "../../../utils/request";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getToken } from "../../Auth/selectors";
import { CustomCard } from "../../../Components/CustomCard";
import { TopTitle } from "../../../Components/Form/TopTitle";

const SiteStatusEntry = () => {
  const [form] = Form.useForm();
  const [getdata, setGetdata] = useState([]);
  const [trigger, setTrigger] = useState(0);
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [selectedDatees, setSelectedDatees] = useState(dayjs().format('YYYY-MM-DD'));

  const UserNameDetails = useSelector(getToken);
  console.log(UserNameDetails, 'UserNameDetails');

  const ADD_SITE = 'sales/add_sites/'

  const initialData = [
    {
      key: 0,
      item: "",
      item_name: "",
      quantity: "",
      item_unit: "",
    },
  ];
  const [count, setCount] = useState(1);
  const [tableData, setTableData] = useState(initialData);

  useEffect(() => {
    form.setFieldsValue({ user_name: UserNameDetails?.username })
  }, [UserNameDetails])

  useEffect(() => {
    GetSaleCustomer();
  }, [trigger]);

  const GetSaleCustomer = () => {
    request
      .get("sales/get_detail_sale/")
      .then(function (response) {
        setGetdata(response.data.item);
        // setSale(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  
  const productOptions = getdata.map((item) => ({
    label: item.brand_name
      ? item.item_name + "-" + item.brand_name
      : item.item_name,
    value: item.item_name,
  }));

  console.log(getdata,'getdata');

  useEffect(() => {
    tableData.forEach((record) => {
      form.setFieldsValue({
        [`item_name${record.key}`]: record.item_name,
      });
      form.setFieldsValue({ [`item${record.key}`]: record.item });
      form.setFieldsValue({ [`quantity${record.key}`]: record.quantity });
      form.setFieldsValue({ [`nature${record.key}`]: record.nature });
      form.setFieldsValue({ [`item_unit${record.key}`]: record.item_unit });
    });
  }, [tableData]);

  const HandleProduct = (value, record) => {
    setTableData((prevState) => {
      const newData = [...prevState];
      const index = newData.findIndex((item) => record.key === item.key);
      const item = newData[index];

      const setSelectedSale = getdata.find((item) => item.item_name === value);

      console.log(setSelectedSale,'setSelectedSale');

      if (setSelectedSale) {
        item.item = setSelectedSale.id;
        item.item_name = setSelectedSale.item_name;
        item.nature = setSelectedSale.nature;
        // item.quantity = setSelectedSale.avilable_qty;
        item.item_unit = setSelectedSale.item_unit;
      }

      const setSelectedSalePanel = getdata.find(
        (item) => item.item_name === value
      );
      if (setSelectedSalePanel) {
        item.item_hsn = setSelectedSalePanel.item_hsn;
        item.unit = setSelectedSalePanel.item_unit;
      }

      const isItemAlreadyAdded = newData.some(
        (item, i) => i !== index && item.item_name === value
      );

      if (isItemAlreadyAdded) {
        item.item = "";
        item.item_name = "";
        item.nature = "";
        item.quantity = "";
        item.item_unit = "";
        toast.warn("Product already added in the table!");
        return newData;
      }

      item.item_name = value;

      const itemId = item.item;
      const itemName = item.item_name;

      return newData;
    });
  };

  const HandleQuantity = (value, record) => {
    setTableData((prevState) => {
      const newData = [...prevState];
      const index = newData.findIndex((item) => record.key === item.key);
      const item = newData[index];
      item.quantity = value;

      return newData;
    });
  };

  const handleOnChangeProduct = (value, record) => {
    HandleProduct(value, record);
  };
  const handleOnChangeQuantity = (value, record) => {
    HandleQuantity(value, record);
  };

  const AddRow = () => {
    const newData = {
      key: count,
      item_name: "",
      quantity: "",
      item_unit: "",
    };
    setTableData((pre) => {
      return [...pre, newData];
    });
    setCount(count + 1);
  };

  // -----------------------  Delete Row Function

  const onDelete = (key) => {
    if (tableData.length > 1) {
      const dataSource = [...tableData];
      setTableData(dataSource.filter((item) => item.key !== key));
    } else {
      console.log(`only ${tableData.length} is available`);
    }
  };

  // ==============  Add Row Component  ================

  const FooterComponent = () => {
    return (
      <div style={{ background: "var(--light-color)", padding: "20px" }}>
        <Row>
          <Col lg={4} sm={12} span={24}>
            <Button
              type="primary"
              style={{
                fontSize: "1rem",
                height: "auto",
                fontFamily: "Poppins",
                fontWeight: 500,
                letterSpacing: "1px",
              }}
              htmlType="button"
              onClick={AddRow}
            >
              Add Row
            </Button>
          </Col>
        </Row>
      </div>
    );
  };
  const columns = [
    {
      title: "#",
      render: (text, record, index) => {
        return (
          <Flex alignCenter gap={"20px"} style={{ alignItems: "center" }}>
            <h4>{index + 1}</h4>
            <DeleteButtonWrapper>
              <Button
                style={{
                  display: "flex",
                  padding: "10px",
                  height: "auto",
                  fontSize: "16px",
                }}
                htmlType="button"
                danger
                onClick={() => onDelete(record.key)}
              >
                <DeleteOutlined />
              </Button>
            </DeleteButtonWrapper>
          </Flex>
        );
      },
    },
    {
      title: "Product",
      dataIndex: "item_name",
      key: "item_name",
      render: (text, record) => {
        return (
          <>
            <Select
              rules={[
                {
                  required: true,
                  message: "This is a required field",
                },
              ]}
              minWidth={"150px"}
              showSearch
              name={`item_name${record.key}`}
              options={productOptions}
              onChange={(value) => handleOnChangeProduct(value, record)}
            />
            <Input name={`item${record.key}`} display={'none'} />
          </>
        );
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => {
        return (
          <>
            <InputNumber
              precision={2}
              type={"text"}
              step={"0.01"}
              placed={"end"}
              minWidth={"150px"}
              min={1.0}
              rules={[
                {
                  required: true,
                  message: "This is a required field",
                },
              ]}
              name={`quantity${record.key}`}
              onChange={(value) => handleOnChangeQuantity(value, record)}
            />
            <Input
              minWidth={"150px"}
              placed={"end"}
              name={`nature${record.key}`}
              display={"none"}
            />
          </>
        );
      },
    },
    {
      title: "Unit",
      dataIndex: "item_unit",
      key: "item_unit",
      render: (text, record) => {
        return (
          <>
            <Input
              // precision={2}
              type={"text"}
              // step={"0.01"}
              placed={"end"}
              minWidth={"150px"}
              disabled={true}
              rules={[
                {
                  required: true,
                  message: "This is a required field",
                },
              ]}
              name={`item_unit${record.key}`}
              // onChange={(value) => handleOnChangeQuantity(value, record)}
            />
          </>
        );
      },
    },
    
  ];

  const onReset = () => {
    form.resetFields();
  };

  const handleOnChange = (date) => {
    setSelectedDate(date);
  };

  const handleOnChangeDat = (date) => {
    setSelectedDatees(date);
  };

  const onFinish = (values) => {
    const record = { ...values, material_recovery_date: selectedDate, date: selectedDatees };

    let result = {
      site_name: record.site_name,
      status: record.status,
      date: record.date,
      user_name: record.company_name,
      material_recovery_date: record.material_recovery_date,
      sales: Object.entries(record)
        .filter(([key]) => key.startsWith("item_name"))
        .map(([key, item_name]) => {
          const index = key.match(/\d+/)[0];
          const itemkey = `item${index}`;
          const quantityKey = `quantity${index}`;
          const nature = `nature${index}`;
          const itemunit = `item_unit${index}`;
          
          return {
            item_name,
            item: record[itemkey],
            quantity: parseFloat(record[quantityKey]).toFixed(2),
            nature: record[nature],
            item_unit: record[itemunit],
          };
        }),
    };
    SitePost(result)
    console.log(values, "Successfully");
    console.log(result, "Successfully result");
  };

  const SitePost = (values) => {
    request.post(`${ADD_SITE}`, values)
      .then(function (response) {
        if (response.status == 201) {
          toast.success('Successfully Submited')
          form.resetFields();
          setTrigger((trigger) => trigger + 1);
          window.location.reload();
        }
        else {
          toast.success('Successfully Billed Sales Entry ')
          console.log('Something went Wrong');
        }
      })
      .catch(function (error) {
        toast.error('Failed.');
      });
  }

  const onFinishFailed = () => {
    toast.warn("Please fill in all the required details !");
  };

  return (
    <CustomCard>
      <TopTitle Heading={'Site Status'} />
      <Form
        form={form}
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        initialValues={{
          date: dayjs,
          // material_recovery_date: dayjs,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row gutter={[24, 24]}>
          <Col span={24} md={12}>
            <Input
              label={"Site Name"}
              placeholder={"Site Name"}
              name={"site_name"}
              rules={[
                {
                  required: true,
                  message: "Please Enter Site Name!",
                },
              ]}
            />
          </Col>
          <Col span={24} md={12}>
            <CustomDatePicker label={"Date"} placeholder={"Date"} name={"date"} onChange={handleOnChangeDat}
              disabled={true} />
          </Col>
          <Col span={24} md={12}>
            <TextAreas
              label={"Status"}
              placeholder={"Status"}
              name={"status"}
              rules={[
                {
                  required: true,
                  message: "Please Enter Site Status!",
                },
              ]}
            />
          </Col>
          <Col span={24} md={12}>
            <Input
              label={"User Name"}
              placeholder={"User Name"}
              name={"user_name"}
              disabled
            />
          </Col>
          <Col span={24} md={12}>
            <CustomDatePicker
              label={"Material Recovery Date"}
              placeholder={"Material Recovery Date"}
              name={"material_recovery_date"}
              onChange={handleOnChange}
              rules={[
                {
                  required: true,
                  message: "Choose Material Recovery Date!",
                },
              ]}
            />
          </Col>
          <Col span={24} md={24}>
            <div style={{ width: "800px" }}>
              <Table
                columns={columns.filter(Boolean)}
                data={tableData}
                pagination={false}
              />
            </div>
            <FooterComponent />
          </Col>
        </Row>
        <Flex center gap={"20px"} style={{ margin: "20px 0px" }}>
          <Button.Primary text={"SUBMIT"} htmlType={"submit"} />
          <Button.Danger text={"RESET"} onClick={() => onReset()} />
        </Flex>
      </Form>
    </CustomCard>
  );
};

export default SiteStatusEntry;
