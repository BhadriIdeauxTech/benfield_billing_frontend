import React from 'react'
import { PanelContent } from './Partials/PanelContent'
import { PanelTable } from './Partials/PanelTable'
import { FormContainer } from './Styles'
import selectors from './Partials/PanelSelectors'
import { CustomCard } from '../../Components/CustomCard'

export const Panel = ({ getPanel, updateTable, deleteTable, deleteTableData }) => {

    return (
        
    <PanelContent getPanel={getPanel} updateTable={updateTable} deleteTable={deleteTable} deleteTableData={deleteTableData} />          
        
    )
}
