import React, { useRef,useEffect,useState, Fragment} from 'react'
import './Deadline.css'
import {setMouseOverDeadline} from '../Redux/uiSlice'
import {deleteGoal, editGoal, doneGoal} from '../Redux/userSlice'
import { useDispatch,useSelector } from 'react-redux'
import timer from '../Assets/timer.png'


function getGoalsArray(userData,userLoggedIn,currMonth,currYear){
    if(userLoggedIn && Object.keys(userData.goals[currMonth]).length !== 0 && userData.goals[currMonth][currYear]){
        const dates = Object.keys(userData.goals[currMonth][currYear])
        return dates.filter((date)=>!userData.goals[currMonth][currYear][date].status)
    }
    else {
        return []
    }
}


function Deadline() {

    const [confirmation,setConfirmation] = useState(0)
    const [goalTitle,setGoalTitle] = useState("")
    const [goalMotivation,setGoalMotivation] = useState("")
    const [enableDelete,setEnableDelete] = useState(false)
    const [enableEditing,setEnableEditing] = useState(false)

    const {userData,userLoggedIn} = useSelector((state)=> state.userSlice)
    const {currMonth,currYear,mouseOverDeadline} = useSelector((state)=> state.uiSlice)
    const goals = getGoalsArray(userData,userLoggedIn,currMonth,currYear)

    const deadline = useRef()
    const dispatch = useDispatch()

    const handleDeleteGoal = (date)=>{
        dispatch(deleteGoal({_id:userData._id,date,month:currMonth,year:currYear}))
    }
    const handleUpdateGoal = (date)=>{
        dispatch(editGoal({_id:userData._id,date,month:currMonth,year:currYear,goalTitle,goalMotivation})).then(setConfirmation(0),setEnableEditing(false))
    }
    const handleDoneGoal = (date)=>{
        dispatch(doneGoal({_id:userData._id,date,month:currMonth,year:currYear}))
    }

    const handleMouseOver = ()=>{
        deadline.current.classList.add("deadline-2")
        dispatch(setMouseOverDeadline(true))
    }
    const handleMouseLeave = ()=>{
        setEnableEditing(false)
        setEnableDelete(false)
        deadline.current.classList.remove("deadline-2")
        dispatch(setMouseOverDeadline(false))
    }

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

        if (differenceInTime < 0) {return 'Time Ended';}
        else if (differenceInTime < 86400000) {
            const seconds = Math.floor(differenceInTime / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = minutes % 60;
            const remainingSeconds = seconds % 60;
            return `${hours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        } 
        else {
            const days = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));
            return `${days} days remaining`;
        }
    }

    return (
            <div    
                ref={deadline} 
                onMouseOver={handleMouseOver} 
                onMouseLeave={handleMouseLeave} 
                className='deadline'>
            
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
                                        {
                                            enableEditing && confirmation === date ?
                                            <input  type="text" className='goal-title-input' 
                                                    onChange={(e)=>setGoalTitle(e.target.value)} 
                                                    value={goalTitle}
                                                    placeholder="Enter Title">
                                            </input>
                                            :
                                            <p className='goal-title'>{userData.goals[currMonth][currYear][date].title}</p>
                                        }
                                    </div>
                                    {   
                                        enableEditing && confirmation === date ?
                                        <textarea type="text" className='goal-motivation-input' 
                                                onChange={(e)=>setGoalMotivation(e.target.value)} 
                                                value={goalMotivation}
                                                placeholder="Enter Motivation"
                                                >
                                        </textarea>
                                        :
                                        <p className='goal-motivation'>{userData.goals[currMonth][currYear][date].motivation}</p>
                                    }
                                    <div className='goal-btn-container'>
                                        <div className='goal-buttons'>
                                            <button onClick={()=>{  setEnableEditing(true);
                                                                    setConfirmation(date)
                                                                    setEnableDelete(false)
                                                                    setGoalTitle(userData.goals[currMonth][currYear][date].title)
                                                                    setGoalMotivation(userData.goals[currMonth][currYear][date].motivation)
                                                                }} 
                                            style={{ display : mouseOverDeadline ? "flex" : "none"}}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></svg>
                                            </button>
                                            {
                                                userData.goals[currMonth][currYear][date].type === "C" &&
                                                <button onClick={()=>{
                                                                        setConfirmation(date)
                                                                        setEnableDelete(true)
                                                                        setEnableEditing(false)
                                                                    }}
                                                        style={{ display : mouseOverDeadline ? "flex" : "none"}}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg>
                                                </button>
                                            }

                                            {
                                                confirmation === date && enableDelete && <div className='confirmation'  onMouseLeave={()=>setConfirmation(0)}>
                                                    <p>Are You Sure ?</p>
                                                    <button onClick={()=>{handleDeleteGoal(date)}} style={{color: "#c45151"}}>Yes, I Give up !</button>
                                                    <button onClick={()=>{setConfirmation(0)}} 
                                                            style={{color: "#51C485"}}>No, I will Try.</button>
                                                    </div>
                                            }

                                            {
                                                confirmation === date && enableEditing && <div className='confirmation'>
                                                    <button onClick={()=>{handleUpdateGoal(date)}} style={{color: "#51C485"}}>Save Changes</button>
                                                    <button onClick={()=>{setConfirmation(0);setEnableEditing(false)}} style={{color: "grey"}}>Cancel</button>
                                                    </div>
                                            }

                                            <button onClick={()=>handleDoneGoal(date)} style={{ display : mouseOverDeadline ? "flex" : "none"}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M211.8 339.8C200.9 350.7 183.1 350.7 172.2 339.8L108.2 275.8C97.27 264.9 97.27 247.1 108.2 236.2C119.1 225.3 136.9 225.3 147.8 236.2L192 280.4L300.2 172.2C311.1 161.3 328.9 161.3 339.8 172.2C350.7 183.1 350.7 200.9 339.8 211.8L211.8 339.8zM0 96C0 60.65 28.65 32 64 32H384C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96zM48 96V416C48 424.8 55.16 432 64 432H384C392.8 432 400 424.8 400 416V96C400 87.16 392.8 80 384 80H64C55.16 80 48 87.16 48 96z"/></svg>
                                            </button>
                                        </div>
                                        <div className='time-left' style={{gap:"0rem"}}>
                                            <img src={timer} width="40px" height="40px"></img>
                                            <span style={{width:"fit-content"}}>{diffInDays(date)}</span>
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