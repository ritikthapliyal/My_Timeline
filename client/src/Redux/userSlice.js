import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import * as api from '../Api/Api'

export const addUser = createAsyncThunk('user/addUser',async (userData) =>{
    return await api.addUser(userData)
})
export const verifyUser = createAsyncThunk('user/verifyUser', async (userData)=>{
        try{
            const response = await api.verifyUser(userData)
            return response.data
        }
        catch(error){

            if(error.response){
                throw error.response.status
            }
            else{
                throw "500"
            }   
        }
})
export const setGoal = createAsyncThunk('user/setGoal',async (data) => {
    const response = await api.setGoal(data)
    return response.data
})
export const doneGoal = createAsyncThunk('user/doneGoal', async(data) =>{
    const response = await api.doneGoal({data:data})
    return response.data
})
export const deleteGoal = createAsyncThunk('user/deleteGoal', async(data) =>{
    const response = await api.deleteGoal({data:data})
    return response.data
})
export const editGoal = createAsyncThunk('user/editGoal', async(data) =>{
    const response = await api.editGoal(data)
    return response.data
})
export const addSubtask = createAsyncThunk('user/addSubtask', async(data) =>{
    const response = await api.addSubtask(data)
    return response.data
})
export const addTask = createAsyncThunk('user/addTask', async(data) =>{
    const response = await api.addTask(data)
    return response.data
})
export const doneTask = createAsyncThunk('user/doneTask', async(data) =>{
    const response = await api.doneTask(data)
    return response.data
})
export const resetData = createAsyncThunk('user/resetData', async(data) =>{
    const response = await api.resetData(data)
    return response.data
})



const initialState = {
    userData : {},
    userLoggedIn: false,
    firstTimeLogin : false,
    
    addUserStatus : "",
    addUserStatusMessage:"",

    verifyUserStatus: "",
    getUserInfoStatus: "",
    
    setGoalStatus : "",
    deleteGoalStatus : "",
    doneGoalStatus : "",
    editGoalStatus : "",

    addTaskStatus : "",
    doneTaskStatus : "",
    resetDataStatus: "",
    addSubtaskStatus: "",
        
    todaysTasks: [],
}



const userSlice = createSlice({
    name: 'user',
    initialState : initialState,
    reducers: {
        
        setFirstTimeLogin(state){
            state.firstTimeLogin = false
        },

        updateGoalsInFrontend(state,{payload}){

            const today = payload.today
            const month = payload.month
            const year = payload.year

            const userData = state.userData

            if(
                Object.keys(userData.goals[month]).length !== 0 && 
                userData.goals[month][year] &&
                userData.goals[month][year][today] &&
                !userData.goals[month][year][today].status
            ){
                userData.goals[month][year][today].time_expired = true
            }

            state.userData = userData
        }

    },
    extraReducers:{

        [addUser.pending] : (state) => { return {...state, addUserStatus : "pending"}},  
        [addUser.rejected] : (state,payload) => {
                            return {...state,addUserStatus:"rejected", 
                                    addUserStatusMessage:payload.error.message
                                }},
        [addUser.fulfilled] : (state,{payload}) => {
                            return {...state,
                                addUserStatus : "success",
                                userLoggedIn : true, 
                                userData : payload.data.result
                            }},  

        //////////////////////////////////////////////////////////////////////////////


        [verifyUser.pending] : (state) => { return {...state, verifyUserStatus : "pending"}},
        [verifyUser.rejected] : (state,payload) => { return {...state,verifyUserStatus : payload.error.message}},
        [verifyUser.fulfilled] : (state,{payload}) => { 
                            return {...state,
                                verifyUserStatus : "success",
                                userLoggedIn : true, 
                                displayOverlay: false,
                                firstTimeLogin: true,
                                userData : payload.result,
                                todaysTasks : payload.result.todaysTasks,
                            }},
        
        
        //////////////////////////////////////////////////////////////////////////////
        
        [setGoal.pending]:(state)=>{ return {...state,setGoalStatus:"pending"}},
        [setGoal.rejected] : (state) => { return {...state,setGoalStatus:"rejected"}},
        [setGoal.fulfilled] : (state,{payload}) => {return {...state,setGoalStatus:"success",userData:payload.result}},
        
        //////////////////////////////////////////////////////////////////////////////
        
        [deleteGoal.pending]:(state)=>{ return {...state,deleteGoalStatus:"pending"}},
        [deleteGoal.rejected] : (state) => { return {...state,deleteGoalStatus:"rejected"}},
        [deleteGoal.fulfilled] : (state,{payload}) => {return {...state,deleteGoalStatus:"success",userData:payload.result}},
        
        //////////////////////////////////////////////////////////////////////////////
        
        
        [doneGoal.pending]:(state)=>{ return {...state,doneGoalStatus:"pending"}},
        [doneGoal.rejected] : (state) => { return {...state,doneGoalStatus:"rejected"}},
        [doneGoal.fulfilled] : (state,{payload}) => {return {...state,doneGoalStatus:"success",userData:payload.result}},
        
        //////////////////////////////////////////////////////////////////////////////
        
        [editGoal.pending]:(state)=>{ return {...state,editGoalStatus:"pending"}},
        [editGoal.rejected] : (state) => { return {...state,editGoalStatus:"rejected"}},
        [editGoal.fulfilled] : (state,{payload}) => {return {...state,editGoalStatus:"success",userData:payload.result}},
        
        //////////////////////////////////////////////////////////////////////////////
        
        [addTask.pending]:(state)=>{ return {...state,addTaskStatus:"pending"}},
        [addTask.rejected] : (state) => { return {...state,addTaskStatus:"rejected"}},
        [addTask.fulfilled] : (state,{payload}) => {
                                                    return {
                                                        ...state,
                                                        addTaskStatus:"success",
                                                        todaysTasks: [...state.todaysTasks, payload.result]
                                                    }},
        
                                                    
        //////////////////////////////////////////////////////////////////////////////
        
        [addSubtask.pending]:(state)=>{ return {...state,addSubtaskStatus:"pending"}},
        [addSubtask.rejected] : (state) => { return {...state,addSubtaskStatus:"rejected"}},
        [addSubtask.fulfilled] : (state,{payload}) => {
                                                        const {index,newSubTask} = payload.result
                                                        state.addSubtaskStatus = "success"
                                                        state.todaysTasks[index].subtasks.push(newSubTask)
                                                    },
        
                                                    
        //////////////////////////////////////////////////////////////////////////////

        [doneTask.pending]:(state)=>{ return {...state,doneTaskStatus:"pending"}},
        [doneTask.rejected] : (state) => { return {...state,doneTaskStatus:"rejected"}},
        [doneTask.fulfilled] : (state,{payload}) => {
                                                    state.todaysTasks[payload].status = true
                                                    state.doneTaskStatus = "success"
                                                },
        //////////////////////////////////////////////////////////////////////////////
        
        [resetData.pending]:(state)=>{ return {...state,resetDataStatus:"pending"}},
        [resetData.rejected] : (state) => { return {...state,resetDataStatus:"rejected"}},
        [resetData.fulfilled] : (state,{payload}) => {  state.userData = payload.result 
                                                        state.resetDataStatus="success"
                                                        state.todaysTasks = payload.result.todaysTasks},
    }
})


export default userSlice.reducer 
export const {setFirstTimeLogin,updateGoalsInFrontend} = userSlice.actions