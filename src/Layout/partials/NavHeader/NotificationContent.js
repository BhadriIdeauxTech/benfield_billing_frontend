import { useNavigate } from 'react-router-dom'
import { Table } from 'antd'
import { TableStyle } from './Style'
import dayjs from 'dayjs'
import { Fragment } from 'react'
import Flex from '../../../Components/Flex'

export const NotificationContent = ({ outpurchase, dataSource }) => {

  const nevigate = useNavigate()

  const columns = [
    {
      title: 'Customer',
      dataIndex: 'customer_name',
      render: (customer_name, record) => {
        return (
          <span style={{ color: `${record.color}` }}>
            {
              customer_name
            }
          </span>
        );
      }
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      render: (amount, record) => {
        return (
          <span style={{ color: `${record.color}` }}>
            {
              amount
            }
          </span>
        );
      }
    },
    {
      title: 'Due Date',
      dataIndex: 'date',
      render: (date, record) => {
        const DATE = dayjs(date).format('DD\\MM\\YYYY')
        return (
          <span style={{ color: `${record.color}` }}>
            {DATE}
          </span>
        );
      }
    },
  ]

  return (
    <div>
      <h1 style={{ padding: "10px ", color: 'darkorange' }}>
        NOTIFICATION
      </h1>
      <br />
      {
        dataSource?.length > 0 && (
          <Fragment>
            <h1>Unpaid Bills Alert !!!</h1>
            <TableStyle>
              <Table columns={columns} dataSource={dataSource} className="custom-table"
                scroll={{ y: 200, x: 300 }} pagination={false} /><br />
            </TableStyle>
          </Fragment>
        )
      }
      {outpurchase?.length > 0 ?
        ((<Flex center gap={'10px'} centerVertically>
            <h1>Pending Purchase Entry</h1><br />
          <button style={{background:"red",color:'#fff', padding:'5px 12px', borderRadius:'10px',cursor:'pointer'}} onClick={() => nevigate('pending_entry/')}>
            Go To
          </button>
        </Flex>)) :
        ('')
      }
    </div>
  )
}
