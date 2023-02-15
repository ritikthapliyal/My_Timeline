import React, { useRef, useState, Fragment} from 'react'
import {addUser,verifyUser} from '../../Redux/userSlice'
import {useDispatch,useSelector} from 'react-redux'
import { changeDatesArray } from '../../Redux/uiSlice'

import './Login.css'


function verifyEmailAddress(email,emailRef){
    if(email.includes('@') && email.includes(".")){
        emailRef.current.style.borderBottomColor = "#017d5b"
        return true
    }
    else{
        emailRef.current.style.borderBottomColor = "red"
    }
}

function verifyPassword(password,passwordRef){
    if(password.length > 6){
        passwordRef.current.style.borderBottomColor = "#017d5b"
        return true
    }
    else{
        passwordRef.current.style.borderBottomColor = "red"
    }
}


function Login({toggleLoginOverlay}) {

    const dispatch = useDispatch()

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordMessageRef = useRef()

    const {addUserStatusMessage,addUserStatus}= useSelector((state)=>state.userSlice)

    const [loginData,setLoginData] = useState({username:"",password:""})
    const [signupData,setSignupData] = useState({username:"",password:"",mobile:"",address:""})

    const handleLogin = (e)=>{
        e.preventDefault()
        dispatch(verifyUser(loginData)).then(dispatch(changeDatesArray()))
    }
    const handleSignup = (e)=>{
        e.preventDefault()
        
        if(verifyEmailAddress(signupData.username,emailRef) && signupData.address !== "" && verifyPassword(signupData.password,passwordRef)){
            dispatch(addUser(signupData))
        }

    }


    return (
        <div className='Login'>
                <button onClick={()=>toggleLoginOverlay()} className='close-button-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.6" stroke="white" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h1>Welcome to <br></br><span>My Timeline</span></h1>
                <form className='Login-Left'>
                    <label>USERNAME(Email)</label>
                    <input placeholder='Enter Email Id' 
                        type="email"
                        onChange={(e)=>setLoginData({...loginData,username:e.target.value})} 
                        value={loginData.username}>    
                    </input>
                    <label ref={passwordMessageRef}>PASSWORD</label>
                    <input placeholder='Enter Password' 
                        type="password"
                        onChange={(e)=>setLoginData({...loginData,password:e.target.value})} 
                        value={loginData.password}>    
                    </input>
                    <button onClick={handleLogin}>Login</button>
                </form>

                <div style={{border:"1px solid black", borderRadius:"1rem"}}></div>

                <form className='Login-Right'>

                    {
                    addUserStatus === "rejected" && <Fragment>
                        {
                             addUserStatusMessage.includes("409") 
                             ? 
                             <p style={{color:"#f55050"}}>Email Already Exists</p>
                             :
                             <p style={{color:"#f55050"}}>Something Went Wrong</p>
                        }
                    </Fragment>
                           
                    }

                    <label>USERNAME(Email)</label>
                    <input placeholder='Enter Email Id' 
                        ref={emailRef}
                        type="email"
                        onChange={(e)=>setSignupData({...signupData,username:e.target.value})}
                        value={signupData.username}>
                    </input>
                    <label>PASSWORD</label>
                    <input placeholder='Enter New Password' 
                        ref={passwordRef}
                        type="password"
                        onChange={(e)=>setSignupData({...signupData,password:e.target.value})}
                        value={signupData.password}>
                    </input>
                    <label>MOBILE NUMBER</label>
                    <input placeholder='Enter Mobile Number' 
                        onChange={(e)=>setSignupData({...signupData,mobile:e.target.value})}
                        value={signupData.mobile}>
                    </input>
                    <label>ADDRESS</label>
                    <input placeholder='Enter Delievery Address' 
                        onChange={(e)=>setSignupData({...signupData,address:e.target.value})}
                        value={signupData.address}></input>
                    <button onClick={handleSignup}>Sign Up</button>
                </form>
        </div>
    )
}

export default Login