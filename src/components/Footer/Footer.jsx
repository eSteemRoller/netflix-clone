
import React from 'react';
import './Footer.css';
import facebook_icon from '../../assets/facebook_icon.png';
import instagram_icon from '../../assets/instagram_icon.png';
import twitter_icon from '../../assets/twitter_icon.png';
import youtube_icon from '../../assets/youtube_icon.png';


export default function Footer() { 


  return (
    <div className='footer'>
      <div className="footer-icons">
        <img src={facebook_icon} alt="facebook icon" />
        <img src={instagram_icon} alt="instagram icon" />
        <img src={twitter_icon} alt="twitter icon" />
        <img src={youtube_icon} alt="youtube icon" />
      </div>
      <ul>
        <li>Audio Description</li>
        <li>Support</li>
        <li>Gift Cards</li>
        <li>Media Center</li>
        <li>Investor Relations</li>
        <li>Jobs</li>
        <li>Terms of Use</li>
        <li>Privacy</li>
        <li>Legal Notices</li>
        <li>Cookie Preferences</li>
        <li>Corporate Information</li>
        <li>Contact Us</li>
      </ul>
      <p className='copyright-text'>© 2025 Netflix?, Inc.</p>
    </div>
  )
}
