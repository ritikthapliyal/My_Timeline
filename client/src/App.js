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


function App() {

    const dispatch = useDispatch()

    const {showMoveLeft, showMoveRight,translateXValue, mouseOverDeadline} = useSelector((state)=> state.uiSlice)
    const {userLoggedIn,userData,firstTimeLogin} = useSelector((state)=> state.userSlice)


    const handleMoveButtons = (direction) => {

        if(firstTimeLogin){
            dispatch(setFirstTimeLogin())
        }

        dispatch(changePage(direction))
    }

    useEffect(() => {
        const job = schedule.scheduleJob("5 0 * * *", () => {
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
                    <div className={`Calendar-details ${mouseOverDeadline ? "Calendar-details-2" : ""}`}>
                        <p>Date</p>
                        <p>Date</p>
                        <p>Date</p>
                    </div>
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
