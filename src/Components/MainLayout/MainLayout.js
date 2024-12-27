import React from 'react'
import { Headbox } from './Partials/Headbox'
import { Mainbox } from './Partials/MainBox'
import { Sidebox } from './Partials/Sidebox'
import { ContainerSecondHalf, ContainerWrapper } from './Partials/Styled'

const MainLayout = ({ sideBox, headBox, secondbox }) => {
  return (

    <ContainerWrapper>
      <Sidebox sideBox={sideBox} />
      <ContainerSecondHalf>
        <Headbox headBox={headBox} />
        <Mainbox secondbox={secondbox} />
      </ContainerSecondHalf>
    </ContainerWrapper>
  )
}

export default MainLayout     