import { Card, Col, Form } from "antd"
import React, { Fragment, useEffect, useState } from "react"
import Flex from "../../../Components/Flex";
import { DeleteButtonWrapper, Table } from "../../../Components/Table";
import Button from "../../../Components/Form/Button";
import { DeleteOutlined } from "@ant-design/icons";
import { CustomInputNumber } from "../../../Components/Form/CustomInputNumber";
import { Row } from "../../../Components/Row";
import { Modal } from "../../../Components/Modal";
import { Select } from "../../../Components/Form/Select";
import Input from "../../../Components/Form/Input";
import dayjs from 'dayjs'
import request from "../../../utils/request";
import { toast } from "react-toastify";
import { EstimateFormFooter } from "./EstimateFormFooter";
import { EstimateFormHeader } from "./EstimateFormHeader";



export const EstimateEntryPage = ({ editRecord, EditTrigger, closeingModel }) => {

  const [form] = Form.useForm();

  const [count, setCount] = useState(1);

  const [switchJd, setSwitchJd] = useState(true)

  const [isloading, setIsloading] = useState(false)

  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));

  const [getdata, setGetdata] = useState([])

  const [getdataCustomr, setGetdataCustomr] = useState([]) //==== Customer details state

  const [selectedSale, setSelectedSale] = useState({})

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // ================  SalesFormFooter checked ==========
  const [invoiceNumber, setInvoiceNumber] = useState({})

  // -----------------  Balance Checking ------------
  const [balanceChange, setBalanceChange] = useState(false);

  const [trigger, setTrigger] = useState(0);

  // =========================  Modal Content Start  ===========================
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };



  // ===========  ITEM MODAL SHOW  ==================

  useEffect(() => {
    form.setFieldsValue({ customer: selectedSale.id })
    form.setFieldsValue({ customer_name: selectedSale.customer_name })
    form.setFieldsValue({ GSTIN: selectedSale.gstin })
    form.setFieldsValue({ email: selectedSale.email })
    form.setFieldsValue({ company_name: selectedSale.customer_company_name })
    form.setFieldsValue({ address: selectedSale.customer_address })
    form.setFieldsValue({ delivery_location: selectedSale.customer_address })
    form.setFieldsValue({ old_balance: selectedSale.credit_amt_balance })
    form.setFieldsValue({ advanced_amt: selectedSale.advanced_amt })
    form.setFieldsValue({ item_hsn: selectedSale.item_hsn })
    form.setFieldsValue({ unit: selectedSale.unit })
    form.setFieldsValue({ mobile_number: selectedSale.mobile_number })
    form.setFieldsValue({ state_of_supply: selectedSale.supplier_state })

  }, [selectedSale])


  // ===========  Sale MobileNumber Data =========

  useEffect(() => {
    GetSaleCustomer();
  }, [])

  const GetSaleCustomer = () => {
    request.get('quotation/get_detail_esti/')
      .then(function (response) {
        setGetdata(response.data?.item)
        setGetdataCustomr(response.data?.customer)
        setInvoiceNumber(response.data?.ref_no)
      })
      .catch(function (error) {
        console.log(error);
      });
  }




  // ====== Table data function =========

  const initialData = [
    {
      key: 0,
      item_name: '',
      item: '',
      item_hsn: '',
      nature: '',
      description: '',
      quantity: '',
      av_qty: '',
      unit: '',
      sale_price: '',
      price_percentage: '',
      price_amount: '',
      discount_percentage: '',
      sale_discount: '',
      tax_percentage: '',
      tax_cal_amt: '',
      item_cal_total_amt: '',
    }
  ];

  const secondaryData = [
    {
      qty_total: '',
      discount_total: '',
      tax_total: '',
      sub_total: '',
    },
  ];



  const [tableData, setTableData] = useState(initialData);
  const [tableSecondaryData, setTableSecondaryData] = useState(secondaryData);


  // +++++++++++++++++++++   Use Effects Start +++++++++++++++++++

  // ------------------  Dynamic Table  --------------------

  useEffect(() => {
    tableData.forEach(record => {
      form.setFieldsValue({ [`item_name${record.key}`]: record.item_name });
      form.setFieldsValue({ [`item${record.key}`]: record.item });
      form.setFieldsValue({ [`item_hsn${record.key}`]: record.item_hsn });
      form.setFieldsValue({ [`nature${record.key}`]: record.nature });
      form.setFieldsValue({ [`quantity${record.key}`]: record.quantity });
      form.setFieldsValue({ [`av_qty${record.key}`]: record.av_qty });
      form.setFieldsValue({ [`take_qty${record.key}`]: record.take_qty });
      form.setFieldsValue({ [`outer_source${record.key}`]: record.outer_source });
      form.setFieldsValue({ [`unit${record.key}`]: record.unit });
      form.setFieldsValue({ [`sale_price${record.key}`]: record.sale_price });
      form.setFieldsValue({ [`price_percentage${record.key}`]: record.price_percentage });
      form.setFieldsValue({ [`price_amount${record.key}`]: record.price_amount });
      form.setFieldsValue({ [`discount_percentage${record.key}`]: record.discount_percentage });
      form.setFieldsValue({ [`sale_discount${record.key}`]: record.sale_discount });
      form.setFieldsValue({ [`tax_percentage${record.key}`]: record.tax_percentage });
      form.setFieldsValue({ [`tax_cal_amt${record.key}`]: record.tax_cal_amt });
      form.setFieldsValue({ [`item_cal_total_amt${record.key}`]: record.item_cal_total_amt });
    });

    form.setFieldsValue({ [`qty_total`]: tableSecondaryData[0].qty_total });
    form.setFieldsValue({ [`discount_total`]: tableSecondaryData[0].discount_total });
    form.setFieldsValue({ [`tax_total`]: tableSecondaryData[0].tax_total });
    form.setFieldsValue({ [`sub_total`]: tableSecondaryData[0].sub_total });
    form.setFieldsValue({ "grand_total": tableSecondaryData[0].sub_total });
    form.setFieldsValue({ "balance": tableSecondaryData[0].sub_total });

  }, [tableData])

  useEffect(() => {
    if (editRecord) {
      form.setFieldsValue({ ref_no: editRecord?.ref_no })
    } else {
      form.setFieldsValue({ ref_no: invoiceNumber })
    }
  }, [invoiceNumber, editRecord])



  // +++++++++++++++++++++   Use Effects End +++++++++++++++++++


  // =======  Edit Details Function =====

  useEffect(() => {
    if (editRecord) {

      form.setFieldsValue(editRecord);
      form.setFieldsValue({ address: editRecord?.Address });

      const fromdatee = new Date(editRecord?.invoice_date)
      const dateFormat = 'YYYY-MM-DD';
      const FrmDateee = dayjs(fromdatee).format(dateFormat);

      // setInvoiceNumber(editRecord?.ref_no)

      form.setFieldsValue({
        invoice_date: dayjs(FrmDateee),
      })

      if (editRecord?.sales) {
        const tableData = editRecord?.sales.map((value, index) => ({
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
          sub_total: editRecord?.grand_total,
        },
      ];

      setTableSecondaryData(secData)
      // setTableFooterData(footData)
      // setReceivedAmount(editRecord?.sale?.received_amt);
      // setRoundAmount(editRecord?.sale?.round_off_value);
      // setRound(editRecord?.sale?.round_off);
      // setPayType(editRecord?.sale?.payment_type);
    }
  }, [editRecord, EditTrigger])

  // =======  Edit Details Function End =====





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
      render: (text, record, index) => {


        return (
          <>
            <Select
              rules={[
                {
                  required: true,
                  message: 'This is a required field',
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
        );
      },
    },

    {
      title: 'HSN Code',
      dataIndex: 'item_hsn',
      key: 'item_hsn',

      render: (text, record) => {
        return (
          <>
            <CustomInputNumber
              minWidth={'150px'}
              name={`item_hsn${record.key}`}
              disabled

            />
            <Input
              minWidth={'150px'}
              placed={'end'}
              name={`nature${record.key}`}
              display={'none'}
            />
          </>
        )
      }
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      render: (text, record) => (
        <Input
          minWidth={'150px'}
          placed={'end'}
          name={`unit${record.key}`}
          onChange={(value) => handleOnChangeUnit(value, record)}
          rules={[
            {
              required: true,
              message: 'This is a required field'
            },
          ]}
        />
      )
    },
    {
      title: 'Qty',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text, record) => (
        <CustomInputNumber
          minWidth={'150px'}
          style={{ textAlign: 'center' }}
          value={record.quantity}
          name={`quantity${record.key}`}
          onChange={(value) => handleOnChangeQuantity(value, record)}
          rules={[
            {
              required: true,
              message: 'This is a required field',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (parseFloat(value) <= 0) {
                  return Promise.reject('Quantity must be greater than 1');
                }
                return Promise.resolve();
              },
            }),
          ]}
        />
      )
    },

    {
      title: 'Price',
      dataIndex: 'sale_price',
      render: (text, record) => (
        <CustomInputNumber precision={2} rules={[
          {
            required: true,
            message: 'This is a required field'
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (parseFloat(value) <= 0) {
                return Promise.reject('Price must be greater than 1');
              }
              return Promise.resolve();
            },
          }),
        ]}
          minWidth={'150px'}
          min={1.00}
          placed={'end'}
          name={`sale_price${record.key}`}
          onChange={(value) => handleOnChangePrice(value, record)}
        />
      )
    },
    {
      title: 'Price %',
      dataIndex: 'price_percentage',
      key: 'price_percentage',
      render: (text, record) => (
        <CustomInputNumber
          //  rules={[
          //   {
          //     required: true,
          //     message: 'This is a required field'
          //   },
          // ]}
          precision={0}
          minWidth={'150px'}
          min={0.00}
          max={100.00}
          placed={'end'}
          value={0}
          defaultValue={0}
          name={`price_percentage${record.key}`}
          onChange={(value) => handleOnChangePricePercentage(value, record)}
        />
      )
    },
    {
      title: 'Price Amount',
      dataIndex: 'price_amount',
      key: 'price_amount',
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
          name={`price_amount${record.key}`}
          disabled
          onChange={handlepriceamount}
        // onChange={(value) => handleOnChangePrice(value, record)}
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
              max={100.00}
              onChange={(value) => handleonChangeDiscount(value, record)}
            />
          )
        },
        {
          title: 'Amount',
          // dataIndex: 'discount_amt',
          dataIndex: 'sale_discount',
          key: 'sale_discount',
          render: (text, record) => (
            <CustomInputNumber precision={2}
              minWidth={'150px'}
              placed={'end'}
              name={`sale_discount${record.key}`}
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
          // dataIndex: 'tax_amt',
          dataIndex: 'tax_cal_amt',
          key: 'tax_cal_amt',
          render: (text, record) => (
            <CustomInputNumber
              precision={2}
              minWidth={'150px'}
              disabled
              placed={'end'}
              name={`tax_cal_amt${record.key}`}
            />
          )
        },
      ],
    },
    {
      title: (
        <p>Amount</p>
      ),
      // dataIndex: 'amount',
      dataIndex: 'item_cal_total_amt',
      key: 'item_cal_total_amt',
      render: (text, record) => (
        <CustomInputNumber precision={2}
          disabled
          minWidth={'150px'}
          placed={'end'}
          name={`item_cal_total_amt${record.key}`}
        />
      )
    }

  ]

  // ===============  Table Data End ==================


  // ==================  Table Functions Start ==================

  // ----------------- Add Row Function 

  const AddRow = () => {
    const newData = {
      key: count,
      item: '',
      item_name: '',
      // itemCode: '',
      item_hsn: '',
      description: '',
      quantity: '',
      av_qty: '',
      unit: '',
      sale_price: '',
      discount_percentage: '',
      sale_discount: '',
      tax_percentage: '',
      tax_cal_amt: '',
      item_cal_total_amt: '',
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
          if (item.quantity !== '' || item.item_cal_total_amt !== '' || item.sale_discount !== '' || item.tax_cal_amt !== '') {
            totalQuantity += parseFloat(item.quantity);
            totalDiscount += parseFloat(item.sale_discount);
            totalTax += parseFloat(item.tax_cal_amt);
            totalAmount += parseFloat(item.item_cal_total_amt);
          }
        });

        // update the grand_total value in the tableSecondaryData array
        setTableSecondaryData([{
          qty_total: totalQuantity.toFixed(2),
          discount_total: totalDiscount.toFixed(2),
          tax_total: totalTax.toFixed(2),
          sub_total: totalAmount.toFixed(2)
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
      item.item_cal_total_amt = record.item_cal_total_amt || 0;
      item.quantity = record.quantity || 0;
      item.sale_discount = record.sale_discount || 0;
      item.tax_cal_amt = record.tax_cal_amt || 0;
      // item.price_amount = record.price_amount || 0;

      // ------ Variables 
      let totalQuantity = 0;
      let totalDiscount = 0;
      let totalTax = 0;
      let totalAmount = 0;

      newData.forEach(item => {
        if (item.quantity !== '' || item.item_cal_total_amt !== '' || item.sale_discount !== '' || item.tax_cal_amt !== '') {
          totalQuantity += parseFloat(item.quantity);
          totalDiscount += parseFloat(item.sale_discount);
          totalTax += parseFloat(item.tax_cal_amt);
          totalAmount += parseFloat(item.item_cal_total_amt);
        }
      });

      // update the grand_total value in the tableSecondaryData array
      setTableSecondaryData([{
        qty_total: totalQuantity.toFixed(2),
        discount_total: totalDiscount.toFixed(2),
        tax_total: totalTax.toFixed(2),
        sub_total: totalAmount.toFixed(2)
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
      item.quantity = value || 0;
      item.sale_price = record.sale_price || 0;
      item.discount_percentage = record.discount_percentage || 0;
      item.price_percentage = record.price_percentage || 0;
      let CalAmount = 0;

      if (item.discount_percentage != 0) {
        const Amt = calculateAmount(item);
        item.sale_discount = (Amt * item.discount_percentage) / 100;
        CalAmount = Amt - item.sale_discount;
      } else {
        CalAmount = calculateAmount(item);
      }

      item.amount = CalAmount;

      HandlePrice(item.sale_price, {
        ...item,
        quantity: item.quantity,
        item_cal_total_amt: CalAmount,
        sale_price: item.sale_price,
      })

      CalculateTotal({
        ...item,
        quantity: item.quantity,
        item_cal_total_amt: CalAmount,
        sale_price: item.sale_price,
      })

      HandleTax(item.tax_percentage, {
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

      item.quantity = record.quantity || 0;

      item.sale_price = value || 0;
      item.discount_percentage = record.discount_percentage;

      let CalAmount = 0;
      // item.price_amount = value || 0;
      const pricePercentage = item.price_percentage || 0;
      const salePrice = Number(item.sale_price) || 0;

      if (pricePercentage !== 0) {
        const priceIncrease = (salePrice * pricePercentage) / 100;
        item.price_amount = Number((salePrice + priceIncrease).toFixed(2));
      } else {
        item.price_amount = value || 0;

        item.price_amount = Number(item.sale_price);
      }


      if (item.discount_percentage != 0) {

        const Amt = calculateAmount(item);
        item.sale_discount = (Amt * item.discount_percentage) / 100;
        CalAmount = Amt - item.sale_discount;
      } else {
        CalAmount = calculateAmount(item);
      }
      item.item_cal_total_amt = CalAmount;

      CalculateTotal({
        ...item,
        quantity: item.quantity,
        sale_price: item.sale_price,
        item_cal_total_amt: CalAmount,
      })

      HandleTax(item.tax_percentage, {
        ...item,
        quantity: item.quantity,
        item_cal_total_amt: CalAmount,
        sale_price: item.sale_price,
      })

      return newData;
    });
  }

  const HandlePricePer = (value, record) => {
    setTableData(prevState => {
      const newData = [...prevState];
      const index = newData.findIndex(item => record.key === item.key);
      const item = newData[index];

      item.quantity = record.quantity || 0;
      item.sale_price = record.sale_price || 0;
      item.take_qty = record.take_qty || 0;
      item.price_percentage = value || 0;

      const pricePercentage = item.price_percentage || 0;
      const salePrice = Number(item.sale_price) || 0;

      if (pricePercentage !== 0) {
        const priceIncrease = (salePrice * pricePercentage) / 100;
        item.price_amount = Number((salePrice + priceIncrease).toFixed(2));

      } else {
        item.price_amount = value || 0;

        item.price_amount = Number(item.sale_price);
      }

      item.item_cal_total_amt = item.quantity * item.price_amount;

      CalculateTotal(item);
      newData.forEach(item => {
        HandlePrice(item.sale_price, item);
        CalculateTotal(item);
        HandleTax(item.tax_percentage, item);
        HandleDiscount(item.discount_percentage, item);
      });

      return newData;
    });
  };

  const handlepriceamount = (record) => {
    setTableData(prevState => {
      const newData = [...prevState];
      const index = newData.findIndex(item => record.key === item.key);
      const item = newData[index];

      item.sale_price = record.sale_price || 0;
      return newData;
    });
  }

  const HandleDiscount = (value, record) => {
    setTableData(prevState => {
      const newData = [...prevState];
      const index = newData.findIndex(item => record.key === item.key);
      const item = newData[index];

      const Qty = record.quantity || 0;
      const sale_price = record.sale_price || 0;
      const DiscountPercentage = value || 0;
      const TaxPercentage = record.tax_percentage || 0;
      const SaleAmt = record.sale_amount || 0;

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
          item.sale_discount = DisMinus;
          item.tax_percentage = TaxPercentage;
          item.tax_cal_amt = taxAmt;
          Amt = ApplyTax;

          CalculateTotal({
            ...item,
            sale_discount: item.sale_discount,
            item_cal_total_amt: Amt,
          })
        }
        else {
          const OriginalAmount = calculateAmount(item);
          const TaxPlus = (OriginalAmount * TaxPercentage) / 100;

          const ApplyTax = OriginalAmount + TaxPlus;

          item.tax_percentage = TaxPercentage;
          item.tax_cal_amt = TaxPlus;
          item.sale_discount = 0;
          Amt = ApplyTax;

          CalculateTotal({
            ...item,
            sale_discount: item.sale_discount,
            item_cal_total_amt: Amt,
          })
        }
      }
      else {
        if (DiscountPercentage != 0) {

          const OriginalAmount = calculateAmount(item);
          const DisMinus = (OriginalAmount * DiscountPercentage) / 100;

          const ApplyDiscount = OriginalAmount - DisMinus;
          item.discount_percentage = DiscountPercentage;
          item.sale_discount = DisMinus;
          item.discount_percentage = 0;
          Amt = ApplyDiscount;

          CalculateTotal({
            ...item,
            sale_discount: item.sale_discount,
            item_cal_total_amt: Amt,
          })
        }
        else {
          const OriginalAmount = calculateAmount(item);
          item.sale_discount = 0;

          Amt = OriginalAmount;

          CalculateTotal({
            ...item,
            sale_discount: item.sale_discount,
            item_cal_total_amt: Amt,
          })
        }
      }

      item.item_cal_total_amt = Amt;
      item.discount_percentage = DiscountPercentage;

      return newData;
    })
  }

  const HandleProduct = (value, record) => {
    setTableData(prevState => {
      const newData = [...prevState];
      const index = newData.findIndex(item => record.key === item.key);
      const item = newData[index];


      const setSelectedSale = getdata.find(item => item.item_name === value);
      if (setSelectedSale) {
        item.item = setSelectedSale.id;
        item.item_name = setSelectedSale.item_name
        item.item_hsn = setSelectedSale.item_hsn;
        item.nature = setSelectedSale.nature;
        item.unit = setSelectedSale.item_unit;
        item.sale_price = setSelectedSale.buy_rate;
        item.price_amount = setSelectedSale.buy_rate;
        item.av_qty = setSelectedSale.avilable_qty;
        item.tax_percentage = setSelectedSale.gst_percentage;
      }

      const setSelectedSalePanel = getdata.find(item => item.item_name === value);
      if (setSelectedSalePanel) {
        item.item_hsn = setSelectedSalePanel.item_hsn;
        item.unit = setSelectedSalePanel.item_unit;
      }

      const isItemAlreadyAdded = newData.some(
        (item, i) => i !== index && item.item_name === value
      );

      if (isItemAlreadyAdded) {
        item.item = '';
        item.item_name = '';
        item.item_hsn = '';
        item.nature = '';
        item.unit = '';
        item.sale_price = '';
        item.price_amount = '';
        item.av_qty = '';
        item.tax_percentage = '';
        toast.error("Product already added in the table.");
        return newData;
      }

      item.item_name = value;
      let CalAmount = 0;

      const itemId = item.item;
      const itemName = item.item_name;

      item.amount = CalAmount;

      HandlePrice(item.sale_price, {
        ...item,
        quantity: item.quantity,
        item_cal_total_amt: CalAmount,
        sale_price: item.sale_price,
      })
      return newData;
    });
  };

  const HandleTax = (value, record) => {
    setTableData(prevState => {
      const newData = [...prevState];
      const index = newData.findIndex(item => record.key === item.key);
      const item = newData[index];

      const Qty = record.quantity || 0;
      const sale_price = record.sale_price || 0;
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
          item.sale_discount = DisMinus;
          item.tax_percentage = TaxPercentage;
          item.tax_cal_amt = taxAmt;
          Amt = ApplyTax;

          CalculateTotal({
            ...item,
            tax_cal_amt: item.tax_cal_amt,
            item_cal_total_amt: Amt,
          })
        }
        else {
          const OriginalAmount = calculateAmount(item);
          const TaxPlus = (OriginalAmount * TaxPercentage) / 100;

          const ApplyTax = OriginalAmount + TaxPlus;

          item.tax_percentage = TaxPercentage;
          item.tax_cal_amt = TaxPlus;
          Amt = ApplyTax;

          CalculateTotal({
            ...item,
            tax_cal_amt: item.tax_cal_amt,
            item_cal_total_amt: Amt,
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
          item.sale_discount = DisMinus;
          item.tax_cal_amt = 0;
          Amt = ApplyDiscount;

          CalculateTotal({
            ...item,
            tax_cal_amt: item.tax_cal_amt,
            item_cal_total_amt: Amt,
          })
        }
        else {
          const OriginalAmount = calculateAmount(item);
          item.tax_cal_amt = 0;

          Amt = OriginalAmount;

          CalculateTotal({
            ...item,
            tax_cal_amt: item.tax_cal_amt,
            item_cal_total_amt: Amt,
          })
        }
      }

      item.item_cal_total_amt = Amt;
      item.tax_percentage = TaxPercentage;

      return newData;
    })
  } // ---------------- 1.TotalQuantity ONCHANGE Function


  const handleOnChangeQuantity = (value, record) => {
    const quantity = parseInt(value) || 0;
    HandleQty(quantity, record);
  };

  const handleOnChangeUnit = (value, record) => {
    setTableData(prevState => {
      const newData = [...prevState];
      const index = newData.findIndex(item => record.key === item.key);
      const item = newData[index];

      item.unit = value.target ? value.target.value : value;

      return newData;
    });
  };

  const handleOnChangePrice = (value, record) => {
    HandlePrice(value, record)
  }

  const handleOnChangePricePercentage = (value, record) => {
    HandlePricePer(value, record)
  }

  const handleonChangeDiscount = (value, record) => {
    HandleDiscount(value, record)
  }

  const itemDetails = getdata.map(item => ({
    label: item.item_name,
    value: item.item_name
  }));


  const handleOnChangeProduct = (value, record) => {
    HandleProduct(value, record)
  }

  const handleOnChangeTax = (value, record) => {
    HandleTax(value, record)
  }


  // -------------- Handle Total Row Amount  --------------
  const calculateAmount = (record) => {
    const quantity = parseFloat(record.quantity) || 0;
    const sale_amount = parseFloat(record.price_amount) || 0;
    return quantity * sale_amount
  }



  //  ======================  Other Functions =========

  // ====================  On Finish Function ============

  const QuotationPost = (values) => {
    setIsloading(true)
    request.post('quotation/add_esti_quo/', values)
      .then(function (response) {
        if (response.status == 201) {
          toast.success('Successfully Billed Quotation Entry ')
          form.resetFields();
          setTrigger((trigger) => trigger + 1);
          GetSaleCustomer();
          setTableData(initialData);
          setTableSecondaryData(secondaryData);
        }
        else {
          toast.success('Successfully Billed Quotation Entry')
        }
        setIsloading(false)
      })
      .catch(function (error) {
        if (error.response && error.response.status === 400) {
          if (error.response.data) {
            if (error.response.data.GSTIN) {
              toast.warn(error.response.data.GSTIN[0]);
            } else if (error.response.data.mobile_number) {
              toast.warn(error.response.data.mobile_number[0]);
            } else {
              toast.error('Failed.');
            }
          } else {
            toast.error('Failed.');
          }
        }
        setIsloading(false)
      });
  }

  // ------- Edit url function 

  const Edit_Quotation_url = 'quotation/edit_estimate_quotation'

  const QuotationEdit = (values) => {
    setIsloading(true)
    request.put(`${Edit_Quotation_url}/${editRecord?.id}/`, values)
      .then(function (response) {
        if (response.status == 201) {
          toast.success('Successfully Update Quotation Entry ')
          form.resetFields();
          setTrigger((trigger) => trigger + 1);
          GetSaleCustomer();
          setTableData(initialData);
          setTableSecondaryData(secondaryData);
          if (closeingModel) {
            closeingModel()
          }
        }
        else {
          toast.success('Successfully Update Quotation Entry')
        }
        setIsloading(false)
      })
      .catch(function (error) {
        if (error.response && error.response.status === 400) {
          if (error.response.data) {
            if (error.response.data.GSTIN) {
              toast.warn(error.response.data.GSTIN[0]);
            } else if (error.response.data.mobile_number) {
              toast.warn(error.response.data.mobile_number[0]);
            } else {
              toast.error('Failed.');
            }
          } else {
            toast.error('Failed.');
          }
        }
        setIsloading(false)
      });
  }


  const onFinish = (values) => {
    const record = {
      ...values,
      invoice_date: values?.invoice_date === null ? '' : dayjs(selectedDate).format('YYYY-MM-DD') ? dayjs(values?.invoice_date).format('YYYY-MM-DD') : dayjs(values?.invoice_date).format('YYYY-MM-DD'),
    };

    let result = {
      customer: record.customer,
      customer_name: record.customer_name,
      company_name: record.company_name,
      Address: record.address,
      delivery_location: record.delivery_location,
      mobile_number: record.mobile_number,
      state_of_supply: record.state_of_supply,
      GSTIN: record.GSTIN,
      email: record.email,
      credit_period: record.credit_period,
      payment_type: record.payment_type,
      recevied_status: record.recevied_status,
      round_off: record.round_off,
      ref_no: record.ref_no,
      invoice_date: record.invoice_date,
      nature: record.nature,
      qty_total: parseFloat(record.qty_total).toFixed(2),
      discount_total: parseFloat(record.discount_total).toFixed(2),
      tax_total: parseFloat(record.tax_total).toFixed(2),
      sub_total: parseFloat(record.sub_total).toFixed(2),
      grand_total: parseFloat(record.grand_total).toFixed(2),

      sales: Object.entries(record)
        .filter(([key]) => key.startsWith('item_hsn'))
        .map(([key, item_hsn]) => {
          const index = key.match(/\d+/)[0];
          const itemNamekey = `item_name${index}`;
          const itemkey = `item${index}`;
          const nature = `nature${index}`;
          const availableQtyKey = `av_qty${index}`
          const takeqty = `take_qty${index}`;
          const outersource = `outer_source${index}`;
          const quantityKey = `quantity${index}`;
          const unitKey = `unit${index}`;
          const saleKey = `sale_price${index}`;
          const pricePercentage = `price_percentage${index}`;
          const priceAmount = `price_amount${index}`;
          const discountPercentageKey = `discount_percentage${index}`;
          const discountAmtKey = `sale_discount${index}`;
          const taxPercentageKey = `tax_percentage${index}`;
          const taxamyKey = `tax_cal_amt${index}`;
          const totaltaxantKey = `item_cal_total_amt${index}`;
          return {
            item_hsn,
            item_name: record[itemNamekey],
            item: record[itemkey],
            unit: record[unitKey],
            av_qty: record[availableQtyKey],
            nature: record[nature],
            take_qty: record[takeqty] || 0,
            outer_source: record[outersource] || 0,
            // take_qty: parseFloat(record[takeqty]).toFixed(2),
            // outer_purchase: parseFloat(record[outerpurchase]).toFixed(2),
            price_percentage: record[pricePercentage] || 0,
            price_amount: record[priceAmount],
            // price_percentage: parseFloat(record[pricePercentage]).toFixed(2),
            quantity: parseFloat(record[quantityKey]).toFixed(2),
            sale_price: parseFloat(record[saleKey]).toFixed(2),
            discount_percentage: parseFloat(record[discountPercentageKey]).toFixed(2),
            sale_discount: parseFloat(record[discountAmtKey]).toFixed(2),
            tax_percentage: parseFloat(record[taxPercentageKey]).toFixed(2),
            tax_cal_amt: parseFloat(record[taxamyKey]).toFixed(2),
            item_cal_total_amt: parseFloat(record[totaltaxantKey]).toFixed(2),

          };
        }),
    };

    if (editRecord) {
      QuotationEdit(result)
    } else {
      QuotationPost(result);
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
      form.setFieldsValue({ ref_no: editRecord?.ref_no })
    } else {
      form.setFieldsValue({ ref_no: invoiceNumber })
    }
    // setInvoiceNumber(editRecord?.ref_no)

    setSelectedSale(!selectedSale)
    setTrigger((trigger) => trigger + 1);
    GetSaleCustomer();
    setTableData(initialData);
    setTableSecondaryData(secondaryData);
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
            invoice_date: dayjs(),
            payment_type: 'Cash',
            recevied_status: false,
            round_off: false,
            round_off_value: 0,
            received_amt: 0,
          }
        }
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}>

        <EstimateFormHeader trigger={trigger}
          setSelectedDate={setSelectedDate} selectedSale={selectedSale}
          setSelectedSale={setSelectedSale} setInvoiceNumber={setInvoiceNumber}
          setSwitchJd={setSwitchJd} switchJd={switchJd} editRecord={editRecord}
          getdataCustomr={getdataCustomr}
        />


        <div style={{ margin: '20px 0' }}>
          <Table columns={columns.filter(Boolean)} data={tableData} pagination={false} />
          <FooterComponent />
        </div>


        <div style={{ margin: '20px 0' }}>
          <EstimateFormFooter />
        </div>

        <Card>

          {editRecord ? <Flex flexEnd gap={'10px'}>
            <Button.Success text={'Update'} htmlType="submit" disabled={balanceChange} loading={isloading} />
          </Flex> :
            <Flex flexEnd gap={'10px'}>
              <Button.Primary text={'Submit'} htmlType="submit" disabled={balanceChange} loading={isloading} />
              <Button.Danger text={'Cancel'} onClick={onRest} htmlType="cancel" />
            </Flex>
          }
        </Card>
      </Form>

      <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={500} modalTitle={modalTitle} modalContent={modalContent} />
    </Fragment>
  )
}