import React from 'react'
import { Panel } from './Panel'
import { TopTitle } from '../../Components/Form/TopTitle'
import { CustomCard } from '../../Components/CustomCard'

export const PanelMain = ({ getPanel, updateTable, deleteTable, deleteTableData }) => {
  return (
    <div>
      <TopTitle Heading={'Panel Creation'} />
      <CustomCard>
        <Panel getPanel={getPanel} updateTable={updateTable} deleteTable={deleteTable} deleteTableData={deleteTableData} />
      </CustomCard>

    </div>
  )
}
