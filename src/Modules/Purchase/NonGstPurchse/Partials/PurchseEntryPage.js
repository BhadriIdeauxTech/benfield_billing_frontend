import { Card, Col, Form } from "antd"
import React, { Fragment, useEffect, useState } from "react"
import dayjs from 'dayjs'
import Flex from "../../../../Components/Flex"
import Button from "../../../../Components/Form/Button"
import { DeleteOutlined } from "@ant-design/icons"
import Input from "../../../../Components/Form/Input"
import { CustomInputNumber } from "../../../../Components/Form/CustomInputNumber"
import { DeleteButtonWrapper, Table } from "../../../../Components/Table"
import { Select } from "../../../../Components/Form/Select"
import { Row } from "../../../../Components/Row"
import { Modal } from "../../../../Components/Modal"
import { PurchaseFormFooter } from "./PurchaseFormFooter"
import { PurchaseFormHeader } from "./PurchaseFormHeader"
import request from "../../../../utils/request"
import { toast } from "react-toastify"


export const PurchaseEntryPageEstimate = ({ editRecord, EditTrigger, closeingModel,FormUpdateClose }) => {

  const [count, setCount] = useState(1);
  const [isloading, setIsloading] = useState(false);
  const [FormDate, SetFormDate] = useState({});

  // ======  Selected Date ========
  const [selectedDate, setSelectedDate] = useState(dayjs());

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // ================  SalesFormFooter checked ==========
  const [payType, setPayType] = useState('Cash'); // -> Payment Type
  const [round, setRound] = useState(false); // -> Round Off Checked
  const [roundAmount, setRoundAmount] = useState(0); //->  Round Amount
  const [receivedAmount, setReceivedAmount] = useState(0); //->  Received Amount
  const [receivedDisable, setReceivedDisable] = useState(false); // -> Received Disabled
  const [submitDisable, setSubmitDisable] = useState(false); // -> Submit Button Disabled
  const [invoiceNumber, setInvoiceNumber] = useState({});

  const [selectedSupplierDetails, setSelectedSupplierDetails] = useState({});

  // =============  Product Select  =============

  const [productList, setProductList] = useState([])

  useEffect(() => {
    GetSaleCustomer();
  }, [])

  const GetSaleCustomer = () => {
    request.get('purchase/supplier_list_item_detail/')
      .then(function (response) {
        setProductList(response.data.item_details)
        setInvoiceNumber(response.data.invoice_no)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const itemDetails = productList.map(item => ({ label: item.item_name, value: item.item_name }));


  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [form] = Form.useForm();

  // =========================  Modal Content Start  ===========================
  useEffect(() => {
    form.setFieldsValue({ GSTIN: selectedSupplierDetails.gstin })
    form.setFieldsValue({ email: selectedSupplierDetails.email })
    form.setFieldsValue({ company_name: selectedSupplierDetails.supplier_company })
    form.setFieldsValue({ address: selectedSupplierDetails.supplier_address })
    form.setFieldsValue({ state_of_supply: selectedSupplierDetails.supplier_state })

    form.setFieldsValue({ mobile_number: selectedSupplierDetails.mobile_number })
    form.setFieldsValue({ supplier_id: selectedSupplierDetails.id })
    form.setFieldsValue({ supplier_name: selectedSupplierDetails.supplier_name })

    form.setFieldsValue({ supplier_credit: selectedSupplierDetails.credit_amt })
    form.setFieldsValue({ supplier_debit_amt: selectedSupplierDetails.debt_amt })
    form.setFieldsValue({ supplier_advanced: selectedSupplierDetails.advanced_amt })
  }, [selectedSupplierDetails, form])

  // ============ heaer ==========

  // useEffect(() => {
  //   form.setFieldsValue({ invoice_no: invoiceNumber })
  // }, [invoiceNumber])

  useEffect(() => {
    if (editRecord) {
      form.setFieldsValue({ invoice_no: editRecord?.invoice_no })
    }
    else {
      form.setFieldsValue({ invoice_no: invoiceNumber })

    }
  }, [invoiceNumber, editRecord])

  const NORMAL_EDIT_URL = 'purchase/edit_purchase'

  useEffect(() => {
    GetEditPage();
  }, [EditTrigger])

  const GetEditPage = () => {
    request.get(`${NORMAL_EDIT_URL}/${editRecord?.id}/`)
      .then(function (response) {
        SetFormDate(response.data?.purchase)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // =========================  Footer Cheque Hide  ===========================

  const HandleCheQueChage = (value) => {

    if (value === 'Cheque') {
      form.setFieldsValue({ credit_period: '' })
    } else if (value === 'Credit') {
      form.setFieldsValue({ ref_number: '' })
    } else if (value != 'Cheque' || value != 'Credit') {
      form.setFieldsValue({ credit_period: '' })
      form.setFieldsValue({ ref_number: '' })
    }
  }

  // =========================  Other Functions start  =========================

  useEffect(() => {
    if (editRecord) {

      form.setFieldsValue(editRecord);

      const fromdatee = new Date(FormDate?.purchase_date)
      const dateFormat = 'YYYY-MM-DD';
      const FrmDateee = dayjs(fromdatee).format(dateFormat);

      form.setFieldsValue({
        purchase_date: dayjs(FrmDateee),
      })

      // setInvoiceNumber(editRecord?.invoice_no)

      if (editRecord?.purchase_bill) {
        const tableData = editRecord?.purchase_bill?.map((value, index) => ({
          ...value,
          key: index
        }));
        const newData = tableData.map(item => (
          {
            ...item,
          }
        ))
        setTableData(newData);
        setCount(tableData.length)
      }

      const secData = [
        {
          qty_total: editRecord?.qty_total,
          discount_total: editRecord?.discount_total,
          tax_total: editRecord?.tax_total,
          sub_total: editRecord?.sub_total,
        },
      ];

      setTableSecondaryData(secData)
      setReceivedAmount(editRecord?.paid_amt);
      setRoundAmount(editRecord?.round_off);
      setRound(editRecord?.apply_round_off);
      setPayType(editRecord?.payment_type);
    }
  }, [editRecord, FormDate])

  // =========================  Other Functions End  =========================
  const initialData = [
    {
      key: 0,
      item: '',
      item_name: '',
      hsn_code: '',
      description: '',
      item_qty: '',
      item_unit_name: '',
      price_per_unit: '',
      buy_rate: '',
      sell: '',
      dis_percentage: '',
      dis_amt: '',
      tax_percentage: '',
      tax_amt: '',
      cal_amt: '',
    },
  ];

  const secondaryData = [
    {
      qty_total: 0,
      discount_total: 0,
      tax_total: 0,
      sub_total: 0,
    },
  ];

  const footerCalData = [
    {
      round_off: 0,
      grand_total: 0,
      paid_amt: 0,
      balance_amount_new: 0,
    },
  ];


  const [tableData, setTableData] = useState(initialData);
  const [tableSecondaryData, setTableSecondaryData] = useState(secondaryData);
  const [tableFooterData, setTableFooterData] = useState(footerCalData);

  const [trigger, setTrigger] = useState(0);

  // +++++++++++++++++++++   Use Effects Start +++++++++++++++++++

  // ------------------  Dynamic Table  --------------------

  useEffect(() => {
    tableData.forEach(record => {
      form.setFieldsValue({ [`item${record.key}`]: record.item });
      form.setFieldsValue({ [`item_name${record.key}`]: record.item_name });
      form.setFieldsValue({ [`hsn_code${record.key}`]: record.hsn_code });
      // form.setFieldsValue({ [`description${record.key}`]: record.description });
      form.setFieldsValue({ [`item_qty${record.key}`]: record.item_qty });
      form.setFieldsValue({ [`item_unit_name${record.key}`]: record.item_unit_name });
      form.setFieldsValue({ [`price_per_unit${record.key}`]: record.price_per_unit });
      form.setFieldsValue({ [`buy_rate${record.key}`]: record.buy_rate });
      form.setFieldsValue({ [`sell${record.key}`]: record.sell });
      form.setFieldsValue({ [`dis_percentage${record.key}`]: record.dis_percentage });
      form.setFieldsValue({ [`dis_amt${record.key}`]: record.dis_amt });
      form.setFieldsValue({ [`tax_percentage${record.key}`]: record.tax_percentage });
      form.setFieldsValue({ [`tax_amt${record.key}`]: record.tax_amt });
      form.setFieldsValue({ [`cal_amt${record.key}`]: record.cal_amt });
    });

    form.setFieldsValue({ [`qty_total`]: tableSecondaryData[0].qty_total });
    form.setFieldsValue({ [`discount_total`]: tableSecondaryData[0].discount_total });
    form.setFieldsValue({ [`tax_total`]: tableSecondaryData[0].tax_total });
    form.setFieldsValue({ [`grand_total`]: tableSecondaryData[0].grand_total });
    form.setFieldsValue({ [`sub_total`]: tableSecondaryData[0].sub_total });

  }, [tableData])



  // ============== UNIT OPTIONS ============


  const UnitOptions = [
    {
      label: 'Nos',
      value: 'Nos',
    },
    {
      label: 'Box',
      value: 'Box',
    },
    {
      label: 'Pcs',
      value: 'Pcs',
    },
    {
      label: 'Kg',
      value: 'Kg',
    },
    {
      label: 'Litre',
      value: 'Litre',
    },
    {
      label: 'Mtr',
      value: 'Mtr',
    },
    {
      label: 'Grams',
      value: 'Grams',
    },
    {
      label: 'Bag',
      value: 'Bag',
    },
    {
      label: 'Botl',
      value: 'Botl',
    },
    {
      label: 'Bndl',
      value: 'Bndl',
    },
    {
      label: 'Can',
      value: 'Can',
    },
    {
      label: 'Coil',
      value: 'Coil',
    },
  ]


  // ===============  Table Data Start ==================


  const columns = [
    {
      title: '#',
      render: (text, record, index) => {

        return (
          (
            <Flex alignCenter gap={'20px'} style={{ alignItems: 'center' }}>
              <h4>{index + 1}</h4>
              <DeleteButtonWrapper>
                <Button
                  style={{
                    display: 'flex',
                    padding: '10px',
                    height: 'auto',
                    fontSize: '16px',
                  }}
                  htmlType="button"
                  danger
                  onClick={() => onDelete(record.key)}
                >
                  <DeleteOutlined />
                </Button>
              </DeleteButtonWrapper>
            </Flex>
          )
        );
      },
    },
    {
      title: 'Product',
      dataIndex: 'item_name',
      key: 'item_name',
      render: (text, record) => {
        return (
          <>
            <Select rules={[
              {
                required: true,
                message: 'This is a required field'
              },
            ]}
              minWidth={'150px'}
              showSearch
              name={`item_name${record.key}`}
              options={itemDetails}
              onChange={(value) => handleOnChangeProduct(value, record)}
            />

            <Input name={`item${record.key}`} display={"none"} />
          </>
        )
      }
    },
    {
      title: 'HSN Code',
      dataIndex: 'hsn_code',
      key: 'hsn_code',
      render: (text, record) => {
        return (
          <Input
            minWidth={'150px'}
            name={`hsn_code${record.key}`}
            disabled
          />
        )
      }
    },
    {
      title: 'Unit',
      dataIndex: 'item_unit_name',
      render: (text, record) => (
        <>
          <Select rules={[
            {
              required: true,
              message: 'This is a required field'
            },
          ]}
            showSearch
            minWidth={'150px'}
            name={`item_unit_name${record.key}`}
            options={UnitOptions}
            onChange={(value) => handleOnChangeUnit(value, record)}
          />
          <Input name={`item_unit_name${record.key}`} display={'none'} /></>
      )
    },
    {
      title: 'Qty',
      dataIndex: 'item_qty',
      key: 'item_qty',
      render: (text, record) => {
        return (
          <CustomInputNumber precision={2} rules={[
            {
              required: true,
              message: 'This is a required field'
            },
          ]}
            type={"text"}
            step={"0.01"}
            placed={'end'}
            minWidth={'150px'}
            min={1.00}
            name={`item_qty${record.key}`}
            onChange={(value) => handleOnChangeQuantity(value, record)}
          />
        )
      }
    },
    {
      title: 'MRP',
      dataIndex: 'price_per_unit',
      render: (text, record) => (
        <CustomInputNumber precision={2} rules={[
          {
            required: true,
            message: 'This is a required field'
          },
        ]}
          minWidth={'150px'}
          min={1.00}
          placed={'end'}
          name={`price_per_unit${record.key}`}
          onChange={(value) => handleOnChangeMRP(value, record)}
        />
      )
    },
    {
      title: 'Buy Rate',
      dataIndex: 'buy_rate',
      render: (text, record) => (
        <CustomInputNumber precision={2} rules={[
          {
            required: true,
            message: 'This is a required field'
          },
        ]}
          minWidth={'150px'}
          min={1.00}
          placed={'end'}
          name={`buy_rate${record.key}`}
          onChange={(value) => handleOnChangePrice(value, record)}
        />
      )
    },
    {
      title: 'Discount',
      children: [
        {
          title: '%',
          dataIndex: 'dis_percentage',
          key: 'dis_percentage',
          render: (text, record) => (
            <CustomInputNumber precision={2}
              minWidth={'150px'}
              placed={'end'}
              name={`dis_percentage${record.key}`}
              min={0.00}
              max={100.00}
              onChange={(value) => handleonChangeDiscount(value, record)}
            />
          )
        },
        {
          title: 'Amount',
          dataIndex: 'dis_amt',
          key: 'dis_amt',
          render: (text, record) => (
            <CustomInputNumber precision={2}
              minWidth={'150px'}
              placed={'end'}
              name={`dis_amt${record.key}`}
              disabled
            />
          )
        },
      ],
    },
    {
      title: (
        <p>Amount</p>
      ),
      dataIndex: 'cal_amt',
      key: 'cal_amt',
      render: (text, record) => (
        <CustomInputNumber precision={2}
          disabled
          minWidth={'150px'}
          placed={'end'}
          name={`cal_amt${record.key}`}
        />
      )
    },
  ]

  // ===============  Table Data End ==================


  // ==================  Table Functions Start ==================

  // ----------------- Add Row Function 

  const AddRow = () => {
    const newData = {
      key: count,
      item: '',
      item_name: '',
      itemCode: '',
      hsn_code: '',
      description: '',
      item_qty: '',
      item_unit_name: '',
      price_per_unit: '',
      buy_rate: '',
      sell: '',
      dis_percentage: '',
      dis_amt: '',
      tax_percentage: '',
      tax_amt: '',
      cal_amt: '',
    };
    setTableData(pre => {
      return [...pre, newData]
    })
    setCount(count + 1);
  }

  // -----------------------  Delete Row Function

  const onDelete = (key) => {
    if (tableData.length > 1) {
      setTableData(prevState => {
        const newData = prevState.filter(item => item.key !== key);

        // ------ Variables 
        let totalQuantity = 0;
        let totalDiscount = 0;
        let totalTax = 0;
        let totalAmount = 0;

        newData.forEach(item => {
          if (item.item_qty !== '' || item.cal_amt !== '' || item.dis_amt !== '' || item.tax_amt !== '') {
            totalQuantity += parseFloat(item.item_qty);
            totalDiscount += parseFloat(item.dis_amt);
            totalTax += parseFloat(item.tax_amt);
            totalAmount += parseFloat(item.cal_amt);
          }
        });

        // update the total amount value in the tableSecondaryData array

        setTableSecondaryData([{
          qty_total: totalQuantity.toFixed(2),
          discount_total: totalDiscount.toFixed(2),
          tax_total: totalTax.toFixed(2),
          // grand_total: totalAmount.toFixed(2)
          sub_total: totalAmount.toFixed(2)
        }]);

        setTableFooterData(prev => ({
          ...prev,
          grand_total: totalAmount.toFixed(2)
        }));

        return newData;
      });
    } else {
      console.log(`only ${tableData.length} is available`)
    }
  };

  // ========================   Total Calculating Functions
  // ----------------- 1. Calculate TotalAmount 

  const CalculateTotal = (record) => {
    setTableData(prevState => {
      const newData = [...prevState];
      const index = newData.findIndex(item => record.key === item.key);
      const item = newData[index];
      item.cal_amt = record.cal_amt || 0;
      item.tax_amt = record.tax_amt || 0;
      item.item_qty = record.item_qty;
      item.dis_amt = record.dis_amt || 0;
      // item.tax_amt = value || 0;

      // ------ Variables 
      let totalQuantity = 0;
      let totalDiscount = 0;
      let totalTax = 0;
      let totalAmount = 0;

      newData.forEach(item => {
        if (item.item_qty !== '' || item.cal_amt !== '' || item.dis_amt !== '' || item.tax_amt !== '') {
          totalQuantity += parseFloat(item.item_qty);
          totalDiscount += parseFloat(item.dis_amt);
          totalTax += parseFloat(item.tax_amt);
          totalAmount += parseFloat(item.cal_amt);
        }
      });

      // update the total amount value in the tableSecondaryData array
      setTableSecondaryData([{
        qty_total: totalQuantity.toFixed(2),
        discount_total: totalDiscount.toFixed(2),
        tax_total: totalTax.toFixed(2),
        // grand_total: totalAmount.toFixed(2);
        sub_total: totalAmount.toFixed(2)
      }]);

      setTableFooterData(prev => ({
        ...prev,
        grand_total: totalAmount.toFixed(2)
      }));
      // console.log(typeof totalAmount, 'totalAmo423unttotalAmount');
      return newData;
    })
  };

  // ============  OnChange Functions  ==============

  const HandleQty = (value, record) => {
    setTableData(prevState => {
      const newData = [...prevState];
      const index = newData.findIndex(item => record.key === item.key);
      const item = newData[index];
      item.item_qty = value || 0;
      // item.buy_rate = record.buy_rate || 0;
      item.buy_rate = record.buy_rate;
      item.dis_percentage = record.dis_percentage || 0;

      let CalAmount = 0;

      if (item.dis_percentage != 0) {
        const Amt = calculateAmount(item);
        item.dis_amt = (Amt * item.dis_percentage) / 100;
        CalAmount = Amt - item.dis_amt;
      } else {
        CalAmount = calculateAmount(item);
      }

      item.cal_amt = CalAmount;

      HandlePrice(item.buy_rate, {
        ...item,
        item_qty: item.item_qty,
        cal_amt: CalAmount,
        buy_rate: item.buy_rate,
      })

      CalculateTotal({
        ...item,
        item_qty: item.item_qty,
        cal_amt: CalAmount,
        buy_rate: item.buy_rate,
      })

      HandleTax(item.tax_percentage, {
        ...item,
        item_qty: item.item_qty,
        cal_amt: CalAmount,
        buy_rate: item.buy_rate,
      })

      HandleDiscount(item.dis_percentage, {
        ...item,
        quantity: item.quantity,
        item_cal_total_amt: CalAmount,
        sale_price: item.sale_price,
      })

      return newData;
    });
  }


  const HandlePrice = (value, record) => {
    setTableData(prevState => {
      const newData = [...prevState];
      const index = newData.findIndex(item => record.key === item.key);
      const item = newData[index];

      // item.item_qty = record.item_qty || 0;
      item.item_qty = record.item_qty;
      // item.buy_rate = value || 0;
      item.buy_rate = value;
      item.dis_percentage = record.dis_percentage;

      // const cal_amt = buy_rate + tax_amt;
      let CalAmount = 0;

      if (item.dis_percentage != 0) {
        const Amt = calculateAmount(item);
        item.dis_amt = (Amt * item.dis_percentage) / 100;
        CalAmount = Amt - item.dis_amt;
      } else {
        CalAmount = calculateAmount(item);
      }
      item.cal_amt = CalAmount;

      CalculateTotal({
        ...item,
        item_qty: item.item_qty,
        buy_rate: item.buy_rate,
        cal_amt: CalAmount,
      })

      HandleTax(item.tax_percentage, {
        ...item,
        item_qty: item.item_qty,
        cal_amt: CalAmount,
        buy_rate: item.buy_rate,
      })

      return newData;
    });
  }

  const HandleDiscount = (value, record) => {
    setTableData(prevState => {
      const newData = [...prevState];
      const index = newData.findIndex(item => record.key === item.key);
      const item = newData[index];

      // const Qty = record.item_qty || 0;
      const Qty = record.item_qty;
      // const Price = record.buy_rate || 0;
      const Price = record.buy_rate;
      const DiscountPercentage = value || 0;
      const TaxPercentage = record.tax_percentage || 0;

      const MultiplyAmount = calculateAmount(item);

      let Amt = 0;

      if (TaxPercentage != 0) {
        if (DiscountPercentage != 0) {
          const OriginalAmount = calculateAmount(item);
          const DisMinus = (OriginalAmount * DiscountPercentage) / 100;

          const ApplyDiscount = OriginalAmount - DisMinus;

          const taxAmt = (ApplyDiscount * TaxPercentage) / 100;
          const ApplyTax = ApplyDiscount + taxAmt

          item.dis_percentage = DiscountPercentage;
          item.dis_amt = DisMinus;
          item.tax_percentage = TaxPercentage;
          item.tax_amt = taxAmt;
          Amt = ApplyTax;

          CalculateTotal({
            ...item,
            dis_amt: item.dis_amt,
            cal_amt: Amt,
          })
        }
        else {
          const OriginalAmount = calculateAmount(item);
          const TaxPlus = (OriginalAmount * TaxPercentage) / 100;

          const ApplyTax = OriginalAmount + TaxPlus;

          item.tax_percentage = TaxPercentage;
          item.tax_amt = TaxPlus;
          item.dis_amt = 0;
          Amt = ApplyTax;

          CalculateTotal({
            ...item,
            dis_amt: item.dis_amt,
            cal_amt: Amt,
          })
        }
      }
      else {
        if (DiscountPercentage != 0) {

          const OriginalAmount = calculateAmount(item);
          const DisMinus = (OriginalAmount * DiscountPercentage) / 100;

          const ApplyDiscount = OriginalAmount - DisMinus;
          item.dis_percentage = DiscountPercentage;
          item.dis_amt = DisMinus;
          item.dis_percentage = 0;
          Amt = ApplyDiscount;

          CalculateTotal({
            ...item,
            dis_amt: item.dis_amt,
            cal_amt: Amt,
          })
        }
        else {
          const OriginalAmount = calculateAmount(item);
          item.dis_amt = 0;

          Amt = OriginalAmount;

          CalculateTotal({
            ...item,
            dis_amt: item.dis_amt,
            cal_amt: Amt,
          })
        }
      }

      item.cal_amt = Amt;
      item.dis_percentage = DiscountPercentage;

      return newData;
    })
  }

  const HandleProduct = (value, record) => {
    setTableData(prevState => {
      const newData = [...prevState];
      const index = newData.findIndex(item => record.key === item.key);
      const item = newData[index];


      const isItemAlreadyAdded = newData.some(
        (item, i) => i !== index && item.item_name === value
      );

      if (isItemAlreadyAdded) {
        toast.error("Product already added in the table.");
        return newData;
      }

      const setSelectedProduct = productList.find(item => item.item_name === value);

      item.item = setSelectedProduct.id;
      item.hsn_code = setSelectedProduct.item_hsn;
      item.item_unit_name = setSelectedProduct.item_unit;
      item.buy_rate = setSelectedProduct.buy_rate;

      item.item_name = value;

      let CalAmount= 0;

      item.cal_amt = CalAmount;

      HandlePrice(item.buy_rate, {
        ...item,
        item_qty: item.item_qty,
        cal_amt: CalAmount,
        buy_rate: item.buy_rate,
      })
      

      return newData;
    });
  }

  const HandleUnit = (value, record) => {
    setTableData(prevState => {
      const newData = [...prevState];
      const index = newData.findIndex(item => record.key === item.key);
      const item = newData[index];
      item.item_unit_name = value;

      return newData;
    });
  }

  const HandleMRP = (value, record) => {
    setTableData(prevState => {
      const newData = [...prevState];
      const index = newData.findIndex(item => record.key === item.key);
      const item = newData[index];
      item.price_per_unit = value;

      return newData;
    });
  }

  const HandleSELL = (value, record) => {
    setTableData(prevState => {
      const newData = [...prevState];
      const index = newData.findIndex(item => record.key === item.key);
      const item = newData[index];
      item.sell = value;

      return newData;
    });
  }

  const HandleTax = (value, record) => {
    setTableData(prevState => {
      const newData = [...prevState];
      const index = newData.findIndex(item => record.key === item.key);
      const item = newData[index];

      const Qty = record.item_qty || 0;
      // const Price = record.buy_rate || 0;
      const Price = record.buy_rate;
      const DiscountPercentage = record.dis_percentage || 0;
      const TaxPercentage = value || 0;

      const MultiplyAmount = calculateAmount(item);

      let Amt = 0;

      if (TaxPercentage != 0) {
        if (DiscountPercentage != 0) {
          const OriginalAmount = calculateAmount(item);
          const DisMinus = (OriginalAmount * DiscountPercentage) / 100;

          const ApplyDiscount = OriginalAmount - DisMinus;

          const taxAmt = (ApplyDiscount * TaxPercentage) / 100;
          const ApplyTax = ApplyDiscount + taxAmt

          item.dis_percentage = DiscountPercentage;
          item.dis_amt = DisMinus;
          item.tax_percentage = TaxPercentage;
          item.tax_amt = taxAmt;
          Amt = ApplyTax;

          CalculateTotal({
            ...item,
            tax_amt: item.tax_amt,
            cal_amt: Amt,
          })
        }
        else {
          const OriginalAmount = calculateAmount(item);
          const TaxPlus = (OriginalAmount * TaxPercentage) / 100;

          const ApplyTax = OriginalAmount + TaxPlus;

          item.tax_percentage = TaxPercentage;
          item.tax_amt = TaxPlus;
          Amt = ApplyTax;

          CalculateTotal({
            ...item,
            tax_amt: item.tax_amt,
            cal_amt: Amt,
          })
        }
      }
      else {
        if (DiscountPercentage != 0) {

          const OriginalAmount = calculateAmount(item);
          const DisMinus = (OriginalAmount * DiscountPercentage) / 100;

          const ApplyDiscount = OriginalAmount - DisMinus;

          // const taxAmt = (ApplyDiscount * TaxPercentage) / 100;
          // const ApplyTax = ApplyDiscount + taxAmt

          item.dis_percentage = DiscountPercentage;
          item.dis_amt = DisMinus;
          item.tax_amt = 0;
          Amt = ApplyDiscount;

          CalculateTotal({
            ...item,
            tax_amt: item.tax_amt,
            cal_amt: Amt,
          })
        }
        else {
          const OriginalAmount = calculateAmount(item);
          item.tax_amt = 0;

          Amt = OriginalAmount;

          CalculateTotal({
            ...item,
            tax_amt: item.tax_amt,
            cal_amt: Amt,
          })
        }
      }

      item.cal_amt = Amt;
      item.tax_percentage = TaxPercentage;

      return newData;
    })
  }

  // ---------------- 1.TotalQuantity ONCHANGE Function
  const handleOnChangeQuantity = (value, record) => {
    HandleQty(value, record)
  }

  const handleOnChangeMRP = (value, record) => {
    HandleMRP(value, record)
  }

  const handleOnChangeSell = (value, record) => {
    HandleSELL(value, record)
  }

  const handleOnChangePrice = (value, record) => {
    HandlePrice(value, record)
  }

  const handleonChangeDiscount = (value, record) => {
    HandleDiscount(value, record)
  }

  const handleOnChangeProduct = (value, record) => {
    HandleProduct(value, record)
  }

  const handleOnChangeUnit = (value, record) => {
    HandleUnit(value, record)
  }


  const handleOnChangeTax = (value, record) => {
    HandleTax(value, record)
  }


  // -------------- Handle Total Row Amount  --------------
  const calculateAmount = (record) => {
    const item_qty = parseFloat(record.item_qty) || 0;
    const buy_rate = parseFloat(record.buy_rate);
    return item_qty * buy_rate;
  }

  //  ======================  Other Functions =========


  // -----------------------  Final Value Function ----------

  useEffect(() => {
    finalValueCal();
  }, [payType, round, receivedAmount, tableSecondaryData, roundAmount])

  const finalValueCal = () => {

    // console.log('called', payType, tableFooterData?.grand_total, receivedAmount, roundAmount);
    let round_off_val = 0;
    let grand_total_val = 0;
    let received_val = 0;
    let balance_val = 0;

    if (payType === 'Cheque' || payType === 'Credit') {
      setReceivedDisable(true)
      setReceivedAmount(0)
      if (round) {
        const num = tableSecondaryData[0]?.sub_total;

        let roundValue;

        if (num % 1 < 0.5) {
          roundValue = num - roundAmount;
        } else {
          roundValue = Math.ceil(num);
        }

        round_off_val = roundAmount; // -> Round Off Value
        received_val =roundValue; // -> Received Value
        balance_val = 0;  // -> balance Value
        grand_total_val =roundValue; // -> Grand Total
      } else {
        round_off_val = roundAmount; // -> Round Off Value
        received_val = tableSecondaryData[0]?.sub_total; // -> Received Value
        balance_val = 0;  // -> balance Value
        grand_total_val = tableSecondaryData[0]?.sub_total; // -> Grand Total
      }
    } else {
      setReceivedDisable(false)

      if (round) {
        const num = tableSecondaryData[0]?.sub_total;

        let roundValue;

        if (num % 1 < 0.5) {
          roundValue = num - roundAmount;
        } else {
          roundValue = Math.ceil(num);
        }
        const balance = roundValue - receivedAmount;

        if (balance < 0) {
          toast.warning('Received Amount E 1')
          setSubmitDisable(true)
        } else {
          setSubmitDisable(false)
        }

        round_off_val = roundAmount; // -> Round Off Value
        received_val = receivedAmount; // -> Received Value
        balance_val = balance;  // -> balance Value
        grand_total_val = roundValue; // -> Grand Total
      } else {
        const balance = tableSecondaryData[0]?.sub_total - receivedAmount;

        if (balance < 0) {
          // toast.warning('Received Amount E 2')
          setSubmitDisable(true)
        } else {
          setSubmitDisable(false)
        }
        round_off_val = roundAmount; // -> Round Off Value
        received_val = receivedAmount; // -> Received Value
        balance_val = balance;  // -> balance Value
        grand_total_val = tableSecondaryData[0]?.sub_total; // -> Grand Total
      }
    }

    // console.log(payType, received_val, receivedAmount, roundAmount, 'paytype');
    form.setFieldsValue({ paid_amt: received_val })

    setTableFooterData((prevData) => ({
      ...prevData,
      balance_amount_new: balance_val,
      round_off: round_off_val,
      paid_amt: received_val,
      grand_total: grand_total_val,
    }));
  }


  // ====================  On Finish Function ============

  // ========= Purchse Post Url function ======

  const PurchsePost = (values) => {
    setIsloading(true);
    request.post('purchase/purchase/', values)
      .then(function (response) {
        if (response.status == 201) {
          toast.success('Successfully Billed Purchase Entry ')
          form.resetFields();
          setTrigger((trigger) => trigger + 1);
          setTableData(initialData);
          setTableSecondaryData(secondaryData);
          setTableFooterData(footerCalData);
          setRound(false);
          setPayType('Cash');
        }
        else {
          console.log('Something went Wrong');
        }
        setIsloading(false);
      })
      .catch(function (error) {
        setIsloading(false);
        if (error.response.status == 400) {
          if (error.response.data?.GSTIN == 'Invalid GSTIN') {
            toast.warn('Invalid GSTIN');
          }
          else {
            toast.error('Failed');
          }
        }
      });
  }

  // ========= Purchse Edit Url function ======

  const Edit_Purchse_url = 'purchase/edit_purchase'

  const PurchseEdit = (values) => {
    setIsloading(true);
    request.put(`${Edit_Purchse_url}/${editRecord?.id}/`, values)
      .then(function (response) {
        if (response.status == 201) {
          toast.success('Successfully Updated Purchase Entry ')
          form.resetFields();
          setTrigger((trigger) => trigger + 1);
          setTableData(initialData);
          setTableSecondaryData(secondaryData);
          setTableFooterData(footerCalData);
          setRound(false);
          setPayType('Cash');
          setIsloading(false);
          if (closeingModel) {
            closeingModel();
          }

          if(FormUpdateClose){
            FormUpdateClose();
          }
        }
        else {
          setIsloading(false);
          console.log('Something went Wrong');
        }
      })
      .catch(function (error) {
        setIsloading(false);
        if (error.response.status == 400) {
          if (error.response.data?.GSTIN == 'Invalid GSTIN') {
            toast.warn('Invalid GSTIN');
          }
          else {
            toast.error('Failed');
          }
        }
      });
  }

  const onFinish = (values) => {
    const record = {
      ...values,
      purchase_date: values?.purchase_date === null ? '' : dayjs(selectedDate).format('YYYY-MM-DD') ? dayjs(values?.purchase_date).format('YYYY-MM-DD') : dayjs(values?.purchase_date).format('YYYY-MM-DD'),
    };

    let result = {
      supplier: record.supplier_id,
      payment_type: record.payment_type,
      supplier_name: record.supplier_name,
      state_of_supply: record.state_of_supply,
      mobile_number: record.mobile_number,
      company_name: record.company_name,
      address: record.address,
      purchase_date: record.purchase_date,
      purchase_invoice_no: record.purchase_invoice_no,
      GSTIN: record.GSTIN,
      email: record.email,
      ref_number: record.ref_number,
      paid: record.paid || false,
      apply_round_off: record.apply_round_off,
      invoice_no: record.invoice_no,
      address: record.address || '',
      supplier_debit_amt: record.supplier_debit_amt || 0,

      qty_total: parseFloat(tableSecondaryData[0]?.qty_total).toFixed(2),
      discount_total: parseFloat(tableSecondaryData[0]?.discount_total).toFixed(2),
      tax_total: 0,
      sub_total: parseFloat(tableSecondaryData[0]?.sub_total).toFixed(2),
      round_off: parseFloat(tableFooterData?.round_off).toFixed(2) || 0,
      grand_total: parseFloat(tableFooterData?.grand_total).toFixed(2),
      paid_amt: parseFloat(tableFooterData?.paid_amt || 0).toFixed(2),
      balance_amount_new: parseFloat(tableFooterData?.balance_amount_new).toFixed(2),


      purchase_bill: Object.entries(record)
        .filter(([key]) => key.startsWith('item_name'))
        .map(([key, item_name]) => {
          const index = key.match(/\d+/)[0];
          const itemKey = `item${index}`;
          const buyRateKey = `buy_rate${index}`;
          const qtyKey = `item_qty${index}`;
          const hsnKey = `hsn_code${index}`;
          const mrpKey = `price_per_unit${index}`;
          const unitKey = `item_unit_name${index}`;
          const discountAmtKey = `dis_amt${index}`;
          const discountPercentageKey = `dis_percentage${index}`;
          const amountKey = `cal_amt${index}`;

          return {

            item_name,
            item: record[itemKey],
            hsn_code: record[hsnKey],
            item_unit_name: record[unitKey],
            item_qty: parseFloat(record[qtyKey]).toFixed(2),
            buy_rate: parseFloat(record[buyRateKey]).toFixed(2),
            price_per_unit: parseFloat(record[mrpKey]).toFixed(2),
            dis_percentage: parseFloat(record[discountPercentageKey]).toFixed(2),
            dis_amt: parseFloat(record[discountAmtKey]).toFixed(2),
            tax_percentage: 0,
            tax_per_value: 0,
            cal_amt: parseFloat(record[amountKey]).toFixed(2),
          };
        }),
    };

    if (editRecord) {
      PurchseEdit(result)
    } else {
      PurchsePost(result)
    }

  };
  const onFinishFailed = (errorInfo) => {
    toast.warn("Please fill in all the required details !");
  };


  // ==============  Add Row Component  ================

  const FooterComponent = () => {
    return (
      <div style={{ background: 'var(--light-color)', padding: '20px' }}>
        <Row>
          <Col lg={4} sm={12} span={24}><Button type="primary" style={{
            fontSize: '1rem',
            height: 'auto',
            fontFamily: 'Poppins',
            fontWeight: 500,
            letterSpacing: '1px',
          }}
            htmlType="button"
            onClick={AddRow}>
            Add Row
          </Button>
          </Col>
        </Row>
      </div >
    )
  }

  // ==================  Table  ==================
  const onRest = () => {
    form.resetFields();
    if (editRecord) {
      form.setFieldsValue({ invoice_no: editRecord?.invoice_no })
    } else {
      form.setFieldsValue({ invoice_no: invoiceNumber })
    }
    GetSaleCustomer();
    setSelectedSupplierDetails(!selectedSupplierDetails)
    setTrigger((trigger) => trigger + 1);
    setTableData(initialData);
    setTableSecondaryData(secondaryData);
    setTableFooterData(footerCalData);
    setRound(false);
    setPayType('Cash');
  }
  return (
    <Fragment>
      <Form name="sales"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        form={form}
        initialValues={
          {
            purchase_date: dayjs(),
            payment_type: 'Cash',
            apply_round_off: false,
            paid: false,
            round_off: 0,
            paid_amt: 0,
          }
        }
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <PurchaseFormHeader
          setSelectedSupplierDetails={setSelectedSupplierDetails}
          trigger={trigger} setProductList={setProductList}
          GetSaleCustomer={GetSaleCustomer} setSelectedDate={setSelectedDate} />

        <div style={{ margin: '20px 0', display: 'none' }}>
          {/* <Button onChange={handleSwitchChange} /> */}
        </div>
        <Table columns={columns.filter(Boolean)} data={tableData} pagination={false} />
        <FooterComponent />

        <div style={{ margin: '20px 0' }}>
          <PurchaseFormFooter
            payType={payType}
            receivedDisable={receivedDisable}
            setPayType={setPayType}
            round={round}
            setRound={setRound}
            setRoundAmount={setRoundAmount}
            setReceivedAmount={setReceivedAmount}
            HandleCheQueChage={HandleCheQueChage}
            tableSecondaryData={tableSecondaryData}
            tableFooterData={tableFooterData}
            finalValueCal={finalValueCal}
          />
        </div>

        <Card>
          {editRecord ? <Flex flexEnd gap={'10px'}>
            <Button.Success text={'Update'} htmlType="submit" disabled={submitDisable} loading={isloading} />
          </Flex> :
            <Flex flexEnd gap={'10px'}>
              <Button.Primary text={'Submit'} htmlType="submit" disabled={submitDisable} loading={isloading} />
              <Button.Danger text={'Cancel'} onClick={onRest} />
            </Flex>}
        </Card>

      </Form>

      <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={500} modalTitle={modalTitle} modalContent={modalContent} />
    </Fragment>
  )
}