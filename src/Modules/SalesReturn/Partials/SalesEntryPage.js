import { Card, Col, Divider, Form, Popover } from "antd"
import React, { Fragment, useEffect, useState } from "react"
import Flex from "../../../Components/Flex";
import { DeleteButtonWrapper, Table } from "../../../Components/Table";
import Button from "../../../Components/Form/Button";
import { DeleteOutlined } from "@ant-design/icons";
import { CustomInputNumber } from "../../../Components/Form/CustomInputNumber";
import { Row } from "../../../Components/Row";
import { SaleHeader } from "../../SalesReturn/Partials/style";
import { SalesFormHeader } from "./SalesFormHeader";
import { SalesFormFooter } from "./SalesFormFooter";
import { Modal } from "../../../Components/Modal";
import { Select } from "../../../Components/Form/Select";
import Input from "../../../Components/Form/Input";
import dayjs from 'dayjs'
import OutSourceData from './Data'
import { TableInputNumber } from "../../../Components/Form/TableInputNumber";
import request from "../../../utils/request";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Notification } from "../../../Layout/partials/NavHeader/actions";



export const SalesEntryPage = ({ setSaleorder, getSaleorders }) => {

  const [count, setCount] = useState(1);

  const [state, setState] = useState(false)

  const [sample, setSample] = useState()
  const [files, setFiles] = useState(null)

  const dispatch = useDispatch()
  const [switchValue, setSwitchValue] = useState(false)
  const [roundOff, setRoundOff] = useState(false);
  const [payType, setPayType] = useState('Cash');
  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // ================  SalesFormFooter checked ==========
  const [round, setRound] = useState(false);
  const [roundDecimalValue, setRoundDecimalValue] = useState(null);
  const [balance, setBalance] = useState(false);

  // -----------------  Balance Checking ------------
  const [withDecimal, setWithDecimal] = useState(null);
  const [withOutDecimal, setWithOutDecimal] = useState(null);
  const [balanceChangeAmount, setBalanceChangeAmount] = useState(0);
  const [balanceChange, setBalanceChange] = useState(false);

  const [trigger, setTrigger] = useState(0);
  const [returnNumber, setReturnNumber] = useState(null)

  const [selectedSupplierDetails, setSelectedSupplierDetails] = useState({})
  const [selectedSupplierBillDetails, setSelectedSupplierBillDetails] = useState({})


  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));

  // =============  Product Select  =============
  const [productList, setProductList] = useState([])
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
    form.setFieldsValue({ gstin: selectedSupplierDetails?.gstin })
    form.setFieldsValue({ email_id: selectedSupplierDetails?.email })
    form.setFieldsValue({ company_name: selectedSupplierDetails?.customer_company_name })
    form.setFieldsValue({ address: selectedSupplierDetails?.customer_address })
    form.setFieldsValue({ state: selectedSupplierDetails?.supplier_state })
    form.setFieldsValue({ bill_no: selectedSupplierDetails?.invoive_number })
    form.setFieldsValue({ mobile_number: selectedSupplierDetails?.mobile_number })
    form.setFieldsValue({ customer_id: selectedSupplierDetails?.id })
    form.setFieldsValue({ customer_name: selectedSupplierDetails?.customer_name })
    form.setFieldsValue({ nature: selectedSupplierDetails?.nature })
    form.setFieldsValue({ customer_debit: selectedSupplierDetails?.debit_amt })

  }, [selectedSupplierDetails])


  const Setreset = () => {
    setTableData(initialData);
    setTableSecondaryData(secondaryData);
    setTableFooterData(footerCalData);
    setRound(false);
  }

  useEffect(() => {
    form.setFieldsValue({ return_number: returnNumber })

  }, [returnNumber])

  useEffect(() => {
    form.setFieldsValue({ invoive_number: selectedSupplierBillDetails?.invoice_no })
    form.setFieldsValue({ invoive_date: selectedSupplierBillDetails?.invoice_date })
    form.setFieldsValue({ sale_id: selectedSupplierBillDetails?.id })
  }, [selectedSupplierBillDetails])

  // ===========  ITEM MODAL SHOW  ==================
  const handleItemModalShow = () => {
    setModalTitle("Add Item");
    setModalContent(<ItemModalViewContent />);
    showModal();
  };

  const handleItemModalShows = () => {
    setModalTitle("Add Item");
    setModalContent(<ItemModalViewContents />);
    showModal();
  };

  const ItemModalViewContent = () => {
    return (
      <h1>Vijay</h1>
    )
  };

  const ItemModalViewContents = () => {
    return (
      <h1>checkingggggggggg</h1>
    )
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
  const HandleCheQueChage = (value) => {

    if (value === 'Cheque') {
      form.setFieldsValue({ paid: false })

      const totalAmt = tableSecondaryData[0].total_amount - roundDecimalValue;

      if (round) {
        form.setFieldsValue({received:'0.00'})      
        form.setFieldsValue({ balance: totalAmt });
        form.setFieldsValue({ grand_total: totalAmt });
      }
      else {
        console.log({ balance: tableSecondaryData[0].total_amount },'Show Balance')
        form.setFieldsValue({received:'0.00'})      
        form.setFieldsValue({ balance: tableSecondaryData[0].total_amount });
        form.setFieldsValue({ grand_total: tableSecondaryData[0].total_amount });
      }
    }
  }
  // =========================  Other Functions start  =========================

  // =========================  Other Functions End  =========================

  const initialData = [
    {
      key: 0,
      item_name: '',
      item: '',
      hsn_code: '',
      description: '',
      qty: '',
      sell_qty: '',
      unit: '',
      price: '',
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


  // +++++++++++++++++++++   Use Effects Start +++++++++++++++++++

  // ------------------  Dynamic Table  --------------------

  useEffect(() => {
    tableData.forEach(record => {
      form.setFieldsValue({ [`item_name${record.key}`]: record.item_name });
      form.setFieldsValue({ [`item${record.key}`]: record.item });
      form.setFieldsValue({ [`nature${record.key}`]: record.nature });
      form.setFieldsValue({ [`hsn_code${record.key}`]: record.hsn_code });
      form.setFieldsValue({ [`sell_qty${record.key}`]: record.sell_qty });
      form.setFieldsValue({ [`qty${record.key}`]: record.qty });
      form.setFieldsValue({ [`unit${record.key}`]: record.unit });
      form.setFieldsValue({ [`price${record.key}`]: record.price });
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
  // --------------------- Round Off Reverse order -----------------

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
        // setBalanceChangeAmount(0);
   
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
//-------------------------------------------------------------------------------
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




  // +++++++++++++++++++++   Use Effects End +++++++++++++++++++
  // ===============  Hidden Table Data End ==================

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
            <Input name={`item${record.key}`} display={'none'} />
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
          <>
            <CustomInputNumber
              minWidth={'150px'}
              name={`hsn_code${record.key}`}
              disabled
            />
            <Input minWidth={'150px'}
              placed={'end'}
              name={`nature${record.key}`} display={'none'} />
          </>

        )
      }
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      key: 'C',
      render: (text, record) => {
        return (
          <CustomInputNumber
            minWidth={'150px'}
            name={`unit${record.key}`}
            disabled
          />
        )
      }
    },
    {
      title: 'Sell Qty',
      dataIndex: 'sell_qty',
      key: 'sell_qty',
      render: (text, record) => {
        return (
          <CustomInputNumber
            minWidth={'150px'}
            name={`sell_qty${record.key}`}
            disabled
          />
        )
      }
    },
    {
      title: 'Qty',
      dataIndex: 'qty',
      key: 'qty',
      render: (text, record) => {
        return (

          <TableInputNumber
            minWidth={'150px'}
            style={{ textAlign: 'center' }}
            onChange={(value) => handleOnChangeQuantity(value, record)}
            name={`qty${record.key}`}
            rules={[
              {
                required: true,
                message: 'This is a required field'
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (parseFloat(value) <= 0) {
                    return Promise.reject('Quantity must be greater than 1');
                  }
                  return Promise.resolve();
                },
              }),
            ]} />

        )
      }
    },
    {
      title: 'Price',
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
          disabled
          name={`price${record.key}`}
          onChange={(value) => handleOnChangePrice(value, record)}
        />
      )
    },
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
              disabled
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
    {
      title: 'Tax',
      children: [
        {
          title: 'GST %',
          dataIndex: 'tax_percentage',
          key: 'tax_percentage',
          render: (text, record) => (
            <CustomInputNumber
              minWidth={'150px'}
              placed={'end'}
              name={`tax_percentage${record.key}`}
              min={1}
              max={100}
              // disabled
              precision={0}
              rules={[
                {
                  required: true,
                  message: 'This is a required field'
                },
              ]}
              onChange={(value) => handleOnChangeTax(value, record)}
            />
          )
        },
        {
          title: 'Amount',
          dataIndex: 'tax_amt',
          key: 'tax_amt',
          render: (text, record) => (
            <CustomInputNumber
              precision={2}
              minWidth={'150px'}
              disabled
              placed={'end'}
              name={`tax_amt${record.key}`}
            />
          )
        },
      ],
    },
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
      item_name: '',
      item: '',
      hsnCode: '',
      sell_qty: '',
      qty: '',
      unit: '',
      price: '',
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

      // if(record.)
      if (record.sell_qty >= value) {
        item.qty = value;
      }
      else {
        item.qty = record.sell_qty;
        toast.error('Entered quantity exceeds the available quantity');
      }

      item.price = record.price || 0;
      item.discount_percentage = record.discount_percentage;

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

      return newData;
    });
  }

  const HandlePrice = (value, record) => {
    setTableData(prevState => {
      const newData = [...prevState];
      const index = newData.findIndex(item => record.key === item.key);
      const item = newData[index];

      item.qty = record.qty || 0;
      item.price = value || 0;
      item.discount_percentage = record.discount_percentage;

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
      const Price = record.price || 0;
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
          item.tax_percentage = TaxPercentage;
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

          item.tax_percentage = TaxPercentage;
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

      const setSelectedProduct = productList.find(item => item.item_name === value);

      item.item = setSelectedProduct.item;
      item.hsn_code = setSelectedProduct.item_hsn;
      item.nature = setSelectedProduct.nature;
      item.unit = setSelectedProduct.unit;
      item.sell_qty = setSelectedProduct.quantity;
      item.price = setSelectedProduct.price_amount;
      item.discount_percentage = setSelectedProduct.discount_percentage;
      item.discount_amt = setSelectedProduct.sale_discount;
      item.tax_amt = setSelectedProduct.tax_cal_amt;
      item.tax_percentage = setSelectedProduct.tax_percentage;

      const isItemAlreadyAdded = newData.some(
        (item, i) => i !== index && item.item_name === value
      );

      if (isItemAlreadyAdded) {
        item.item = '';
        item.hsn_code = '';
        item.nature = '';
        item.unit = '';
        item.sell_qty = '';
        item.price = '';
        item.discount_percentage = '';
        item.discount_amt = '';
        item.tax_amt = '';
        item.tax_percentage = '';
        toast.error("Product already added in the table.");
        return newData;
      }
      item.item_name = value;
      return newData;
    });
  }

  const HandleTax = (value, record) => {

    setTableData(prevState => {
      const newData = [...prevState];
      const index = newData.findIndex(item => record.key === item.key);
      const item = newData[index];

      const Qty = record.qty || 0;
      const Price = record.price || 0;
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
          item.tax_percentage = TaxPercentage;
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

          item.tax_percentage = TaxPercentage;
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
      item.tax_percentage = TaxPercentage;

      return newData;
    })
  }

  // ---------------- 1.TotalQuantity ONCHANGE Function
  const handleOnChangeQuantity = (value, record) => {
    HandleQty(value, record)
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
    const record = { ...values, selected_date: selectedDate };

    let result = {
      sale_id: record.sale_id,
      customer: record.customer_id,
      customer_name: record.customer_name,
      company_name: record.company_name,
      invoice_no: record.invoive_number,
      return_no: record.return_number,
      mobile_number: record.mobile_number,
      Address: record.address,
      state_of_supply: record.state,
      invoice_date: record.invoive_date,
      return_date: record.selected_date,
      GSTIN: record.gstin,
      email: record.email_id,
      payment_type: record.supplier_pay_type,
      paid: record.paid,
      round_off: record.round_status,
      reference_no: record.refno,

      round_off_value: parseFloat(record.round_off).toFixed(2),
      grand_total: parseFloat(record.roundoff_amount).toFixed(2),
      sub_total: parseFloat(record.total_amount).toFixed(2),
      qty_total: parseFloat(record.total_qty).toFixed(2),
      tax_total: parseFloat(record.total_tax).toFixed(2),

      discount_total: parseFloat(record.total_discount).toFixed(2),

      paid_amt: parseFloat(record.received || 0).toFixed(2) ,
      balance: parseFloat(record.balance).toFixed(2),

      sales: Object.entries(record)
        .filter(([key]) => key.startsWith('item_name'))
        .map(([key, item_name]) => {
          const index = key.match(/\d+/)[0];
          const itemKey = `item${index}`;
          const buyRateKey = `price${index}`;
          const natureKey = `nature${index}`;
          const qtyKey = `qty${index}`;
          const hsnKey = `hsn_code${index}`;
          const unitKey = `unit${index}`;
          const taxPercentageKey = `tax_percentage${index}`;
          const discountAmtKey = `discount_amt${index}`;
          const discountPercentageKey = `discount_percentage${index}`;
          const taxAmtKey = `tax_amt${index}`;
          const amountKey = `amount${index}`;


          return {
            item_name,
            item: record[itemKey],
            item_hsn: record[hsnKey],
            unit: record[unitKey],
            nature: record[natureKey],
            quantity: parseFloat(record[qtyKey]).toFixed(2),
            sale_price: parseFloat(record[buyRateKey]).toFixed(2),
            discount_percentage: parseFloat(record[discountPercentageKey]).toFixed(2),
            sale_discount: parseFloat(record[discountAmtKey]).toFixed(2),
            tax_percentage: parseFloat(record[taxPercentageKey]).toFixed(2),
            tax_cal_amt: parseFloat(record[taxAmtKey]).toFixed(2),
            item_cal_amt: parseFloat(record[amountKey]).toFixed(2),
          };
        }),
    };
    SalesPost(result);

  };

  const SalesPost = (values) => {
    request.post('sales/add_salereturn/', values)
      .then(function (response) {
        if (response.status == 201) {
          toast.success('Successfully Billed Sales return Entry ')
          form.resetFields();
          setTrigger((trigger) => trigger + 1);
          setTableData(initialData);
          setTableSecondaryData(secondaryData);
          setTableFooterData(footerCalData);
          setRound(false);
          setPayType('Cash');
          dispatch(Notification());
        }
        else {
          toast.success('Successfully Billed Sales return Entry ')

        }
      })
      .catch(function (error) {
        if (error.response && error.response.status === 400) {
          if (error.response.data) {
            if (error.response.data.gstin) {
              toast.warn(error.response.data.gstin[0]);
            } else if (error.response.data.mobile_number) {
              toast.warn(error.response.data.mobile_number[0]);
            } else {
              toast.error('Failed.');
            }
          } else {
            toast.error('Failed');
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
    form.setFieldsValue({return_no:returnNumber})
    setSelectedSupplierDetails (!selectedSupplierDetails)
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
            selected_date: dayjs(),
            supplier_pay_type: 'Cash',
            paid: false,
            round_status: false,
            round_off: 0,
            received: 0,
          }
        }
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}>
        <SalesFormHeader  setSelectedDate={setSelectedDate} setSample={setSample} Setreset={Setreset} setProductList={setProductList} setSelectedSupplierBillDetails={setSelectedSupplierBillDetails} setReturnNumber={setReturnNumber} setSaleorder={setSaleorder} trigger={trigger} setSelectedSupplierDetails={setSelectedSupplierDetails} />

        <div style={{ margin: '20px 0' }}>
          <Table columns={columns.filter(Boolean)} data={tableData} pagination={false} />
          <FooterComponent />
        </div>


        <div style={{ margin: '20px 0' }}>
          <SalesFormFooter payType={payType} setPayType={setPayType} BalanceOnChange={BalanceOnChange} RoundOffChecked={RoundOffChecked} HandleCheQueChage={HandleCheQueChage} TotalBalance={TotalBalance} tableSecondaryData={tableSecondaryData} footerCalData={footerCalData} setRoundDecimalValue={setRoundDecimalValue} round={round} />
        </div>

        <Card>
          <Flex flexEnd gap={'10px'}>
            <Button.Primary text={'Submit'} htmlType="submit" disabled={balanceChange} />
            <Button.Danger text={'Cancel'} onClick={onRest}  />
          </Flex>
        </Card>
      </Form>

      <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={500} modalTitle={modalTitle} modalContent={modalContent} />
    </Fragment>
  )
}