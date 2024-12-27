import { Col } from "antd"
import { Row } from "../../../../Components/Row"
import React from "react"


const ViewMember = ({record}) => {

    // const [AddedMarketingperson, setAddedMarketingperson] = useState(getMarketingperson);

    // useEffect(() => {
    //     setAddedMarketingperson(getMarketingperson)
    //   }, [getMarketingperson])

//    const Checking = (record) => {
       
//     console.log(record,'deddddddddd');


  return (
    <div>
      <Row gutter={[24,24]}>
        <Col span={24} md={12}>
            <b>Member Name</b> : {record.name}
        </Col>

        <Col span={24} md={12}>
           <b>Email ID</b>  : {record.email_id} 
        </Col>
        <Col span={24} md={12}>
            <b>Password</b> : {record.password} 
        </Col>
        <Col span={24} md={12}>
            <b>Role</b> : {record.role } 
        </Col>
      </Row>
    </div>
  )
}

export default ViewMember
