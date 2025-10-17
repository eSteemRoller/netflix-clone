
import React, { useState } from 'react';
import './Login.css';
import logo from '../../assets/logo.png';
import { LogIn, SignUp } from '../../firebase';


export default function Login() { 

  const [signInOrUpState, setSignInOrUpState] = useState("Sign In")
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function auth_user(event) {
    event.preventDefault();
    if (signInOrUpState==="Sign In") { 
      await Login(email, password);
    } else { 
      await SignUp(firstName, lastName, email, password);
    }
  }

  return (
    <div className='login'>
      <img src={logo} className='login-logo' alt="login page logo" />
      <div className="login-form">
        <h1>{signInOrUpState}</h1>
        <form>
          {signInOrUpState==="Sign Up" 
            ? (
              <>
              <input value={firstName} onChange={(e) => {setFirstName(e.target.value)}} type="text" placeholder='First name'/>
              <input value={lastName} onChange={(e) => {setLastName(e.target.value)}} type="text" placeholder='Last name'/>
              </>
            )
            : 
              <></>
          }
          <input value={email} onChange={(e) => {setEmail(e.target.value)}} type="email" placeholder='E-mail'/>
          <input value={password} onChange={(e) => {setPassword(e.target.value)}} type="password" placeholder='Password'/>
          <button onClick={auth_user} type='submit'>{signInOrUpState}</button>
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
          ? <p>New to Netflix? <span onClick={() => {setSignInOrUpState("Sign Up")}}>Sign Up Now!</span></p>
          : <p>Already signed up? <span onClick={() => {setSignInOrUpState("Sign In")}}>Sign In</span></p>
          }
        </div>
      </div>
    </div>
  )
}
