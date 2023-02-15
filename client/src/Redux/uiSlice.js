import { createSlice } from '@reduxjs/toolkit'



const date = new Date()
const today = date.getDate()
const month = date.getMonth()
const year = date.getFullYear()



function getDatesArray(month,year){

    //last date of current month
    const d = new Date(year, month + 1, 0);
    const lastDate = d.getDate();

    const dates = []

    const firstDate = new Date(year,month,1)
    const first_Day = firstDate.getDay()

    let counter = -1 * first_Day

    for(counter;counter < lastDate;counter++){
        if(counter < 0){
            dates.push(0)
        }
        else{
            dates.push(counter+1)
        }
    }

    return dates

}




const initialState = {
    today : {
        today,
        month,
        year
    },
    dates : getDatesArray(month,year),
    currMonth: month,
    currYear: year,

    currSelectedDate : 0,

    mouseOverDeadline:false,

    showMainPage: true,
    showMyDiary : false,
    showAccomplishments:false,

    showMoveLeft: true,
    showMoveRight: true,

    translateXValue : "translateX(-35%)",
}



export const uiSlice = createSlice({
  name: 'uiSlice',
  initialState,
  reducers: {

        changeDatesArray(state){
            state.dates = getDatesArray(state.today.month,state.today.year)
            state.currMonth = state.today.month 
            state.currYear = state.today.year 
        },

        incrementYearAndMonth(state){

            state.currSelectedDate = 0
            state.currMonth += 1
            
            state.dates = getDatesArray(state.currMonth,state.currYear)
            
            if(state.currMonth > 11){
                state.currMonth = 0
                state.currYear += 1 
            }

        },
        decrementYearAndMonth(state){
            
            state.currMonth -= 1
        
            state.dates = getDatesArray(state.currMonth,state.currYear)
            
            if(state.currMonth < 0){
                state.currMonth = 11
                state.currYear -= 1 
            }

        },
        setCurrentSelectedDate(state,{payload}){
            state.currSelectedDate = Number(payload)
        },

        setMouseOverDeadline(state,{payload}){
            state.mouseOverDeadline = payload
        },

        changePage(state,{payload}){


            if(payload === "L"){

                if(state.showAccomplishments){

                }

            }




            if(state.showMyDiary){
                state.showMoveLeft = false
            }

            if(state.showAccomplishments){
                state.showMoveRight = false
            }



        }
        
  },
})


export const { incrementYearAndMonth,changePage, changeDatesArray, decrementYearAndMonth,setCurrentSelectedDate,setMouseOverDeadline } = uiSlice.actions

export default uiSlice.reducer