import React,{Fragment} from 'react'
import reactDom from 'react-dom'
import Login from './Login'

function LoginOverlay({toggleLoginOverlay}) {
    
    const portal = document.getElementById('portal')
    
    return reactDom.createPortal(
        <Fragment>
            <div onClick={toggleLoginOverlay} className='overlay-wrapper'></div>
            <Login toggleLoginOverlay={toggleLoginOverlay}/>
        </Fragment>
        ,portal)
}

export default LoginOverlay