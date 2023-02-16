import './App.css'
import Calendar from './Components/Calendar';
import Deadline from './Components/Deadline';
import Header from './Components/Header';
import MyDiary from './Components/MyDiary/MyDiary';
import { changePage } from './Redux/uiSlice';
import {setFirstTimeLogin} from './Redux/userSlice';
import Accomplishments from './Components/Accomplishments/Accomplishments';
import { useSelector,useDispatch } from 'react-redux';

function App() {

    const dispatch = useDispatch()
    const {showMoveLeft, showMoveRight,translateXValue} = useSelector((state)=> state.uiSlice)
    const {userLoggedIn,firstTimeLogin} = useSelector((state)=> state.userSlice)
    
    const handleMoveButtons = (direction) => {

        if(firstTimeLogin){
            dispatch(setFirstTimeLogin())
        }

        dispatch(changePage(direction))
    }


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
                            transition : firstTimeLogin ? "" : "all 0.4s"
                        }}>
                {
                    userLoggedIn && <MyDiary/>
                }
                <div className='timeline'>
                    <Calendar/>
                    <Deadline/>
                    {/* <div className={`Calendar-details ${mouseOverDeadline ? "Calendar-details-2" : ""}`}>
                        <p>Date</p>
                        <p>Date</p>
                        <p>Date</p>
                    </div> */}
                </div>
                {
                    userLoggedIn && <Accomplishments/>
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
