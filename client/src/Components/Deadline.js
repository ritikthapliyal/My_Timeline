import React, { useRef } from 'react'
import './Deadline.css'
import {setMouseOverDeadline} from '../Redux/uiSlice'
import { useDispatch } from 'react-redux'

function Deadline() {

    const deadline = useRef()
    const dispatch = useDispatch()

    const handleMouseOver = ()=>{
        dispatch(setMouseOverDeadline(true))
        deadline.current.classList.add("deadline-2")
    }
    const handleMouseLeave = ()=>{
        dispatch(setMouseOverDeadline(false))
        deadline.current.classList.remove("deadline-2")
    }

    return (
        <div ref={deadline} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} className='deadline'>Deadline</div>
    )
}

export default Deadline