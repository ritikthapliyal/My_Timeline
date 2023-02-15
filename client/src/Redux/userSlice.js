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
                console.log(error.response)
                throw error.response.status
            }
            else{
                throw "500"
            }   
        }
})


export const updateCart = createAsyncThunk('user/updateCart',async (data) => {
    const response = await api.updateCart(data)
    return response.data
})

export const getUserInfo = createAsyncThunk('user/getUserInfo',async (email) => {
    const response = await api.getUserInfo(email)
    return response.data
})




const initialState = {
    userData : {},
    userLoggedIn: false,
    
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
        
        setUpdateCartStatus(state){
            state.updateCartStatus  = ""
        },

        logoutUser(state){
            state.userLoggedIn = false
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
                                userData : payload.result,
                            }},
        
        
        //////////////////////////////////////////////////////////////////////////////
        
        
        
        [updateCart.pending]:(state)=>{ return {...state,updateCartStatus:"pending"}},
        [updateCart.rejected] : (state) => { return {...state,updateCartStatus:"rejected"}},
        [updateCart.fulfilled] : (state,{payload}) => {return {...state,updateCartStatus:"success",userData:payload.message}},

        //////////////////////////////////////////////////////////////////////////////
        
        [getUserInfo.rejected] : () => {},
        [getUserInfo.fulfilled] : (state,{payload}) => {
                return {
                    ...state,
                    userData : payload.message,
                    getUserInfoStatus : "success"
                }
        },
        

    }
})


export default userSlice.reducer 
export const userActions = userSlice.actions