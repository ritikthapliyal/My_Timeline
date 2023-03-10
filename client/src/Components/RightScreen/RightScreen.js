import React from 'react'
import "./RightScreen.css"
import Today from './Today'
import Achievements from './Achievements'

function Accomplishments() {
    return (
        <div className='RightScreen'>
            <Today/>
            <Achievements/>
        </div>
    )
}

export default Accomplishments