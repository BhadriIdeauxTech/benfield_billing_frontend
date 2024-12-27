import React from 'react'
import { SalesEntryPage } from './Partials/SalesEntryPage'
import Print from './Partials/Print'
import { useReactToPrint } from 'react-to-print'
import Button from '../../Components/Form/Button'
import { useRef } from 'react'
import { TopTitle } from '../../Components/Form/TopTitle'
import { CustomCard } from '../../Components/CustomCard'

const SalesMain = ({ setSale, getSale, selectedDate }) => {


  return (
    <div>
      <TopTitle Heading={'Sales Page'} />
      <CustomCard>
        <SalesEntryPage setSale={setSale} getSale={getSale} selectedDate={selectedDate} />
      </CustomCard>

    </div>
  )
}

export default SalesMain