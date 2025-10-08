
import React from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import hero_banner from '../../assets/hero_banner.jpg';
import hero_title from '../../assets/hero_title.png';
import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/info_icon.png';


export default function Home() { 


  return (
    <div className='home'>
      <Navbar/>
      <div className="hero">
        <img src={hero_banner} className='banner-img' alt="hero banner" />
        <div className="hero-caption">
          <img src={hero_title} className='caption-img' alt="hero title" />
          <p>
            Discovering his ties to a secret ancient order, 
            a young man living in modern Istanbul embarks 
            on a quest to save the city from 
            an immortal enemy.
          </p>
          <div className="hero-btns">
            <button>
              <img src={play_icon} className='btn' alt="play button" 
              />Play
            </button>
            <button>
              <img src={info_icon} className='btn dark-btn' alt="more info button" 
              />More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
