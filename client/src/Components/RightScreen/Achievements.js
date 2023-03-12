import React, { useState } from 'react'
import './Achievements.css'
import { useSelector } from 'react-redux'

function Achievements() {

    const monthDivs = []
    const {userData} = useSelector((state)=> state.userSlice)
    const {today} = useSelector((state)=> state.uiSlice)
    const [dateInfoData,setDateInfoData] = useState({})
    const [showDateInfo,setShowDateInfo] = useState(false)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const year = today.year

    const handleMouseOver = (obj)=>{
        setDateInfoData({date:obj.j,month:obj.i})
        setShowDateInfo(true)
    }

    const getColor = (eff) => {
        if(eff < 30){
            return "#F16767"
        }
        else if(eff <= 50){
            return "#FFAE6D"
        }
        else if(eff <= 70){
            return "#68B984"
        }
        else{
            return "#3D8361"
        }
    }


    for (let i = 0; i <= 11; i++){

        const firstDayOfNextMonth = new Date(year, i + 1, 1);
        const lastDayOfMonth = new Date(firstDayOfNextMonth - 1);
        const days = lastDayOfMonth.getDate();

        let weekNumber = new Date(year, i, 1)
        weekNumber = weekNumber.getDay()
        //0 -> sunday       

        const currMonth = []
        let week = []
        let counter = 1

        for (let j = 1; j <= days; j++,counter++){

            if(counter <= 7){

                if(weekNumber > 0){
                    week.push(<div className='null day'></div>)
                    j -= 1
                    weekNumber-=1
                }
                else{
                    if(userData.everyday[i][j]){
                        
                        const efficiency = Number(userData.everyday[i][j].efficiency)
                        const backgroundColor = getColor(efficiency)
                            week.push(
                            <div key={j} 
                                onMouseOver={(e)=>handleMouseOver({i,j},e)}
                                onMouseLeave={()=>setShowDateInfo(false)}
                                style={{backgroundColor, position: "relative"}} 
                                className='day'>
                                { showDateInfo && dateInfoData.date === j && dateInfoData.month === i && 
                                    <div style={{backgroundColor}} className='day-info'>
                                        <p>Efficiency : {efficiency}</p>
                                        <p>Total Tasks : {userData.everyday[i][j].total_tasks}</p>
                                        <p>Tasks Completed : {userData.everyday[i][j].completed_tasks}</p>
                                    </div>
                                }
                            </div>)

                    }
                    else{
                        week.push(<div key={j} className='day'></div>)
                    }
                }
            }
            else{
                currMonth.push(<div className='week'>{week}</div>)
                j -= 1
                week = []
                counter = 0
            }
        }

        while(counter <= 7){
            week.push(<div className='null day'></div>)
            counter += 1
        }

        currMonth.push(<div className='week'>{week}</div>)
        monthDivs.push(<div className='month'><div className='weeks'>{currMonth}</div><p>{months[i]}</p></div>)

    }

    return (
        <div className='Achievements'>
            <h3>Year Dashboard</h3>
            <div className='year-dashboard'>
                {
                    monthDivs
                }
            </div>
            <div>
                <div className='week-info'></div>
                <div className='past-achievements'></div>
            </div>
        </div>
    )
}

export default Achievements