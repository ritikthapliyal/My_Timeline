import React from 'react'
import './Achievements.css'

function Achievements() {

    const monthDivs = []
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const year = 2023

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
                    week.push(<div key={j} className='day'></div>)
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
            <h3>Achievements</h3>
            <div className='year-dashboard'>
                {
                    monthDivs
                }
            </div>
        </div>
    )
}

export default Achievements