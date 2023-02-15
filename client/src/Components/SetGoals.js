import React,{Fragment} from 'react'
import "./SetGoals.css"
import { useSelector } from 'react-redux'


function SetGoals({setDisplayOverlay}) {

    const {currSelectedDate,currMonth,currYear} = useSelector((state) => state.uiSlice)
    const date = new Date()
    date.setMonth(currMonth);
    const monthSpell = date.toLocaleString('en-US', { month: 'short' });


    return (
        <Fragment>
            <div className='overlay-wrapper' onClick={()=>setDisplayOverlay()}></div>
            <div className='setgoals'>

                    <div className='setgoals-up'>
                        <h2>Target Date :</h2>
                        <p>{`${currSelectedDate}/${monthSpell}/${currYear}`}</p>
                    </div>
                    
                    <hr></hr>

                    <div className='setgoals-down'>
                        <textarea placeholder='Kindly put your objectives in writing....'></textarea>
                        <button>Add Goal</button>
                    </div>

                    <button onClick={()=>setDisplayOverlay()} className='close-button'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
            </div>
        </Fragment>

    )
}

export default SetGoals