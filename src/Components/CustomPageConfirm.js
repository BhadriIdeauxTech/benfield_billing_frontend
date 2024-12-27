import { Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

export const CustomPopconfirm = ({ children, record, confirm, cancel, title, description,okText }) => (
    <Popconfirm
        title={title}
        description={description}
        onConfirm={() => confirm(record)}
        onCancel={cancel}
        icon={
            <QuestionCircleOutlined
                style={{
                    color: 'red',
                }}
            />
        }
        placement="topLeft"
        okText={okText || "Delete"}
        cancelText="Cancel"
    >
        {children}
    </Popconfirm>
);
