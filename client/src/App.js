import './App.css'
import Calendar from './Components/Calendar';
import Deadline from './Components/Deadline';
import Header from './Components/Header/Header';
import MyDiary from './Components/MyDiary/MyDiary';
import { changePage, updateDate} from './Redux/uiSlice';
import {setFirstTimeLogin,resetData} from './Redux/userSlice';
import RightScreen from './Components/RightScreen/RightScreen';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import schedule from 'node-schedule';

import cross from "./Assets/cross.png"

function App() {

    const dispatch = useDispatch()

    const {showMoveLeft,today, showMoveRight,translateXValue, mouseOverDeadline} = useSelector((state)=> state.uiSlice)
    const {userLoggedIn,userData,firstTimeLogin} = useSelector((state)=> state.userSlice)


    const handleMoveButtons = (direction) => {

        if(firstTimeLogin){
            dispatch(setFirstTimeLogin())
        }

        dispatch(changePage(direction))
    }

    useEffect(() => {
        const job = schedule.scheduleJob("7 0 * * *", () => {
          if (userLoggedIn) {
            dispatch(resetData(userData._id))
            dispatch(updateDate())
          }
        })
    
        return () => {
          job.cancel();
        }

      }, [userLoggedIn, dispatch]);


    return (
        <div className="App">

            {
                userLoggedIn && showMoveLeft && <button onClick={()=>handleMoveButtons("L")} className='move-left'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>
            }

            <Header/>
            <div className={userLoggedIn ? "timeline-grid" : ""}
                 style = {{ 
                            transform : userLoggedIn ? translateXValue : "",
                            transition : firstTimeLogin ? "" : "all 0.4s", 
                        }}>
                {
                    userLoggedIn && <MyDiary/>
                }
                <div className='timeline'>
                    <Calendar/>
                    <Deadline/>
                    {
                      userLoggedIn && <div className={`Calendar-details ${mouseOverDeadline ? "Calendar-details-2" : ""}`}>
                            
                            <div>
                                <span style={{
                                    display:"flex",
                                    alignItems:"center",
                                    justifyContent:"center",
                                    width: "2.8rem",
                                    height: "2.8rem",
                                    animation : "example",
                                    animationDuration: "5s",
                                    animationIterationCount: "infinite",
                                    pointerEvents:"none"
                                }}>{today.today}</span>
                                <p>Your <span style={{color:"rgb(40 185 79)",fontWeight:"600"}}>Goal</span> is set.</p>
                            </div>
                            
                            <div>
                                <span style={{
                                        display:"flex",
                                        alignItems:"center",
                                        justifyContent:"center",
                                        width: "2.8rem",
                                        height: "2.8rem",
                                        color: "white",
                                        backgroundColor : "#F06292",
                                    }}>{today.today}</span>
                                <p>It's <span style={{color:"#F06292", fontWeight:"600"}}>Sunday</span>. <br/>Take a break... or <span style={{color:"#635985",fontWeight:"600"}}>NOT.</span></p>
                            </div>

                            <div>
                                <span className='trophy-span' style={{
                                       display:"flex",
                                       alignItems:"center",
                                       justifyContent:"center",
                                       width: "2.8rem",
                                       height: "2.8rem",
                                       borderRadius: "20%",                                     
                                }}>
                                </span>
                                <p><span style={{color:"#2146C7", fontWeight:"600"}}>Congratulations !!</span>. <br/>You have Achieved Your Goal.</p>
                            </div>
                            <div>
                                <span className='cross-span' style={{
                                       display:"flex",
                                       alignItems:"center",
                                       justifyContent:"center",
                                       width: "2.8rem",
                                       height: "2.8rem",
                                       borderRadius: "20%",                                       
                                }}>
                                </span>
                                <p>You Missed a <span style={{color:"#E0144C", fontWeight:"600"}}>Deadline</span>.<br/></p>
                            </div>
                        </div>
                    }
                </div>
                {
                    userLoggedIn && <RightScreen/>
                }
            </div>

            {
                userLoggedIn && showMoveRight && <button className='move-right' onClick={()=>handleMoveButtons("R")}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            }
        </div>
    );
}







export default App;
