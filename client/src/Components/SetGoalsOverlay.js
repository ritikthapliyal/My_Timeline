import ReactDOM from 'react-dom'
import SetGoals from './SetGoals'

function SetGoalsOverlay({setDisplayOverlay}) {

    const element = document.getElementById('portal')  

    return (
        ReactDOM.createPortal(<SetGoals setDisplayOverlay={setDisplayOverlay}></SetGoals>,element)
    )
}

export default SetGoalsOverlay