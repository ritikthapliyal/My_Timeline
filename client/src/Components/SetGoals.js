import React,{Fragment, useState} from 'react'
import "./SetGoals.css"
import { useSelector,useDispatch } from 'react-redux'
import {setGoal} from '../Redux/userSlice'


function SetGoals({setDisplayOverlay,clickedBtn}) {

    const topOrBottom = ()=>{

        if (clickedBtn.top + clickedBtn.height + 380 > window.innerHeight) {
            return {
                bottom : window.innerHeight - clickedBtn.top - 25,
                left : clickedBtn.right - 25
            }
        }
        else{
            return {
                left : clickedBtn.right - 25,
                top : clickedBtn.top + 25,
            }
        }

    }

    const {currSelectedDate,currMonth,currYear} = useSelector((state) => state.uiSlice)
    const date = new Date()
    date.setMonth(currMonth);
    const monthSpell = date.toLocaleString('en-US', { month: 'short' });


    const dispatch = useDispatch()
    const {userData}= useSelector((state)=>state.userSlice)
    
    
    const [motivation,setMotivation] = useState("") 
    const [title,setTitle] = useState("") 
    const [selectedOption, setSelectedOption] = useState("C");
      
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const addGoal = ()=>{

        dispatch(setGoal({
                            _id : userData._id, 
                            month : currMonth, 
                            year : currYear, 
                            date : currSelectedDate, 
                            goal : { title, motivation, type : selectedOption, status:false, time_expired: false}
                        })).then(setDisplayOverlay())
    }

    return (
        <Fragment>
            <div className='overlay-wrapper' onClick={()=>setDisplayOverlay()} style={{backdropFilter:"contrast(0.6)"}}></div>

            <button className='Calendar-button' style={{
                zIndex:"111",
                position: "absolute",
                width : clickedBtn.width, 
                height : clickedBtn.height, 
                top : clickedBtn.top,
                left : clickedBtn.left}}>{currSelectedDate}</button>
            <div className="setgoals" style={topOrBottom()}>

                    <div className='setgoals-up'>
                        <h2>Target Date :</h2>
                        <p>{`${currSelectedDate}/${monthSpell}/${currYear}`}</p>
                    </div>
                    
                    <hr></hr>
                    

                    <div className='setgoals-down'>
                        <input className='goalTitle' placeholder='Enter an Objective, for example, Complete the React Course'
                                onChange={(e)=>{setTitle(e.target.value)}}
                                value={title}
                        ></input>
                        <textarea placeholder='Enter your motivation behind this Objective. For example, I want to learn React because i want to gaining new skills and improve chances of being hired.'
                                  onChange={(e)=>{setMotivation(e.target.value)}}
                                  value={motivation}>
                        </textarea>
                        <div className='checkbox-and-button'>
                            <div className='checkboxes'>
                                <div>
                                    <input
                                        type="checkbox"
                                        value="C"
                                        checked={selectedOption === "C"}
                                        onChange={handleOptionChange}
                                    />
                                    <span style={{  color : selectedOption === "C" ? "#609EA2" : "",
                                                    fontWeight : selectedOption === "C" ? "600" : "",
                                        }}>
                                        Casual Goal
                                    </span>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        value="I"
                                        checked={selectedOption === "I"}
                                        onChange={handleOptionChange}
                                    />
                                    <span style={{  color : selectedOption === "I" ? "#B3005E" : "",
                                                    fontWeight : selectedOption === "I" ? "600" : "",
                                                }}>
                                        Important Goal
                                    </span>
                                </div>
                            </div>
                            <button onClick={addGoal}>Add Goal</button>
                        </div>
                    </div>

                    <button onClick={()=>{setDisplayOverlay()}} className='close-button'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
            </div>
        </Fragment>

    )
}

export default SetGoals