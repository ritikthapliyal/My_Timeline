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



const initialState = {
    userData : {},
    userLoggedIn: false,
    firstTimeLogin : false,
    
    addUserStatus : "",
    addUserStatusMessage:"",

    verifyUserStatus: "",
    getUserInfoStatus: "",
    updateCartStatus : "",
}



const userSlice = createSlice({
    name: 'user',
    initialState : initialState,
    reducers: {
        

        setFirstTimeLogin(state){
            state.firstTimeLogin = false
        },

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
                            }},
        
        
        //////////////////////////////////////////////////////////////////////////////
        
        
        
        [setGoal.pending]:(state)=>{ return {...state,updateCartStatus:"pending"}},
        [setGoal.rejected] : (state) => { return {...state,updateCartStatus:"rejected"}},
        [setGoal.fulfilled] : (state,{payload}) => {return {...state,updateCartStatus:"success",userData:payload.result}},
        

    }
})


export default userSlice.reducer 
export const {setFirstTimeLogin} = userSlice.actions