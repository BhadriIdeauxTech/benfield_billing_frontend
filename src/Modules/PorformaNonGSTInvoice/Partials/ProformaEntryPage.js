import { Card, Col, Form } from "antd"
import React, { Fragment, useEffect, useState } from "react"
import Flex from "../../../Components/Flex";
import { DeleteButtonWrapper, Table } from "../../../Components/Table";
import Button from "../../../Components/Form/Button";
import { DeleteOutlined } from "@ant-design/icons";
import { CustomInputNumber } from "../../../Components/Form/CustomInputNumber";
import { Row } from "../../../Components/Row";
import { ProformaFormHeader } from "./ProformaFormHeader";
import { ProformaFormFooter } from "./ProformaFormFooter";
import { Modal } from "../../../Components/Modal";
import { Select } from "../../../Components/Form/Select";
import dayjs from 'dayjs'
import request from "../../../utils/request";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Notification } from "../../../Layout/partials/NavHeader/actions";



export const EstimateProformaEntryPage = ({ updateRecord, proformTrigger, UpdateForm }) => {

  const dispatch = useDispatch()

  const [form] = Form.useForm();

  const [count, setCount] = useState(1);

  const [editRecord, setEditRecord] = useState({})

  const [isloading, setIsloading] = useState(false)

  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));

  const [getdata, setGetdata] = useState([])

  const [selectedSale, setSelectedSale] = useState({})

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

  const [refDate, setRefDate] = useState(null)  // ---> ref_date
  const [printDated, setPrintDated] = useState(null)  // ---> dated
  const [deliveryNoteDate, setDeliveryNoteDate] = useState(null)  // ---> delivery_note_date

  const [trigger, setTrigger] = useState(0);


  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // =========================  Modal Content End  ===========================

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
    form.setFieldsValue({ nature: selectedSale.nature })
    form.setFieldsValue({ unit: selectedSale.unit })
    form.setFieldsValue({ mobile_number: selectedSale.mobile_number })
    form.setFieldsValue({ state_of_supply: selectedSale.supplier_state })

  }, [selectedSale])


  // ===========  Sale MobileNumber Data =========

  useEffect(() => {
    GetSaleCustomer();
  }, [])

  const GetSaleCustomer = () => {
    request.get('sales/get_detail_new_sale/')
      .then(function (response) {
        setGetdata(response.data.item)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // ----------  Edit details ----------

  const EditGetDetial = 'sales/edit_proforma_new'

  useEffect(() => {
    setEditRecord({})
    if (updateRecord) {
      GetDaleEditData(updateRecord?.id);
    }
  }, [updateRecord])


  const GetDaleEditData = (id) => {
    request.get(`${EditGetDetial}/${id}/`)
      .then(function (response) {
        setEditRecord(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    if (Object.entries(editRecord).length != 0) {
      form.setFieldsValue(editRecord?.sale);

      const fromdatee = new Date(editRecord?.sale?.invoice_date)
      const dateFormat = 'YYYY-MM-DD';

      const FrmDateee = dayjs(fromdatee).format(dateFormat);
      const get_ref_date = editRecord?.sale?.ref_date ? new Date(editRecord?.sale?.ref_date) : '';
      const get_printed_date = editRecord?.sale?.dated ? new Date(editRecord?.sale?.dated) : '';
      const get_delivery_note_date = editRecord?.sale?.delivery_note_date ? new Date(editRecord?.sale?.delivery_note_date) : '';
      
      const ref_date = get_ref_date != '' ? dayjs(get_ref_date).format(dateFormat) : '';
      const dated = get_printed_date != '' ? dayjs(get_printed_date).format(dateFormat) : '';
      const delivery_note_date = get_delivery_note_date != '' ? dayjs(get_delivery_note_date).format(dateFormat) : '';

      form.setFieldsValue({
        invoice_date: dayjs(FrmDateee),
        address: editRecord?.sale?.Address,
        ref_date: ref_date != '' ? dayjs(ref_date) : '',
        dated: dated != '' ? dayjs(dated) : '',
        delivery_note_date: delivery_note_date != '' ? dayjs(delivery_note_date) : '',
      });

      setRefDate(editRecord?.sale?.ref_date);
      setPrintDated(editRecord?.sale?.dated);
      setDeliveryNoteDate(editRecord?.sale?.delivery_note_date);

      if (editRecord?.sale_table) {
        const tableData = editRecord?.sale_table.map((value, index) => ({
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
          qty_total: editRecord?.sale?.qty_total,
          discount_total: editRecord?.sale?.discount_total,
          tax_total: editRecord?.sale?.tax_total,
          sub_total: editRecord?.sale?.sub_total,
        },
      ];

      setTableSecondaryData(secData)
      setReceivedAmount(editRecord?.sale?.received_amt);
      setRoundAmount(editRecord?.sale?.round_off_value);
      setRound(editRecord?.sale?.round_off);
      setPayType(editRecord?.sale?.payment_type);
    }
  }, [editRecord, proformTrigger])


  const initialData = [
    {
      key: 0,
      av_qty: '',
      discount_percentage: '',
      item: '',
      item_cal_total_amt: '',
      item_hsn: '',
      item_name: '',
      nature: '',
      outer_source: '',
      price_amount: '',
      price_percentage: '',
      quantity: '',
      sale_discount: '',
      sale_price: '',
      take_qty: '',
      // tax_cal_amt: '',
      // tax_percentage: '',
      unit: '',
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

  const footerCalData = [
    {
      round_off_value: '',
      grand_total: '',
      total_rowamount: '',
      received_amt: '',
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
      // form.setFieldsValue({ [`item${record.key}`]: record.item });
      // form.setFieldsValue({ [`item_hsn${record.key}`]: record.item_hsn });
      // form.setFieldsValue({ [`nature${record.key}`]: record.nature });
      // form.setFieldsValue({ [`quantity${record.key}`]: record.quantity });
      // form.setFieldsValue({ [`av_qty${record.key}`]: record.av_qty });
      form.setFieldsValue({ [`take_qty${record.key}`]: record.take_qty });
      form.setFieldsValue({ [`outer_source${record.key}`]: record.outer_source });
      // form.setFieldsValue({ [`unit${record.key}`]: record.unit });
      // form.setFieldsValue({ [`sale_price${record.key}`]: record.sale_price });
      form.setFieldsValue({ [`price_percentage${record.key}`]: record.price_percentage });
      // form.setFieldsValue({ [`price_amount${record.key}`]: record.price_amount });
      form.setFieldsValue({ [`discount_percentage${record.key}`]: record.discount_percentage });
      // form.setFieldsValue({ [`sale_discount${record.key}`]: record.sale_discount });
      // form.setFieldsValue({ [`tax_cal_amt${record.key}`]: record.tax_cal_amt });
      // form.setFieldsValue({ [`item_cal_total_amt${record.key}`]: record.item_cal_total_amt });
    });

    form.setFieldsValue({ [`qty_total`]: tableSecondaryData[0].qty_total });
    form.setFieldsValue({ [`discount_total`]: tableSecondaryData[0].discount_total });
    form.setFieldsValue({ [`tax_total`]: tableSecondaryData[0].tax_total });
    form.setFieldsValue({ [`sub_total`]: tableSecondaryData[0].sub_total });

  }, [tableData])

  // useEffect(() => {
  //   form.setFieldsValue({ invoice_no: invoiceNumber })
  // }, [invoiceNumber])

  useEffect(() => {

    if (updateRecord) {
      form.setFieldsValue({ invoice_no: editRecord?.sale?.invoice_no })
    }
    else {
      form.setFieldsValue({ invoice_no: invoiceNumber })

    }
  }, [invoiceNumber, editRecord, updateRecord])

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
      render: (text, record, index) => {
        return (
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
        );
      },
    },
    {
      title: 'HSN Code',
      dataIndex: 'item_hsn',
      key: 'item_hsn',
      render: (text, record) => {
        return (
          <div style={{
            minWidth: '100px',
            height: '100%',
            textAlign: 'center'
          }}>
            <h1>{text}</h1>
          </div>
        )
      }
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      render: (text, record) => (
        <div style={{
          minWidth: '100px',
          height: '100%',
          textAlign: 'center'
        }}>
          <h1>{text}</h1>
        </div>
      )
    },
    {
      title: 'Available Qty',
      dataIndex: 'av_qty',
      render: (text, record) => (
        <div style={{
          minWidth: '100px',
          height: '100%',
          textAlign: 'center'
        }}>
          <h1>{text ? parseFloat(text).toFixed(0) : ''}</h1>
        </div>
      )
    },
    {
      title: 'Take Qty',
      dataIndex: 'take_qty',
      render: (text, record) => (
        <CustomInputNumber
          minWidth={'150px'}
          placed={'end'}
          precision={0}
          name={`take_qty${record.key}`}
          onChange={(value) => handleOnChangeQuantity(value, record)}
        />
      )
    },
    {
      title: 'Outer Purchase Qty',
      dataIndex: 'outer_source',
      render: (text, record) => (
        <CustomInputNumber
          minWidth={'150px'}
          placed={'end'}
          precision={0}
          name={`outer_source${record.key}`}
          onChange={(value) => handleOnChangeOuterSource(value, record)}
        />
      )
    },
    {
      title: 'Qty',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text, record) => {
        return (
          <div style={{
            minWidth: '100px',
            height: '100%',
            textAlign: 'center'
          }}>
            <h1>{text ? parseFloat(text).toFixed(0) : 0}</h1>
          </div>
        )
      }
    },

    {
      title: 'Price',
      dataIndex: 'sale_price',
      render: (text, record) => (
        <div style={{
          minWidth: '100px',
          height: '100%',
          textAlign: 'center'
        }}>
          <h1>{text ? parseFloat(text).toFixed(2) : 0}</h1>
        </div>
      )
    },
    {
      title: 'Price %',
      dataIndex: 'price_percentage',
      key: 'price_percentage',
      render: (text, record) => (
        <CustomInputNumber
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
        <div style={{
          minWidth: '100px',
          height: '100%',
          textAlign: 'center'
        }}>
          <h1>{text ? parseFloat(text).toFixed(2) : 0}</h1>
        </div>
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
            <div style={{
              minWidth: '100px',
              height: '100%',
              textAlign: 'center'
            }}>
              <h1>{text ? parseFloat(text).toFixed(2) : 0}</h1>
            </div>
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
        <div style={{
          minWidth: '100px',
          height: '100%',
          textAlign: 'center'
        }}>
          <h1>{text ? parseFloat(text).toFixed(2) : 0}</h1>
        </div>
      )
    }
  ]

  // ===============  Table Data End ==================


  // ==================  Table Functions Start ==================

  // ----------------- Add Row Function 

  const AddRow = () => {
    const newData = {
      key: count,
      av_qty: '',
      discount_percentage: '',
      item: '',
      item_cal_total_amt: '',
      item_hsn: '',
      item_name: '',
      nature: '',
      outer_source: '',
      price_amount: '',
      price_percentage: '',
      quantity: '',
      sale_discount: '',
      sale_price: '',
      take_qty: '',
      // tax_cal_amt: '',
      // tax_percentage: '',
      unit: '',
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
      item.tax_cal_amt = record.tax_cal_amt || 0;
      item.quantity = record.quantity || 0;
      item.sale_discount = record.sale_discount || 0;
      // item.price_amount = record.price_amount || 0;
      item.tax_cal_amt = record.tax_cal_amt || 0;

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

      setTableFooterData(prev => ({
        ...prev,
        grand_total: totalAmount.toFixed(2)
      }));

      return newData;
    })
  };

  // ============  OnChange Functions  ==============

  const HandleQty = (value, record) => {
    setTableData(prevState => {
      const newData = [...prevState];
      const index = newData.findIndex(item => record.key === item.key);
      const item = newData[index];

      const avQty = record.av_qty;

      if (value <= avQty) {
        item.take_qty = value || 0;
      } else {
        item.take_qty = avQty;
        toast.error('Entered quantity exceeds the available quantity');
      }

      const takeQty = parseInt(item.take_qty) || 0;
      const outerSource = parseInt(item.outer_source) || 0;
      const qty = takeQty + outerSource;

      item.quantity = qty || 0;
      item.sale_price = record.sale_price || 0;
      item.discount_percentage = record.discount_percentage || 0;
      item.price_percentage = record.price_percentage || 0;
      item.price_amount = record.price_amount || 0;
      item.av_qty = avQty;
      item.outer_source = record.outer_source || 0;
      let CalAmount = 0;

      if (item.discount_percentage !== 0) {
        const Amt = calculateAmount(item);
        item.sale_discount = (Amt * item.discount_percentage) / 100;
        CalAmount = Amt - item.sale_discount;
      } else {
        CalAmount = calculateAmount(item);
      }

      HandlePrice(item.sale_price, {
        ...item,
        quantity: item.quantity,
        item_cal_total_amt: CalAmount,
        sale_price: item.sale_price,
      });

      CalculateTotal({
        ...item,
        quantity: item.quantity,
        item_cal_total_amt: CalAmount,
        sale_price: item.sale_price,
        price_amount: item.price_amount,
      });

      HandleTax(item.tax_percentage, {
        ...item,
        quantity: item.quantity,
        item_cal_total_amt: CalAmount,
        sale_price: item.sale_price,
      });

      HandleDiscount(item.discount_percentage, {
        ...item,
        quantity: item.quantity,
        item_cal_total_amt: CalAmount,
        sale_price: item.sale_price,
      });

      return newData;
    });
  };

  const HandlePrice = (value, record) => {
    setTableData(prevState => {
      const newData = [...prevState];
      const index = newData.findIndex(item => record.key === item.key);
      const item = newData[index];

      item.quantity = record.quantity || 0;

      item.price_amount = record.price_amount || 0;
      item.sale_price = value || 0;
      item.discount_percentage = record.discount_percentage;

      // const amount = sale_price + tax_cal_amt;
      let CalAmount = 0;

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

  const handleOuterSource = (value, record) => {
    // const outerSource = value !== '' ? parseInt(value) : 0;

    setTableData(prevState => {
      let CalAmount = 0;
      const newData = prevState.map(item => {
        if (item.key === record.key) {
          item.discount_percentage = record.discount_percentage || 0;
          item.price_percentage = record.price_percentage || 0;
          item.take_qty = record.take_qty || 0;
          const takeQty = item.take_qty || 0;
          const quantity = parseInt(takeQty) + parseInt(value);
          const saleDiscount = record.sale_discount || 0;

          return {

            ...item,
            outer_source: value,
            quantity: quantity || takeQty,
            sale_discount: saleDiscount,
          };
        }

        return item;
      });

      newData.forEach(item => {
        if (item.discount_percentage !== 0) {
          const Amt = calculateAmount(item);
          item.sale_discount = (Amt * item.discount_percentage) / 100;
          CalAmount = Amt - item.sale_discount;
        } else {
          CalAmount = calculateAmount(item);
        }

        HandlePrice(item.sale_price, {
          ...item,
          quantity: item.quantity,
          item_cal_total_amt: CalAmount,
          sale_price: item.sale_price,
        });

        CalculateTotal({
          ...item,
          quantity: item.quantity,
          item_cal_total_amt: CalAmount,
          sale_price: item.sale_price,
          price_amount: item.price_amount,
        });

        HandleTax(item.tax_percentage, {
          ...item,
          quantity: item.quantity,
          item_cal_total_amt: CalAmount,
          sale_price: item.sale_price,
        });

        HandleDiscount(item.discount_percentage, {
          ...item,
          quantity: item.quantity,
          item_cal_total_amt: CalAmount,
          sale_price: item.sale_price,
          sale_amount: item.sale_amount,
        });
      });

      return newData;
    });
  };

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

      let priceAmt = 0;

      if (item.price_percentage !== 0) {
        const priceIncrease = (salePrice * pricePercentage) / 100;
        item.price_amount = Number((salePrice + priceIncrease).toFixed(2));
      } else {
        item.price_amount = value || 0;
        item.price_amount = Number(item.sale_price);
      }

      item.item_cal_total_amt = item.quantity * item.price_amount;

      CalculateTotal({
        ...item,
        quantity: item.quantity,
        // price_amount: priceAmt,
        item_cal_total_amt: item.quantity * item.price_amount,
      });
      newData.forEach(item => {
        HandlePrice(item.sale_price, item);
        CalculateTotal(item);
        HandleTax(item.tax_percentage, item);
        HandleDiscount(item.discount_percentage, item);
      });

      return newData;
    });
  };

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

      const itemId = item.item;
      const itemName = item.item_name;

      let CalAmount = 0;

      HandlePrice(item.sale_price, {
        ...item,
        quantity: item.quantity,
        item_cal_total_amt: CalAmount,
        sale_price: item.sale_price,
      });


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

  const handleOnChangeOuterSource = (value, record) => {
    handleOuterSource(value, record)
  }

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

  const HandleCheQueChage = (value) => {

    if (value === 'Cheque') {
      form.setFieldsValue({ credit_period: '' })
    } else if (value === 'Credit') {
      form.setFieldsValue({ reference_no: '' })
    } else if (value != 'Cheque' || value != 'Credit') {
      form.setFieldsValue({ credit_period: '' })
      form.setFieldsValue({ reference_no: '' })
    }
  }


  // -----------------------  Final Value Function ----------

  useEffect(() => {
    finalValueCal();
  }, [payType, round, receivedAmount, tableSecondaryData, roundAmount])

  const finalValueCal = () => {

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
        received_val = roundValue; // -> Received Value
        balance_val = 0;  // -> balance Value
        grand_total_val = roundValue; // -> Grand Total
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
          toast.warning('Received Amount')
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
    form.setFieldsValue({ received_amt: received_val })
    setTableFooterData((prevData) => ({
      ...prevData,
      balance: balance_val,
      round_off_value: round_off_val,
      received_amt: received_val,
      grand_total: grand_total_val,
    }));
  }


  //  ======================  Other Functions =========

  // ====================  On Finish Function ============

  const ProformPost = (values) => {
    setIsloading(true)
    request.post('sales/add_proforma_new/', values)
      .then(function (response) {
        setIsloading(false)
        if (response.status == 201) {
          toast.success('Successfully Billed Estimate Proforma Entry ')
          form.resetFields();
          setTrigger((trigger) => trigger + 1);
          GetSaleCustomer();
          setTableData(initialData);
          setTableSecondaryData(secondaryData);
          setTableFooterData(footerCalData);
          setReceivedAmount(0);
          setRound(false);
          setPayType('Cash');
          dispatch(Notification());
        }
        else {
          toast.success('Successfully Billed Estimate Proforma Entry ')
        }
      })
      .catch(function (error) {
        setIsloading(false)
        if (error.response && error.response.status === 400) {
          if (error.response.data) {
            if (error.response.data.GSTIN) {
              toast.warn(error.response.data.GSTIN[0]);
            } else if (error.response.data.mobile_number) {
              toast.warn(error.response.data.mobile_number[0]);
            } else {
              toast.error('Failed');
            }
          } else {
            toast.error('Failed.');
          }
        }
      });
  }

  const EditPostURL = 'sales/edit_proforma_new'

  const ProformUpdate = (values) => {
    setIsloading(true);
    request.put(`${EditPostURL}/${updateRecord?.id}/`, values)
      .then(function (response) {
        if (response.status == 201) {
          toast.success('Successfully Billed Estimate Proforma Entry ')
          setIsloading(false);
          form.resetFields();
          setTrigger((trigger) => trigger + 1);
          GetSaleCustomer();
          setTableData(initialData);
          setTableSecondaryData(secondaryData);
          setTableFooterData(footerCalData);
          setReceivedAmount(0);
          setRound(false);
          setPayType('Cash');
          UpdateForm();
          dispatch(Notification());
        }
        else {
          setIsloading(false);
          toast.success('Successfully Update Estimate Proforma Entry ')
        }

      })
      .catch(function (error) {
        setIsloading(false);
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
      email: record.email,
      credit_period: record.credit_period,
      payment_type: record.payment_type,
      reference_no: record.reference_no,
      recevied_status: record.recevied_status,
      round_off: record.round_off,
      invoice_date: record.invoice_date,
      old_balance: record.old_balance,
      invoice_no: record.invoice_no,

      delivery_note: record.delivery_note,
      reference_no_new: record.reference_no_new,
      ref_date: refDate,
      other_references: record.other_references,
      buyer_order_no: record.buyer_order_no,
      dated: printDated,
      dispatch_no: record.dispatch_no,
      delivery_note_date: deliveryNoteDate,
      dispatch_through: record.dispatch_through,
      destination: record.destination,
      termsofdelivery: record.termsofdelivery,

      qty_total: parseFloat(tableSecondaryData[0]?.qty_total).toFixed(2),
      discount_total: parseFloat(tableSecondaryData[0]?.discount_total).toFixed(2),
      tax_total: 0,
      sub_total: parseFloat(tableSecondaryData[0]?.sub_total).toFixed(2),
      round_off_value: parseFloat(tableFooterData?.round_off_value).toFixed(2) || 0,
      grand_total: parseFloat(tableFooterData?.grand_total).toFixed(2),
      received_amt: parseFloat(tableFooterData?.received_amt || 0).toFixed(2),
      balance: parseFloat(tableFooterData?.balance).toFixed(2),

      // ---> Sales Array
      sales: tableData?.map((data) => ({
        av_qty: data?.av_qty,
        discount_percentage: parseFloat(data?.discount_percentage).toFixed(2),
        item: data?.item,
        item_cal_total_amt: parseFloat(data?.item_cal_total_amt).toFixed(2),
        item_hsn: data?.item_hsn,
        item_name: data?.item_name,
        nature: data?.nature,
        outer_source: data?.outer_source,
        price_amount: data?.price_amount,
        price_percentage: data?.price_percentage,
        quantity: parseFloat(data?.quantity).toFixed(2),
        sale_discount: parseFloat(data?.sale_discount).toFixed(2),
        sale_price: parseFloat(data?.sale_price).toFixed(2),
        take_qty: data?.take_qty,
        tax_cal_amt: 0,
        tax_percentage: 0,
        unit: data?.unit,
      })),
    };

    if (updateRecord) {
      ProformUpdate(result)
    } else {
      ProformPost(result);
    }
    // console.log(result, 'resultresultpost');
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
    if (updateRecord) {
      form.setFieldsValue({ invoice_no: updateRecord?.invoice_no })
    } else {
      form.setFieldsValue({ invoice_no: invoiceNumber })
    }
    setSelectedSale(!selectedSale)
    setTrigger((trigger) => trigger + 1);
    GetSaleCustomer();
    setTableData(initialData);
    setTableSecondaryData(secondaryData);
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

        <ProformaFormHeader
          trigger={trigger} setSelectedDate={setSelectedDate}
          selectedSale={selectedSale} setSelectedSale={setSelectedSale}
          setInvoiceNumber={setInvoiceNumber} />

        <div style={{ margin: '20px 0' }}>
          <Table columns={columns.filter(Boolean)} data={tableData} pagination={false} />
          <FooterComponent />
        </div>

        <div style={{ margin: '20px 0' }}>
          <ProformaFormFooter
            payType={payType}
            setPayType={setPayType}
            round={round}
            setRound={setRound}
            receivedDisable={receivedDisable}
            setRoundAmount={setRoundAmount}
            setReceivedAmount={setReceivedAmount}
            HandleCheQueChage={HandleCheQueChage}
            tableSecondaryData={tableSecondaryData}
            tableFooterData={tableFooterData}
            finalValueCal={finalValueCal}
            setRefDate={setRefDate}
            setPrintDated={setPrintDated}
            setDeliveryNoteDate={setDeliveryNoteDate}
             />
        </div>

        <Card>
          {updateRecord ?
            <Flex flexEnd gap={'10px'}>
              <Button.Success text={'Update'} htmlType="submit" disabled={submitDisable} loading={isloading} />
            </Flex> :
            <Flex flexEnd gap={'10px'}>
              <Button.Primary text={'Submit'} htmlType="submit" disabled={submitDisable} loading={isloading} />
              <Button.Danger text={'Cancel'} onClick={onRest} htmlType="cancel" disabled={submitDisable} loading={isloading} />
            </Flex>
          }
        </Card>
      </Form>

      <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={500} modalTitle={modalTitle} modalContent={modalContent} />
    </Fragment>
  )
}