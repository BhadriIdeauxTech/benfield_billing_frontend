import { Card, Col, Divider, Form, Popover } from "antd"
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
import request from "../../../../utils/request"
import { toast } from "react-toastify"
import { PurchaseFormFooter } from "./PurchaseFooter"
import { PurchaseFormHeader } from "./PurchaseHeader"
import { useNavigate, useParams } from "react-router-dom"



export const PurchaseEntryPage = ({ getTaxType, getPurch, setSaleorder, getSaleorders, selectedDate }) => {

  const [count, setCount] = useState(1);
  const [state, setState] = useState(false)
  const [files, setFiles] = useState(null)
  const [switchValue, setSwitchValue] = useState(false)
  const [payment, setPayment] = useState('cash');
  const [roundOff, setRoundOff] = useState(false);

  const navigate = useNavigate()

  const { id } = useParams();
  const [tableProducts, setTableProducts] = useState([])
  const [taxType, setTaxType] = useState(null)

  useEffect(() => {
    setTableProducts(getPurch)
    setTaxType(getTaxType)
  }, [])

  // ========= options for the product =========

  const itemNames = tableProducts?.map(item => item.item_name);

  const options = itemNames?.map(item => {
    return {
      value: item,
      label: item?.charAt(0).toUpperCase() + item?.slice(1)
    };
  });

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const [invoiceNumber, setInvoiceNumber] = useState({})

  // ================  SalesFormFooter checked ==========
  const [round, setRound] = useState(false);
  const [roundDecimalValue, setRoundDecimalValue] = useState(null);
  const [balance, setBalance] = useState(false);

  // -----------------  Balance Checking ------------
  const [withDecimal, setWithDecimal] = useState(null);
  const [withOutDecimal, setWithOutDecimal] = useState(null);
  const [balanceChangeAmount, setBalanceChangeAmount] = useState(0);
  const [balanceChange, setBalanceChange] = useState(false);
  const [selectedSupplierDetails, setSelectedSupplierDetails] = useState({})



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

  const itemDetails = productList.map(item => ({ label: item.item_name, value: item.id }));


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
    form.setFieldsValue({ supplier_debit: selectedSupplierDetails.debt_amt })
    form.setFieldsValue({ supplier_advanced: selectedSupplierDetails.advanced_amt })
  }, [selectedSupplierDetails, form])

  // ============heaer ==========

  useEffect(() => {
    form.setFieldsValue({ invoice_no: invoiceNumber })
  }, [invoiceNumber])

  // =========================  Footer Cheque Hide  ===========================

  const HandleCheQueChage = (value) => {

    if (value === 'Cheque') {
      form.setFieldsValue({ paid: false })

      const totalAmt = tableSecondaryData[0].total_amount - roundDecimalValue;

      if (round) {
        form.setFieldsValue({ received: '0.00' })
        form.setFieldsValue({ balance: totalAmt });
        form.setFieldsValue({ roundoff_amount: totalAmt });
      }
      else {
        form.setFieldsValue({ received: '0.00' })
        form.setFieldsValue({ balance: tableSecondaryData[0].total_amount });
        form.setFieldsValue({ roundoff_amount: tableSecondaryData[0].total_amount });
      }
    }
  }

  // -----------------------  RoundOff Checked Function ----------
  const RoundOffChecked = (value) => {
    setWithDecimal(tableSecondaryData[0].total_amount - roundDecimalValue);
    setRound(value)
  }


  const TotalBalance = (value) => {
    setBalance(value);
    const totalAmt = tableSecondaryData[0].total_amount;
    let fullPayAmt;

    if (totalAmt % 1 < 0.5) {
      fullPayAmt = totalAmt - roundDecimalValue;
    } else {
      fullPayAmt = Math.ceil(totalAmt);
    }
    setWithDecimal(fullPayAmt);
    setWithOutDecimal(tableSecondaryData[0].total_amount)
  }

  // =========================  Modal Content End  ===========================

  // =========================  Other Functions start  =========================

  const handlePayment = (e) => {
    setPayment(e)
  }

  // =========================  Other Functions End  =========================

  const initialData = [
    {
      key: 0,
      item: '',
      item_name: '',
      hsn_code: '',
      description: '',
      qty: '',
      item_unit: '',
      price_per_unit: '',
      price: '',
      sell: '',
      discount_percentage: '',
      discount_amt: '',
      tax_percentage: '',
      tax_amt: '',
      amount: '',
    },
  ];

  const secondaryData = [
    {
      total_qty: '',
      total_discount: '',
      total_tax: '',
      total_amount: '',
    },
  ];

  const footerCalData = [
    {
      roundoff: '',
      total_amount: '',
      total_rowamount: '',
      received: '',
      balance: '',
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
      form.setFieldsValue({ [`qty${record.key}`]: record.qty });
      form.setFieldsValue({ [`item_unit${record.key}`]: record.item_unit });
      form.setFieldsValue({ [`price_per_unit${record.key}`]: record.price_per_unit });
      form.setFieldsValue({ [`price${record.key}`]: record.price });
      form.setFieldsValue({ [`sell${record.key}`]: record.sell });
      form.setFieldsValue({ [`discount_percentage${record.key}`]: record.discount_percentage });
      form.setFieldsValue({ [`discount_amt${record.key}`]: record.discount_amt });
      form.setFieldsValue({ [`tax_percentage${record.key}`]: record.tax_percentage });
      form.setFieldsValue({ [`tax_amt${record.key}`]: record.tax_amt });
      form.setFieldsValue({ [`amount${record.key}`]: record.amount });
    });

    form.setFieldsValue({ [`total_qty`]: tableSecondaryData[0].total_qty });
    form.setFieldsValue({ [`total_discount`]: tableSecondaryData[0].total_discount });
    form.setFieldsValue({ [`total_tax`]: tableSecondaryData[0].total_tax });
    form.setFieldsValue({ [`total_amount`]: tableSecondaryData[0].total_amount });

    form.setFieldsValue({ "roundoff_amount": tableSecondaryData[0].total_amount });
    form.setFieldsValue({ "balance": tableSecondaryData[0].total_amount });

    setWithOutDecimal(tableSecondaryData[0].total_amount);
  }, [tableData])

  // --------------------- Round Off Checked  -----------------
  useEffect(() => {
    const totalAmt = tableSecondaryData[0].total_amount;

    let roundValue;

    if (totalAmt % 1 < 0.5) {
      roundValue = totalAmt - roundDecimalValue;
    } else {
      roundValue = Math.ceil(totalAmt);
    }
    
    if (round) {
      if (balance) {
        form.setFieldsValue({ round_off: roundDecimalValue });
        form.setFieldsValue({ roundoff_amount: roundValue });
        form.setFieldsValue({ balance: 0 });
        form.setFieldsValue({ received: roundValue });
        setBalanceChangeAmount(roundValue);
      }
      else {
        form.setFieldsValue({ round_off: roundDecimalValue });
        form.setFieldsValue({ roundoff_amount: roundValue });
        form.setFieldsValue({ balance: roundValue });
        form.setFieldsValue({ received: 0 });
        setBalanceChangeAmount(0);
      }
    }
    else {
      if (balance) {
        form.setFieldsValue({ round_off: 0 });
        form.setFieldsValue({ roundoff_amount: tableSecondaryData[0].total_amount });
        form.setFieldsValue({ balance: 0 });
        form.setFieldsValue({ received: tableSecondaryData[0].total_amount });
        setBalanceChangeAmount(tableSecondaryData[0].total_amount);
      }
      else {
        form.setFieldsValue({ round_off: 0 });
        form.setFieldsValue({ roundoff_amount: tableSecondaryData[0].total_amount });
        form.setFieldsValue({ balance: tableSecondaryData[0].total_amount });
        form.setFieldsValue({ received: 0 });
        setBalanceChangeAmount(0);
      }
    }

  }, [round])
  //==============================Reverse =============================================
  useEffect(() => {

    const num = tableSecondaryData[0].total_amount;
    const newInteger = parseInt(num);
    const newDecimal = (num - newInteger).toFixed(2).substr(1);
    setRoundDecimalValue(newDecimal);

    setWithDecimal(tableSecondaryData[0].total_amount - newDecimal);
    const totalAmt = tableSecondaryData[0].total_amount - newDecimal;


    if (round) {
      if (balance) {
        form.setFieldsValue({ round_off: newDecimal });
        form.setFieldsValue({ roundoff_amount: totalAmt });
        form.setFieldsValue({ balance: 0 });
        form.setFieldsValue({ received: totalAmt });
        // setBalanceChangeAmount(totalAmt);
      }
      else {
        form.setFieldsValue({ round_off: newDecimal });
        form.setFieldsValue({ roundoff_amount: totalAmt });
        form.setFieldsValue({ balance: totalAmt });
        form.setFieldsValue({ received: 0 });

      }
    }
    else {
      if (balance) {
        form.setFieldsValue({ round_off: 0 });
        form.setFieldsValue({ roundoff_amount: tableSecondaryData[0].total_amount });
        form.setFieldsValue({ balance: 0 });
        form.setFieldsValue({ received: tableSecondaryData[0].total_amount });
        // setBalanceChangeAmount(tableSecondaryData[0].total_amount);
      }
      else {
        form.setFieldsValue({ round_off: 0 });
        form.setFieldsValue({ roundoff_amount: tableSecondaryData[0].total_amount });
        form.setFieldsValue({ balance: tableSecondaryData[0].total_amount });
        form.setFieldsValue({ received: 0 });
        // setBalanceChangeAmount(0);
      }
    }

  }, [tableData])

  const BalanceOnChange = (value) => {
    setBalanceChangeAmount(value)
  }

  useEffect(() => {
    // const WithoutDecimal = tableSecondaryData[0].total_amount - roundDecimalValue;
    // const totalAmt = tableSecondaryData[0].total_amount;

    if (round) {
      if (balance) {
        form.setFieldsValue({ received: withDecimal });
        form.setFieldsValue({ balance: 0 });
        setBalanceChangeAmount(withDecimal);
      }
      else {
        form.setFieldsValue({ received: 0 });
        form.setFieldsValue({ balance: withDecimal });
        setBalanceChangeAmount(0);

      }
    }
    else {
      if (balance) {
        form.setFieldsValue({ received: withOutDecimal });
        form.setFieldsValue({ balance: 0 });
        setBalanceChangeAmount(withOutDecimal);
      }
      else {
        form.setFieldsValue({ received: 0 });
        form.setFieldsValue({ balance: withOutDecimal });
        setBalanceChangeAmount(0);
      }
    }
  }, [balance])

  useEffect(() => {

    let fizedAmount = 0;

    if (round) {
      fizedAmount = withDecimal;

      if (balance) {
        form.setFieldsValue({ received: withDecimal });
        form.setFieldsValue({ balance: 0 });
        setBalanceChange(false);
      }
      else {
        // ===
        let setAmt = balanceChangeAmount;
        let balSetAmt = withDecimal - setAmt;

        if (balSetAmt < 0) {
          setBalanceChange(true);
        }
        else {
          setBalanceChange(false);
        }
        form.setFieldsValue({ received: setAmt });
        form.setFieldsValue({ balance: balSetAmt });
      }
    }
    else {
      fizedAmount = withOutDecimal;
      if (balance) {
        form.setFieldsValue({ received: withOutDecimal });
        form.setFieldsValue({ balance: 0 });
        setBalanceChange(false);
      }
      else {
        // ===
        let setAmt = balanceChangeAmount;
        let balSetAmt = withOutDecimal - setAmt;

        if (balSetAmt < 0) {
          setBalanceChange(true);
        }
        else {
          setBalanceChange(false);
        }

        form.setFieldsValue({ received: setAmt });
        form.setFieldsValue({ balance: balSetAmt });
      }
    }


  }, [balanceChangeAmount])


  // ============== UNIT OPTIONS ============


  const optionsgst = [
    {
      label: '12',
      value: '12',
    },
    {
      label: '18',
      value: '18',
    },
  ]

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

  // +++++++++++++++++++++   Use Effects End +++++++++++++++++++
  // ===============  Hidden Table Data End ==================

  // ===============  Table Data Start ==================
  // const [showGST, setShowGST] = useState(true);

  // const handleToggleGST = (checked) => {
  //   setShowGST(checked);
  // };
  const [showGSTColumn, setShowGSTColumn] = useState(true);

  const handleSwitchChange = (checked) => {
    setShowGSTColumn(checked);
  };


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
              options={options}
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
      dataIndex: 'item_unit',

      render: (text, record) => (
        <>
          <Input
            minWidth={'150px'}
            name={`item_unit${record.key}`}
            disabled={true}
          />

          <Input name={`item_unit${record.key}`} display={'none'} /></>
      )
    },
    {
      title: 'Qty',
      dataIndex: 'qty',
      key: 'qty',
      render: (text, record) => {
        return (
          <Input
            minWidth={'150px'}
            name={`qty${record.key}`}
            disabled={true}
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
      dataIndex: 'price',
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
          name={`price${record.key}`}
          onChange={(value) => handleOnChangePrice(value, record)}
        />
      )
    },
    // {
    //   title: 'Selling Rate',
    //   dataIndex: 'sell',
    //   render: (text, record) => (
    //     <CustomInputNumber precision={2} rules={[
    //       {
    //         required: true,
    //         message: 'This is a required field'
    //       },
    //     ]}
    //       minWidth={'150px'}
    //       min={1.00}
    //       placed={'end'}
    //       name={`sell${record.key}`}
    //       onChange={(value) => handleOnChangeSell(value, record)}
    //     />
    //   )
    // },
    {
      title: 'Discount',
      children: [
        {
          title: '%',
          dataIndex: 'discount_percentage',
          key: 'discount_percentage',
          render: (text, record) => (
            <CustomInputNumber precision={2}
              minWidth={'150px'}
              placed={'end'}
              name={`discount_percentage${record.key}`}
              min={0.00}
              max={100.00}
              onChange={(value) => handleonChangeDiscount(value, record)}
            />
          )
        },
        {
          title: 'Amount',
          dataIndex: 'discount_amt',
          key: 'discount_amt',
          render: (text, record) => (
            <CustomInputNumber precision={2}
              minWidth={'150px'}
              placed={'end'}
              name={`discount_amt${record.key}`}
              disabled
            // onChange={(value) => handleTotalDiscount(value, record)}
            />
          )
        },
      ],
    },
    // showGSTColumn
    //   ?
    {
      title: 'Tax',
      key: 'tax',
      children: [
        {
          title: 'GST %',
          dataIndex: 'tax_percentage',
          key: 'tax_percentage',
          render: (text, record) => (
            <Select
              minWidth={'150px'}
              placed={'end'}
              rules={[
                {
                  required: true,
                  message: 'This is a required field',
                },
              ]}
              name={`tax_percentage${record.key}`}
              min={1}
              max={100}
              options={optionsgst}

              onChange={(value) => handleOnChangeTax(value, record)}
            />
          ),
        },
        {
          title: 'Amount',
          dataIndex: 'tax_amt',
          key: 'tax_amt',
          render: (text, record) => (
            <CustomInputNumber
              minWidth={'150px'}
              precision={2}
              disabled
              placed={'end'}
              name={`tax_amt${record.key}`}
            />
          ),
        },
      ],
    },
    // : null,
    {
      title: (
        <p>Amount</p>
      ),
      dataIndex: 'amount',
      key: 'amount',
      render: (text, record) => (
        <CustomInputNumber precision={2}
          disabled
          minWidth={'150px'}
          placed={'end'}
          name={`amount${record.key}`}
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
      qty: '',
      item_unit: '',
      price_per_unit: '',
      price: '',
      sell: '',
      discount_percentage: '',
      discount_amt: '',
      tax_percentage: '',
      tax_amt: '',
      amount: '',
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
          if (item.qty !== '' || item.amount !== '' || item.discount_amt !== '' || item.tax_amt !== '') {
            totalQuantity += parseFloat(item.qty);
            totalDiscount += parseFloat(item.discount_amt);
            totalTax += parseFloat(item.tax_amt);
            totalAmount += parseFloat(item.amount);
          }
        });

        // update the total_amount value in the tableSecondaryData array
        setTableSecondaryData([{
          total_qty: totalQuantity.toFixed(2),
          total_discount: totalDiscount.toFixed(2),
          total_tax: totalTax.toFixed(2),
          total_amount: totalAmount.toFixed(2)
        }]);

        // setTableFooterData

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
      item.amount = record.amount || 0;
      item.tax_amt = record.tax_amt || 0;
      item.qty = record.qty || 0;
      item.discount_amt = record.discount_amt || 0;
      // item.tax_amt = value || 0;

      // ------ Variables 
      let totalQuantity = 0;
      let totalDiscount = 0;
      let totalTax = 0;
      let totalAmount = 0;

      newData.forEach(item => {
        if (item.qty !== '' || item.amount !== '' || item.discount_amt !== '' || item.tax_amt !== '') {
          totalQuantity += parseFloat(item.qty);
          totalDiscount += parseFloat(item.discount_amt);
          totalTax += parseFloat(item.tax_amt);
          totalAmount += parseFloat(item.amount);
        }
      });

      // update the total_amount value in the tableSecondaryData array
      setTableSecondaryData([{
        total_qty: totalQuantity.toFixed(2),
        total_discount: totalDiscount.toFixed(2),
        total_tax: totalTax.toFixed(2),
        total_amount: totalAmount.toFixed(2)
      }]);

      return newData;
    })
  };

  // ============  OnChange Functions  ==============

  const HandleQty = (value, record) => {
    setTableData(prevState => {
      const newData = [...prevState];
      const index = newData.findIndex(item => record.key === item.key);
      const item = newData[index];
      item.qty = value || 0;
      // item.price = record.price || 0;
      item.price = record.price;

      item.discount_percentage = record.discount_percentage || 0;

      let CalAmount = 0;

      if (item.discount_percentage != 0) {
        const Amt = calculateAmount(item);
        item.discount_amt = (Amt * item.discount_percentage) / 100;
        CalAmount = Amt - item.discount_amt;
      } else {
        CalAmount = calculateAmount(item);
      }

      item.amount = CalAmount;

      HandlePrice(item.price, {
        ...item,
        qty: item.qty,
        amount: CalAmount,
        price: item.price,
      })

      CalculateTotal({
        ...item,
        qty: item.qty,
        amount: CalAmount,
        price: item.price,
      })

      HandleTax(item.tax_percentage, {
        ...item,
        qty: item.qty,
        amount: CalAmount,
        price: item.price,
      })

      HandleDiscount(item.discount_percentage, {
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

      item.qty = record.qty || 0;
      // item.price = value || 0;
      item.price = value;

      item.discount_percentage = record.discount_percentage || 0;

      // const amount = price + tax_amt;
      let CalAmount = 0;

      if (item.discount_percentage != 0) {
        const Amt = calculateAmount(item);
        item.discount_amt = (Amt * item.discount_percentage) / 100;
        CalAmount = Amt - item.discount_amt;
      } else {
        CalAmount = calculateAmount(item);
      }
      item.amount = CalAmount;

      CalculateTotal({
        ...item,
        qty: item.qty,
        price: item.price,
        amount: CalAmount,
      })

      HandleTax(item.tax_percentage, {
        ...item,
        qty: item.qty,
        amount: CalAmount,
        price: item.price,
      })

      return newData;
    });
  }

  const HandleDiscount = (value, record) => {
    setTableData(prevState => {
      const newData = [...prevState];
      const index = newData.findIndex(item => record.key === item.key);
      const item = newData[index];

      const Qty = record.qty || 0;
      // const Price = record.price || 0;
      const Price = record.price;

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

          item.discount_percentage = DiscountPercentage;
          item.discount_amt = DisMinus;
          item.tax_percentage = record.tax_percentage;
          item.tax_amt = taxAmt;
          Amt = ApplyTax;

          CalculateTotal({
            ...item,
            discount_amt: item.discount_amt,
            amount: Amt,
          })
        }
        else {
          const OriginalAmount = calculateAmount(item);
          const TaxPlus = (OriginalAmount * TaxPercentage) / 100;

          const ApplyTax = OriginalAmount + TaxPlus;

          item.tax_percentage = record.tax_percentage;
          item.tax_amt = TaxPlus;
          item.discount_amt = 0;
          Amt = ApplyTax;

          CalculateTotal({
            ...item,
            discount_amt: item.discount_amt,
            amount: Amt,
          })
        }
      }
      else {
        if (DiscountPercentage != 0) {

          const OriginalAmount = calculateAmount(item);
          const DisMinus = (OriginalAmount * DiscountPercentage) / 100;

          const ApplyDiscount = OriginalAmount - DisMinus;
          item.discount_percentage = DiscountPercentage;
          item.discount_amt = DisMinus;
          item.discount_percentage = 0;
          Amt = ApplyDiscount;

          CalculateTotal({
            ...item,
            discount_amt: item.discount_amt,
            amount: Amt,
          })
        }
        else {
          const OriginalAmount = calculateAmount(item);
          item.discount_amt = 0;

          Amt = OriginalAmount;

          CalculateTotal({
            ...item,
            discount_amt: item.discount_amt,
            amount: Amt,
          })
        }
      }

      item.amount = Amt;
      item.discount_percentage = DiscountPercentage;

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

      const setSelectedProduct = tableProducts.find(item => item.item_name === value)

      item.item = setSelectedProduct.item
      item.hsn_code = setSelectedProduct.item_hsn
      item.qty = setSelectedProduct.outer_purchase_qty
      item.item_unit = setSelectedProduct.item_unit
      item.tax_percentage = setSelectedProduct.tax_percentage
      item.discount_percentage = 0
      item.item_name = value;

      let CalAmount = 0;
      item.amount = CalAmount;

      HandlePrice(item.price, {
        ...item,
        qty: item.qty,
        amount: CalAmount,
        price: item.price,
      })

      HandleDiscount(item.discount_percentage, {
        ...item,
        quantity: item.quantity,
        item_cal_total_amt: CalAmount,
        sale_price: item.sale_price,
      })


      return newData;


    });
  }

  const HandleUnit = (value, record) => {
    setTableData(prevState => {
      const newData = [...prevState];
      const index = newData.findIndex(item => record.key === item.key);
      const item = newData[index];
      item.item_unit = value;

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

      const Qty = record.qty || 0;
      // const Price = record.price || 0;
      const Price = record.price;

      const DiscountPercentage = record.discount_percentage || 0;
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

          item.discount_percentage = DiscountPercentage;
          item.discount_amt = DisMinus;
          item.tax_percentage = record.tax_percentage;
          item.tax_amt = taxAmt;
          Amt = ApplyTax;

          CalculateTotal({
            ...item,
            tax_amt: item.tax_amt,
            amount: Amt,
          })
        }
        else {
          const OriginalAmount = calculateAmount(item);
          const TaxPlus = (OriginalAmount * TaxPercentage) / 100;

          const ApplyTax = OriginalAmount + TaxPlus;

          item.tax_percentage = record.tax_percentage;
          item.tax_amt = TaxPlus;
          Amt = ApplyTax;

          CalculateTotal({
            ...item,
            tax_amt: item.tax_amt,
            amount: Amt,
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

          item.discount_percentage = DiscountPercentage;
          item.discount_amt = DisMinus;
          item.tax_amt = 0;
          Amt = ApplyDiscount;

          CalculateTotal({
            ...item,
            tax_amt: item.tax_amt,
            amount: Amt,
          })
        }
        else {
          const OriginalAmount = calculateAmount(item);
          item.tax_amt = 0;

          Amt = OriginalAmount;

          CalculateTotal({
            ...item,
            tax_amt: item.tax_amt,
            amount: Amt,
          })
        }
      }

      item.amount = Amt;
      item.tax_percentage = record.tax_percentage;

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
    const qty = parseFloat(record.qty) || 0;
    const price = parseFloat(record.price) || 0;
    return qty * price;
  }

  //  ======================  Other Functions =========

  // ====================  On Finish Function ============

  const onFinish = (values) => {
    const record = { ...values };
    let result = {
      outer_id: parseInt(id),
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
      paid: record.paid,
      apply_round_off: record.apply_round_off,
      invoice_no: record.invoice_no,
      round_off: parseFloat(record.round_off).toFixed(2),
      grand_total: parseFloat(record.total_amount).toFixed(2),
      sub_total: parseFloat(record.roundoff_amount).toFixed(2),
      qty_total: parseFloat(record.total_qty).toFixed(2),
      tax_total: parseFloat(record.total_tax).toFixed(2),
      discount_total: parseFloat(record.total_discount).toFixed(2),
      paid_amt: parseFloat(record.received || 0).toFixed(2),


      // paid_amt: parseFloat(record.supplier_credit).toFixed(2),
      // paid_amt: parseFloat(record.supplier_debit).toFixed(2),
      balance_amount_new: parseFloat(record.balance).toFixed(2),

      purchase_bill: Object.entries(record)
        .filter(([key]) => key.startsWith('item_name'))
        .map(([key, item]) => {
          const index = key.match(/\d+/)[0];
          const itemKey = `item${index}`;
          const itemName = `item_name${index}`;
          const buyRateKey = `price${index}`;
          const sellKey = `sell${index}`;
          const qtyKey = `qty${index}`;
          const hsnKey = `hsn_code${index}`;
          const mrpKey = `price_per_unit${index}`;
          const unitKey = `item_unit${index}`;
          const taxPercentageKey = `tax_percentage${index}`;
          const discountAmtKey = `discount_amt${index}`;
          const discountPercentageKey = `discount_percentage${index}`;
          const taxAmtKey = `tax_amt${index}`;
          const amountKey = `amount${index}`;

          return {
            item: record[itemKey],
            item_name: record[itemName],
            hsn_code: record[hsnKey],
            item_unit_name: record[unitKey],
            // item_unit_name: record[unitKey],

            item_qty: parseFloat(record[qtyKey]).toFixed(2),
            buy_rate: parseFloat(record[buyRateKey]).toFixed(2),
            // sell: parseFloat(record[sellKey]).toFixed(2),
            price_per_unit: parseFloat(record[mrpKey]).toFixed(2),
            dis_percentage: parseFloat(record[discountPercentageKey]).toFixed(2),
            dis_amt: parseFloat(record[discountAmtKey]).toFixed(2),
            tax_percentage: parseFloat(record[taxPercentageKey]).toFixed(2),
            tax_per_value: parseFloat(record[taxAmtKey]).toFixed(2),
            cal_amt: parseFloat(record[amountKey]).toFixed(2),

          };
        }),
    };
    PurchsePost(result);

  };

  const PurchsePost = (values) => {
    request.post('purchase/outer_purchase/', values)
      .then(function (response) {
        if (response.status == 201) {
          toast.success('Successfully Billed Purchase Entry ')
          form.resetFields();
          setTrigger((trigger) => trigger + 1);
          setTableData(initialData);
          setTableSecondaryData(secondaryData);
          setTableFooterData(footerCalData);
          setRound(false);
          navigate(-1)
        }
        else {

          console.log('Something went Wrong');
        }
      })
      // .catch(function (error) {
      //   toast.error("failed")
      //   console.log(error, 'failedddd');
      // });
      .catch(function (error) {
        console.log(error);
        if (error.response.status == 400) {
          if (error.response.data?.GSTIN == 'Invalid GSTIN') {
            toast.error('Invalid GSTIN');
          }
          else {
            toast.error('please enter a valid Invalid GSTIN');
          }
        }
      });
  }

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
    setSelectedSupplierDetails(!selectedSupplierDetails)
    setTrigger((trigger) => trigger + 1);
    setTableData(initialData);
    setTableSecondaryData(secondaryData);
    setTableFooterData(footerCalData);
    setRound(false);
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
            received: 0,
          }
        }
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >

        <PurchaseFormHeader setSaleorder={setSaleorder} setSelectedSupplierDetails={setSelectedSupplierDetails} trigger={trigger} GetSaleCustomer={GetSaleCustomer} setProductList={setProductList} setInvoiceNumber={setInvoiceNumber} />

        {/* <div style={{ margin: '20px 0' }}>
          Hide: */}
        {/* <Switch checked={showGSTColumn} onChange={handleSwitchChange} /> */}
        <Table columns={columns.filter(Boolean)} data={tableData} pagination={false} />
        <FooterComponent />
        {/* </div> */}

        <div style={{ margin: '20px 0' }}>
          <PurchaseFormFooter BalanceOnChange={BalanceOnChange} HandleCheQueChage={HandleCheQueChage} RoundOffChecked={RoundOffChecked} TotalBalance={TotalBalance} tableSecondaryData={tableSecondaryData} footerCalData={footerCalData} setRoundDecimalValue={setRoundDecimalValue} round={round} />
        </div>

        <Card>
          <Flex flexEnd gap={'10px'}>
            <Button.Primary text={'Submit'} htmlType="submit" disabled={balanceChange} />
            <Button.Danger text={'Cancel'} onClick={onRest} />
          </Flex>
        </Card>
      </Form>

      <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={500} modalTitle={modalTitle} modalContent={modalContent} />
    </Fragment>

  )
}