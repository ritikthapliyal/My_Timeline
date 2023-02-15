import React,{Fragment, useState} from 'react'
import './Header.css'
import LoginOverlay from './Login/LoginOverlay'
import { useSelector } from 'react-redux'


function Header() {

    const {userLoggedIn, userData}= useSelector((state)=>state.userSlice)

    const [loginOverlay,setLoginOverlay] = useState(false)
    const [profileButtonClicked,setProfileButtonClicked] = useState(false)

    const toggleLoginOverlay = () => {
        setLoginOverlay(!loginOverlay)
    }

    const onClickHandler = ()=>{
        setProfileButtonClicked(!profileButtonClicked)
    }

    return (

        <Fragment>
            {
                !userLoggedIn && loginOverlay && <LoginOverlay toggleLoginOverlay={toggleLoginOverlay}/>
            }

            <div className='header'>
                <h1>My Timeline</h1>   
                
                {
                    userLoggedIn 
                    ?
                        <button onMouseLeave={()=>{setProfileButtonClicked(false)}} onClick={onClickHandler} 
                        className='profile-button'>
                            <span>{userData.email.length > 30 ? userData.email.slice(0,25) + "..." : userData.email}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.4" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                            {
                                profileButtonClicked && <ul>
                                    <li><button>Option 1</button></li>
                                    <li><button>Option 2</button></li>
                                    <li><button>LogOut</button></li>
                                </ul>
                            }
                        </button>
                    :
                        <button onClick={toggleLoginOverlay}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        </button>
                }
                
            </div>
        </Fragment>
    )
}

export default Header