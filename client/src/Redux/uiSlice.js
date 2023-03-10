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

            state.showTodayInMiddeSreen = false
            state.mouseOverDeadline = false

            if(payload === "L"){

                if(state.showAccomplishments){
                    state.translateXValue = "translateX(-35%)"
                    state.showAccomplishments = false
                    state.showMainPage = true
                }
                else if(state.showMainPage){
                    state.translateXValue = "translateX(-14%)"
                    state.showMainPage = false
                    state.showMyDiary = true
                }

            }
            else{
                if(state.showMyDiary){
                    state.translateXValue = "translateX(-35%)"
                    state.showMainPage = true
                    state.showMyDiary = false
                }
                else if(state.showMainPage){
                    state.translateXValue = "translateX(-64%)"
                    state.showMyDiary = false
                    state.showAccomplishments = true
                }   
            }

            if(state.showMyDiary){
                state.showMoveLeft = false
            }
            else{
                state.showMoveLeft = true
            }

            if(state.showAccomplishments){
                state.showMoveRight = false
            }
            else{
                state.showMoveRight = true
            }

        },
        
  },
})


export const { incrementYearAndMonth,changePage, changeDatesArray, decrementYearAndMonth,setCurrentSelectedDate,setMouseOverDeadline } = uiSlice.actions

export default uiSlice.reducer