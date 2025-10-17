
import React, { useEffect, useRef } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.png';
import caret_icon from '../../assets/caret_icon.svg';
import { LogOut } from '../../firebase';


export default function Navbar() { 
  const navRef = useRef();

  useEffect(() => { 
    window.addEventListener('scroll', () => { 
      if (window.scrollY >= 80) { 
        navRef.current.classList.add('nav-dark')
      } else { 
        navRef.current.classList.remove('nav-dark')
      }
    })
  },[])

  return (
    <div ref={navRef} className='navbar'>
      <div className="navbar-left">
        <img src={logo} alt="Netflix logo" />
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Language</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={search_icon} className='icon' alt="search icon" />
        <p>Children</p>
        <img src={bell_icon} className='icon' alt="bell icon" />
        <div className="navbar-profile">
          <img src={profile_img} className='profile' alt="profile image" />
          <img src={caret_icon} className='caret' alt="caret icon" />
          <div className="dropdown">
            <p onClick={() => {LogOut()}}>Log Out</p>
          </div>
        </div>
      </div>
    </div>
  )
}
