import React, { useEffect, useState } from 'react'
import Flex from '../../../../Components/Flex';
import Button from '../../../../Components/Form/Button'
import { Table } from '../../../../Components/Table'
import { Modal as Modals } from '../../../../Components/Modal';
import { TopTitle } from '../../../../Components/Form/TopTitle';
import ViewMember from './ViewMember';
import request from '../../../../utils/request';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { TbHandClick, TbLock, TbLockOpen } from 'react-icons/tb';
import Input from '../../../../Components/Form/Input';

const ViewMemberList = ({ getMembers, isEnabled }) => {

  const URL = 'api/g_users'
  const { id } = useParams();

  const [status, setStatus] = useState('off');

  const URLE = 'api/g_user_Enable'
  const URLD = 'api/g_user_disable'

  const [dataSource, setDataSource] = useState(getMembers);
  const [enable, setEnable] = useState('')

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState(null)

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [searchText, setSearchText] = useState([]);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleChage = (record) => {
    Getpatch(record);
    setEnable(enable === 'Enabled' ? 'Disabled' : 'Enabled');
  };

  useEffect(() => {
    GetMamber();
  }, [])

  const GetMamber = (values) => {
    request.get(`${URL}`, values)
      .then(function (response) {
        setDataSource(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const Getpatch = (values) => {

    if (values.status === 'Disabled') {
      request.patch(`${URLE}/${values.id}`)
        .then(function (response) {
          setDataSource(response.data)
          GetMamber();

        })
        .catch(function (error) {
          console.error('Error updating user:', error);
        });
    }
    else {
      request.patch(`${URLD}/${values.id}`)
        .then(function (response) {
          setDataSource(response.data)
          GetMamber();

        })
        .catch(function (error) {
          console.error('Error updating user:', error);
        });
    }
  }


  const buttonStyle = {
    backgroundColor: status === 'enabled' ? 'red' : 'green',
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  //   const onViewmarket = (record) => {
  //     setModalContent(<ViewMP record={record}/>);
  //     setModalTitle("Added Marketing Person");
  //     showModal();

  //   }

  //   const onEditmarket = (record) => {
  //     setModalContent(<EditMP setDetails={record} handleOk={handleOk}/>);
  //     setModalTitle("Update Details here");
  //     showModal();
  //   }

  const onViewmember = (record) => {
    setModalContent(<ViewMember record={record} />);
    setModalTitle("Member Details");
    showModal();
  }


  const columns = [
    {
      title: 'S.No',
      render: (value, item, index) => index + 1,
    },
    {
      title: 'Date',
      dataIndex: 'created_at',
      render: (date) => {
        return dayjs(date).format('DD\\MM\\YYYY');
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      filteredValue: searchText ? [searchText] : null,
      onFilter: (value, record) => {
        return String(record.name).toLowerCase().includes(value.toLowerCase()) ||
          String(record.name).includes(value.toUpperCase());
      },
    },
    {
      title: 'Email ID',
      dataIndex: 'email'
    },
    {
      title: 'Role',
      dataIndex: 'user_role'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render(status, record) {
        return {
          props: {
            style: {
              color:
                record.status === "Disabled"
                  ? "red"
                  : record.status === "Enabled"
                    ? "green"
                    : "white",
            },
          },
          children: <div>{status}</div>,
        };


      }
    },
    {
      title: 'Action',
      render: (record) => {
        return (

          <Button.Primary
            text={enable === 'Enabled' ? <TbLockOpen /> : <TbLock />}
            onClick={() => handleChage(record)}
          />
        )
      }
    },
  ]


  return (
    <div>
      <TopTitle Heading={'User List'} />
      <Flex end style={{ marginTop: '25px' }}>
        <Input
          placeholder="Search by Name"
          value={searchText}
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)} />
      </Flex>

      <Table columns={columns} data={dataSource} />
      <Modals isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} modalTitle={modalTitle} modalContent={modalContent} width={1200} />
    </div>
  )
}

export default ViewMemberList