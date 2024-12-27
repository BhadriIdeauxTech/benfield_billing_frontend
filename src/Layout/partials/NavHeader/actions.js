import { toast } from "react-toastify"
import request from "../../../utils/request"
export const NOTIFICATION_HEADER = 'NOTIFICATION_HEADER '


export const NotificationHeader = (data) => {
    return {
        type: NOTIFICATION_HEADER,
        data: data
    }
}

export const Notification = () => async dispatch => {

    try {
        const response = await request.get('notifiy/notifications/');
        dispatch(NotificationHeader(response?.data));
    } catch (error) {

        if (error.response && error.response.status === 401) {
            toast.error('Incorrect email or password. Please try again.')
        }
        //  else {
        //     toast.error('Failed to log in. Please try again later .')
        // }
    }
}


// export const Notification = async () => {

//     // const dispatch = useDispatch();
//     // console.log(dispatch,'ccccccccccccccc')

//     try {
//         const response = await request.get('notifiy/outerpurchase_notification/');
//         console.log(response.data, 'ccccccccccccccc')
//         dispatch(NotificationHeader(response.data));
//         // NotificationHeader(response.data)
//         toast.success(`${response.data}`)
//     } catch (error) {

//         if (error.response && error.response.status === 401) {
//             toast.error('Incorrect email or password. Please try again.')
//         } else {
//             toast.error('Failed to log in. Please try again later.')
//         }
//     }
// }