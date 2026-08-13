import React, { useEffect, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.png';
import caret_icon from '../../assets/caret_icon.svg';
import { LogOut, auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


export default function Navbar() { 
  const navRef = useRef();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => { 
    window.addEventListener('scroll', () => { 
      if (window.scrollY >= 80) { 
        navRef.current.classList.add('nav-dark')
      } else { 
        navRef.current.classList.remove('nav-dark')
      }
    })
  },[])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);


  return (
    <div ref={navRef} className='navbar'>
      <div className='navbar-left'>
        <img src={logo} alt="Netflix logo" />
      </div>
      <div className='navbar-center'>
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New &amp; Popular</li>
          <li>My List</li>
          <li>Browse by Language</li>
        </ul>
      </div>
      <div className='navbar-right'>
        <img src={search_icon} className='icon' alt="search icon" />
        <p>Children</p>
        <img src={bell_icon} className='icon' alt="bell icon" />
        {user ? (
          <div className='navbar-profile'>
            <img src={profile_img} className='profile' alt="profile image" />
            <img src={caret_icon} className='caret' alt="caret icon" />
            <div className='dropdown'>
              <p onClick={() => LogOut()}>Sign Out</p>
            </div>
          </div>
        ) : (
          <button className='signin-btn' onClick={() => navigate('/login')}>Sign In</button>
        )}
      </div>

      {/* Hamburger button — only visible at ≤540px */}
      <button
        className={`hamburger${menuOpen ? ' is-open' : ''}`}
        onClick={() => setMenuOpen(prev => !prev)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile slide-down menu */}
      {menuOpen && (
        <div className='mobile-menu'>
          <div className='mobile-menu-icons'>
            <img src={search_icon} className='icon' alt="search icon" />
            <img src={bell_icon} className='icon' alt="bell icon" />
            {user && <img src={profile_img} className='profile' alt="profile image" />}
          </div>
          <ul>
            <li onClick={() => setMenuOpen(false)}>Home</li>
            <li onClick={() => setMenuOpen(false)}>TV Shows</li>
            <li onClick={() => setMenuOpen(false)}>Movies</li>
            <li onClick={() => setMenuOpen(false)}>New &amp; Popular</li>
            <li onClick={() => setMenuOpen(false)}>My List</li>
            <li onClick={() => setMenuOpen(false)}>Browse by Language</li>
            {user
              ? <li onClick={() => { LogOut(); setMenuOpen(false); }}>Sign Out</li>
              : <li onClick={() => { navigate('/login'); setMenuOpen(false); }}>Sign In</li>
            }
          </ul>
        </div>
      )}
    </div>
  )
}