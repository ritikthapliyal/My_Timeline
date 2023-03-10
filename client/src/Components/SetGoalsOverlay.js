import ReactDOM from 'react-dom'
import SetGoals from './SetGoals'

function SetGoalsOverlay({setDisplayOverlay,clickedBtn}) {

    const element = document.getElementById('portal')  

    return (
        ReactDOM.createPortal(<SetGoals clickedBtn={clickedBtn} setDisplayOverlay={setDisplayOverlay}></SetGoals>,element)
    )
}

export default SetGoalsOverlay