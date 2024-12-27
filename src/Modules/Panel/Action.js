export const UPDATE_TABLE = 'UPDATE_TABLE'
export const DELETE_TABLE_DATA = 'DELETE_TABLE_DATA'
export const DELETE_TABLE ='DELETE_TABLE'

export const updateTable = (data) => {
    return {
        type: UPDATE_TABLE,
        data: data
    }
}

export const deleteTableData=(id)=>{
    return {
        type: DELETE_TABLE_DATA,
        data: id
    }
}

export const deleteTable=()=>{
    return{
        type:DELETE_TABLE,
    }
}