import React, { useState, Fragment} from 'react'
import './Calendar.css'
import SetGoalsOverlay from './SetGoalsOverlay';
import { useSelector, useDispatch } from 'react-redux';
import { incrementYearAndMonth, decrementYearAndMonth,setCurrentSelectedDate } from '../Redux/uiSlice';



function Calendar() {

    const dispatch = useDispatch()
    const {dates,mouseOverDeadline} = useSelector((state)=> state.uiSlice)

    const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
    const [displayOverlay,setDisplayOverlay] = useState(false)

    const handleOnClick = (e) => {
        dispatch(setCurrentSelectedDate(e.target.value))
        setDisplayOverlay(!displayOverlay)
    }

    const nextMonth = () => {
        dispatch(incrementYearAndMonth())
    }
    const prevMonth = () => {
        dispatch(decrementYearAndMonth())
    }
 
    
    return (
        <Fragment>

            {
                displayOverlay && <SetGoalsOverlay setDisplayOverlay={setDisplayOverlay}/>
            }


            <div className={`Calendar-container ${mouseOverDeadline ? "Calendar-container-2" : ""}`}>
                <button onClick={prevMonth} className='prev-month'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="white" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>
                {
                    days.map((day,index)=>{
                        return <h4 style={{color : `${index % 7 === 0 ? "red" : "black"}`}} key={day} className="days">{day}</h4>
                    })
                }
                {  
                    dates.map((date,index)=>{
                        if(date === 0){
                            return <button key={index} className='no-date'></button>
                        }
                        else{
                            return <button key={index} value={date} onClick={handleOnClick} 
                                           style={{
                                                    backgroundColor : `${index % 7 === 0 ? "#F55050" : ""}`,
                                                    borderColor : `${index % 7 === 0 ? "#F55050" : ""}`,
                                                    color : `${index % 7 === 0 ? "white" : ""}`
                                                }}>{date}</button>
                        }
                    })
                }
                <button onClick={nextMonth} className='next-month'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="white" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                </button>
            </div>                
        </Fragment>
    )
}

export default Calendar