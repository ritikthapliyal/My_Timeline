import React, { useRef,useEffect,useState, Fragment} from 'react'
import './Deadline.css'
import {setMouseOverDeadline} from '../Redux/uiSlice'
import { useDispatch,useSelector } from 'react-redux'
import timer from '../Assets/timer.png'


function getGoalsArray(userData,userLoggedIn,currMonth,currYear){
    if(userLoggedIn && Object.keys(userData.goals[currMonth]).length !== 0 && userData.goals[currMonth][currYear]){
        return Object.keys(userData.goals[currMonth][currYear])
    }
    else {
        return []
    }
}


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


    const {userData,userLoggedIn} = useSelector((state)=> state.userSlice)
    const {currMonth,currYear} = useSelector((state)=> state.uiSlice)

    const goals = getGoalsArray(userData,userLoggedIn,currMonth,currYear)


    const date = new Date()
    date.setMonth(currMonth);
    const monthSpell = date.toLocaleString('en-US', { month: 'long' });


    const [time, setTime] = useState(new Date().getTime());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date().getTime());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);


    const diffInDays = (date) => {
        
        const today = new Date();
        
        const futureDate = new Date(currYear, currMonth, date);

        const differenceInTime = futureDate.getTime() - today.getTime();

        if (differenceInTime < 86400000) {
            const seconds = Math.floor(differenceInTime / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = minutes % 60;
            const remainingSeconds = seconds % 60;
            return `${hours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        } 
        else {
            const days = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));
            return `${days} days`;
        }
    }

      

    return (
        <div ref={deadline} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} className='deadline'>
            
            {
                userLoggedIn && 
                <Fragment>
                    <h1 className='deadline-heading'>My Goals</h1>
                    <div className='goals-container'>
                        {
                            goals.length > 0 && goals.map((date,index)=>{
                                return <div key={date} className='goal'>
                                    <div>
                                        <p className='goal-date'>
                                            <span className='goal-index'>{index+1}.</span>
                                            {`${date} - ${monthSpell} - ${currYear}`}
                                        </p>
                                        <div style={{display: 'block',
                                                    border: '1px solid #567189',
                                                    height: '4rem'}}></div>
                                        <p className='goal-title'>{userData.goals[currMonth][currYear][date].title}</p>
                                    </div>
                                    <p className='goal-motivation'>{userData.goals[currMonth][currYear][date].motivation}</p>
                                    <div className='goal-btn-container'>
                                        <div className='goal-buttons'>
                                            {
                                                userData.goals[currMonth][currYear][date].type === "I" 
                                                ?<p style={{color:'#E90064', 
                                                            borderRadius: '2rem',
                                                            padding: '0.6rem',
                                                            fontWeight:"600",
                                                            alignSelf: 'flex-start'}}>Must Achieve</p>
                                                :<button className='delete-goal'>Delete Goal</button>
                                            }
                                            <button className='completed'>Mark as Completed</button>
                                        </div>
                                        <div className='time-left' style={{gap:"0rem"}}>
                                            <img src={timer} width="40px" height="40px"></img>
                                            <span style={{width:"5rem"}}>{diffInDays(date)}</span>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </Fragment>
            }

            {
                !userLoggedIn && <p>Manual</p>
            }
            
        </div>
    )
}

export default Deadline