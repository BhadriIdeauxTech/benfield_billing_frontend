import React from 'react'
import TableView from './Partials/TableView'

const EditSppliers = ({setSupplier,getSupplier}) => {
  return (
    <div>
        <TableView setSupplier={setSupplier} getSupplier={getSupplier} />
    </div>
  )
}

export default EditSppliers