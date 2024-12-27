import React, { useState } from 'react'
import Button from './Form/Button'
import { WelcomeWrapper, SvgWrapper} from './Styled'
// import svg from '../Assets/Add Parties/Elipse.png'

export const IndexPage = ({ title, btnText,ModuleImg ,Dummyimg,onClick}) => {

    return (
        <WelcomeWrapper>
            <SvgWrapper>
                {/* <img src={svg}alt="" /> */}
                <img src={Dummyimg} alt="" />
                <img src={ModuleImg} alt="" />
            </SvgWrapper>
            <h2>{title}</h2>
            <Button.Yellow text={btnText} onClick={onClick}/>
        </WelcomeWrapper>
    )
}
