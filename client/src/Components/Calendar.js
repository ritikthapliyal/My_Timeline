import React, { useState, Fragment, useRef} from 'react'
import './Calendar.css'
import SetGoalsOverlay from './SetGoalsOverlay';
import { useSelector, useDispatch } from 'react-redux';
import { incrementYearAndMonth, decrementYearAndMonth,setCurrentSelectedDate } from '../Redux/uiSlice';
import trophy from '../Assets/trophy.png'
import cross from '../Assets/cross.png'



function Calendar() {

    const dispatch = useDispatch()
    const calendarContainer = useRef()
    const {dates,today,currMonth,currYear,mouseOverDeadline, showMyDiary} = useSelector((state)=> state.uiSlice)
    const {userData,userLoggedIn} = useSelector((state)=> state.userSlice)
    const [clickedBtn, setClickedBtn] = useState({});
    const [showGoalInfo,setShowGoalInfo] = useState(0)

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

    const getClassName = () => {

        if(mouseOverDeadline || showMyDiary){
            if(mouseOverDeadline){
                calendarContainer.current.classList.remove("Calendar-container-3")
                return "Calendar-container-2"
            }
            else{
                calendarContainer.current.classList.remove("Calendar-container-2")
                return "Calendar-container-3"
            }
        }
        else return ""
    }

    return (
        <Fragment>

            {
                userLoggedIn && 
                displayOverlay && 
                <SetGoalsOverlay setDisplayOverlay={setDisplayOverlay} clickedBtn={clickedBtn}/>
            }

            <div ref={calendarContainer} className={`Calendar-container ${getClassName()}`}>
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

                                if(userData.goals[currMonth][currYear][date].time_expired){
                                    return <button className='Calendar-buttons' 
                                                   key={index} 
                                                   value={date} 
                                                   onMouseOver={()=>{setShowGoalInfo(date)}}
                                                   onMouseLeave={()=>{setShowGoalInfo(0)}}
                                                   style={{ 
                                                            zIndex: "11",
                                                            width: "2.8rem",
                                                            height: "2.8rem",
                                                            color: "white",
                                                            border: "none",
                                                            cursor: "unset",
                                                            position: "relative",
                                                            fontSize:"0.8rem",
                                                            fontWeight:"600",
                                                            borderRadius: "20%",
                                                            transition: "all 0.2s",
                                                        }}>{date}
                                                        <img src={cross} 
                                                             style={{
                                                                        width:"2rem",
                                                                        height:"2rem",
                                                                        position:"absolute",
                                                                        top:"50%",
                                                                        left:"50%",
                                                                        transform : "translate(-50%,-50%)",
                                                                        zIndex:"-1"
                                                                    }}>
                                                        </img>

                                                        {
                                                            showGoalInfo === date && <div className='goal-info'>
                                                                <p>
                                                                    <span style={{color :  '#EB455F'}}>Failed </span>
                                                                    To Achieve Goal
                                                                    <span style={{
                                                                        wordBreak:"break-word",
                                                                        color :  'rgb(51 219 165)',
                                                                        fontSize: "1rem",
                                                                        }}> {userData.goals[currMonth][currYear][date].title}</span>
                                                                </p>
                                                            </div>
                                                        }
                                            </button>
                                }
                                else if(userData.goals[currMonth][currYear][date].status){
                                    return <button className='Calendar-buttons' 
                                                   key={index} 
                                                   value={date} 
                                                   onMouseOver={()=>{setShowGoalInfo(date)}}
                                                   onMouseLeave={()=>{setShowGoalInfo(0)}}
                                                   style={{ 
                                                            zIndex: "11",
                                                            width: "2.8rem",
                                                            height: "2.8rem",
                                                            color: "white",
                                                            border: "none",
                                                            cursor: "unset",
                                                            position: "relative",
                                                            fontSize:"1.1rem",
                                                            fontWeight:"600",
                                                            borderRadius: "20%",
                                                            backgroundColor : "#03C988",
                                                            transition: "all 0.2s",
                                                        }}>{date}
                                                        <img src={trophy} 
                                                             style={{width:"2rem",height:"2rem",position:"absolute"}}>
                                                        </img>

                                                        {
                                                            showGoalInfo === date && <div className='goal-info'>
                                                                <p>
                                                                    <span style={{color :  '#F9F54B'}}>Congratulation !! </span>
                                                                    You have completed the Goal 
                                                                    <span style={{
                                                                        fontSize: "1rem",
                                                                        wordBreak:"break-word",
                                                                        color :  'rgb(51 219 165)',
                                                                        }}> {userData.goals[currMonth][currYear][date].title}</span>
                                                                </p>
                                                            </div>
                                                        }
                                            </button>
                                }
                                else{
                                    return <button className='Calendar-button' key={index} value={date} 
                                                   style={{ 
                                                            cursor: "unset",
                                                            borderColor : '#F9F54B',
                                                            borderRadius : "50%",
                                                            animation : "example",
                                                            animationDuration: "5s",
                                                            animationIterationCount: "infinite",
                                                            pointerEvents:"none"
                                                        }}>{date}</button>
                                }
                            }
                            else if(date === today.today && currMonth === today.month && currYear === today.year){
                                return <button className='Calendar-button' key={index} value={date} 
                                               style={{ 
                                                        color: "#635985",
                                                        border: 'none',
                                                        fontSize: '1.4rem',
                                                        fontFamily: 'fantasy',
                                                        cursor: "unset",
                                                        pointerEvents:"none"
                                                    }}>{date}</button>
                            }
                            else if(userLoggedIn && currYear <= today.year && currMonth < today.month){
                                return <button className='Calendar-button' key={index} value={date} 
                                style={{color : index % 7 === 0 ? "#f091b1" : "#838282",border:"none",pointerEvents:"none", cursor: "unset",}}>{date}</button>
                            }
                            else if(userLoggedIn && currYear === today.year && currMonth === today.month && date < today.today){
                                return <button className='Calendar-button' key={index} value={date} 
                                        style={{color : index % 7 === 0 ? "#f091b1" : "#838282",border:"none", cursor: "unset",pointerEvents:"none"}}>{date}</button>
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