import React, { useState } from 'react';
import './Login.css';
import logo from '../../assets/logo.png';
import { LogIn, SignUp } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import netflix_spinner from '../../assets/netflix_spinner.gif';
import { toast } from 'react-toastify';


export default function Login() {
  const [signState, setSignState] = useState('Sign In')
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  async function auth_user(event) {
    event.preventDefault();
    if (signState === 'Sign Up' && password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    if (signState==='Sign In') { 
      await LogIn(email, password);
    } else { 
      await SignUp(firstName, lastName, email, password);
    }
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
  }


  return (
    loading ? <div className='login-spinner'>
      <img src={netflix_spinner} alt='netflix loading spinner' />
    </div> :
    <div className='login'>
      <img src={logo} onClick={() => {nav('/')}} className='login-logo' alt="login page logo" />
      <div className='login-form'>
        <h1>{signState}</h1>
        <form>
          {signState==='Sign Up' 
            ? (
              <>
              <input value={firstName} onChange={(e) => {setFirstName(e.target.value)}} type='text' placeholder="First name"/>
              <input value={lastName} onChange={(e) => {setLastName(e.target.value)}} type='text' placeholder="Last name"/>
              </>
            )
            : 
              <></>
          }
          <input value={email} onChange={(e) => {setEmail(e.target.value)}} type='email' placeholder="E-mail"/>
          <input value={password} onChange={(e) => {setPassword(e.target.value)}} type='password' placeholder="Password"/>
          {signState === 'Sign Up' &&
            <input value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}} type='password' placeholder="Confirm password"/>
          }
          <button onClick={auth_user} type='submit'>{signState}</button>
          <div className='form-help'>
            {signState==='Sign In' 
              ?
                <>
                <div className='remember'>
                  <input type='checkbox' />
                  <label htmlFor=''>Remember Me</label>
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
        <div className='form-switch'>
          {signState==='Sign In' 
          ? <p>New to Netflix?? <span onClick={() => {setSignState('Sign Up')}}>Sign Up Now!</span></p>
          : <p>Already signed up? <span onClick={() => {setSignState('Sign In')}}>Sign In</span></p>
          }
        </div>
      </div>
    </div>
  )
}