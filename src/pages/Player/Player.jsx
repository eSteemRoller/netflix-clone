
import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useParams } from 'react-router-dom';



export default function Player() { 

  const {id} = useParams();

  const [apiData, setApiData] = useState({ 
    name: "",
    key: "",
    published_at: "",
    type: ""
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTE0MmExZmQzZjNlNGZmOWI0OGIzNmNkNzQwYzdjYyIsIm5iZiI6MTc2MDMzMTM5My40OTcsInN1YiI6IjY4ZWM4NjgxZWI4YjIwNzRjMGYxMTk5NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-WQrlqznYUmxqytqsYvqdR3gMEy0kFrP9WG4Ayl7Lrg'
    }
  };

  useEffect(() => { 
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results[0]))
    .catch(err => console.error(err));
  },[])


  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" />
      <iframe 
        width='80%'
        height='80%'
        src={`https://www.youtube.com/embed/${apiData.key}`} 
        title='trailer' 
        frameborder="0" 
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}
