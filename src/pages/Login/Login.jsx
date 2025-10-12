
import React, { useState } from 'react';
import './Login.css';
import logo from '../../assets/logo.png';



export default function Login() { 

  const [signInOrUpState, setSignInOrUpState] = useState("Sign In")

  return (
    <div className='login'>
      <img src={logo} className='login-logo' alt="login page logo" />
      <div className="login-form">
        <h1>{signInOrUpState}</h1>
        <form>
          {signInOrUpState==="Sign Up" 
            ? (
              <>
              <input type="text" placeholder='First name'/>
              <input type="text" placeholder='Last name'/>
              </>
            )
            : 
              <></>
          }
          <input type="email" placeholder='E-mail'/>
          <input type="password" placeholder='Password'/>
          <button>{signInOrUpState}</button>
          <div className="form-help">
            {signInOrUpState==="Sign In" 
              ?
                <>
                <div className="remember">
                  <input type="checkbox" />
                  <label htmlFor="">Remember Me</label>
                </div>
                <p>Forgot password?</p>
                </>
              :
                <>
                  <p className='need-help'>Need help?</p>
                </>
            }
          </div>
        </form>
        <div className="form-switch">
          {signInOrUpState==="Sign In" 
          ? <p>New to Netflix? <span onClick={() => {setSignInOrUpState("Sign Up")}}>Sign Up</span></p>
          : <p>Already signed up? <span onClick={() => {setSignInOrUpState("Sign In")}}>Sign In</span></p>
          }
        </div>
      </div>
    </div>
  )
}
