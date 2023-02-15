import React, { useState, Fragment} from 'react'
import './Calendar.css'
import SetGoalsOverlay from './SetGoalsOverlay';
import { useSelector, useDispatch } from 'react-redux';
import { incrementYearAndMonth, decrementYearAndMonth,setCurrentSelectedDate } from '../Redux/uiSlice';



function Calendar() {

    const dispatch = useDispatch()
    const {dates,today,currMonth,currYear,currSelectedDate,mouseOverDeadline} = useSelector((state)=> state.uiSlice)
    const {userData,userLoggedIn} = useSelector((state)=> state.userSlice)
    const [position, setPosition] = useState({});
    const [clickedBtn, setClickedBtn] = useState({});


    const joinDate = new Date(userData.joinDate)
    const joinYear = joinDate.getFullYear()
    const joinMonth = joinDate.getMonth()

    const date = new Date()
    date.setMonth(currMonth);
    const monthSpell = date.toLocaleString('en-US', { month: 'long' });


    const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
    const [displayOverlay,setDisplayOverlay] = useState(false)

    const handleOnClick = (e) => {
        
        if(userLoggedIn){
            
            dispatch(setCurrentSelectedDate(e.target.value))
            

            setClickedBtn(e.target.getBoundingClientRect());


            setPosition({
                top: e.clientY,
                left: e.clientX
            });
    
            setDisplayOverlay(!displayOverlay)
        
        }

    }

    const nextMonth = () => {
        dispatch(incrementYearAndMonth())
    }
    const prevMonth = () => {
        dispatch(decrementYearAndMonth())
    }


    const checkIfGoalSet = (date)=>{

        if(
            Object.keys(userData.goals[currMonth]).length !== 0 && 
            userData.goals[currMonth][currYear] &&
            userData.goals[currMonth][currYear][date]
        )
        {
            return true
        }
        else{
            return false
        }
    }

    return (
        <Fragment>

            {
                userLoggedIn && 
                displayOverlay && 
                <SetGoalsOverlay setDisplayOverlay={setDisplayOverlay} position={position} clickedBtn={clickedBtn}/>
            }

            <div className={`Calendar-container ${mouseOverDeadline ? "Calendar-container-2" : ""}`}>
                <h2 className='Calendar-MonthYear'>{`${monthSpell}`}<br></br><span>{`${currYear}`}</span></h2>


                {
                    userLoggedIn && 
                    joinYear === currYear && 
                    joinMonth === currMonth 
                    
                    ?

                    <button className='prev-month'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="lightgrey" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                        </svg>
                    </button>

                    :

                    <button onClick={prevMonth} className='prev-month'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                        </svg>
                    </button>

                }


                
                {
                    days.map((day,index)=>{
                        return <h4 style={{color : `${index % 7 === 0 ? "#F06292" : "black"}`}} key={day} className="days">{day}</h4>
                    })
                }
                {  
                    dates.map((date,index)=>{
                        if(date === 0){
                            return <button key={index} className='Calendar-button no-date'></button>
                        }
                        else{
                            if( userLoggedIn && checkIfGoalSet(date)){
                                return <button className='Calendar-button' key={index} value={date} 
                                               style={{ 
                                                        cursor: "unset",
                                                        borderColor : '#F9F54B',
                                                        borderRadius : "50%",
                                                        animation : "example",
                                                        animationDuration: "5s",
                                                        animationIterationCount: "infinite",
                                                    }}>{date}</button>
                            }
                            else if(date === today.today && currMonth === today.month && currYear === today.year){
                                return <button className='Calendar-button' key={index} value={date} 
                                               style={{ 
                                                        color: "#635985",
                                                        border: 'none',
                                                        fontSize: '1.4rem',
                                                        fontFamily: 'fantasy',
                                                        cursor: "unset",
                                                    }}>{date}</button>
                            }
                            else if(userLoggedIn && currYear <= today.year && currMonth < today.month){
                                return <button className='Calendar-button' key={index} value={date} 
                                style={{color : index % 7 === 0 ? "#f091b1" : "#838282",border:"none", cursor: "unset",}}>{date}</button>
                            }
                            else if(userLoggedIn && currYear === today.year && currMonth === today.month && date < today.today){
                                return <button className='Calendar-button' key={index} value={date} 
                                        style={{color : index % 7 === 0 ? "#f091b1" : "#838282",border:"none", cursor: "unset",}}>{date}</button>
                            }
                            else{
                                return <button className='Calendar-button' key={index} value={date} onClick={handleOnClick} 
                                               style={{
                                                        backgroundColor : `${index % 7 === 0 ? "#F06292" : ""}`,
                                                        borderColor : `${index % 7 === 0 ? "#F06292" : ""}`,
                                                        color : `${index % 7 === 0 ? "white" : ""}`,
                                                    }}>{date}</button>
                            }
                        }
                    })
                }
                <button onClick={nextMonth} className='next-month'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>                
        </Fragment>
    )
}

export default Calendar