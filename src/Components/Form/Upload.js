import { PlusOutlined } from "@ant-design/icons";
import { message } from "antd";
import { Upload as AntdUpload } from "antd";
import Label from "./Label";
import { FaImages } from 'react-icons/fa'


const Upload = ({ SelectedImg, name, link, maxCount, listType, fileList, files }) => {

    const props = {
        name: 'img',
        action: link,
        async onChange(info) {
            const obj = info.file
            const rejin = obj.response

            if (info.file.status !== 'uploading') {
                // console.log('dddd')
                SelectedImg(obj.response.img)
                // console.log(info.file, info.fileList);
                // console.log(obj.response.img, 'info')
            }
            if (rejin.status === 'done') {
                message.success(`${info} file uploaded successfully`);
                // console.log('success')

            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
            
        },
    };
    return (
        <AntdUpload name="upload" {...props}
            listType={listType ? listType : 'text'}
            maxCount={maxCount}
            fileList={fileList}
        >
            <div>
               <div style={{margin:'9px 0'}} >
               <PlusOutlined style={{backgroundColor:'#8056F7',borderRadius:'25px',padding: '5px',color:'#fff'}}/>
               </div>
                <div
                    style={{
                        marginTop: 8,
                    }} >
                   <b style={{color:'#8056F7'}}> Upload</b>
                </div>
                <FaImages style={{color:'#8056F7',fontSize:'20px',margin:'7px 0'}} />
            </div>
            <Label>{files}</Label>
        </AntdUpload>
    )
}
export default Upload