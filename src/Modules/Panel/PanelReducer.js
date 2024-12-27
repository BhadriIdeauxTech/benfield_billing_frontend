import { DELETE_TABLE,DELETE_TABLE_DATA,UPDATE_TABLE } from "./Action"

const InitialState = {
    TableData: []
}

export default (state = InitialState, action) => {

    switch (action.type) {

        case UPDATE_TABLE:
            return {
                ...state,
                TableData: [...state.TableData, action.data],
            }

        case DELETE_TABLE_DATA:

            const updatedData = state.TableData.filter((data, index) => index !== action.data);
            
            return {
                ...state,
                TableData: updatedData,
            }

        case DELETE_TABLE:

            return{
                ...state,
                TableData:[]
            }    

        default:
            return state;
    }


}
 