
import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import cards_data from '../../assets/cards/cards_data';



export default function TitleCards({title, category}) { 

  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTE0MmExZmQzZjNlNGZmOWI0OGIzNmNkNzQwYzdjYyIsIm5iZiI6MTc2MDMzMTM5My40OTcsInN1YiI6IjY4ZWM4NjgxZWI4YjIwNzRjMGYxMTk5NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-WQrlqznYUmxqytqsYvqdR3gMEy0kFrP9WG4Ayl7Lrg'
    }
  };


  const handleWheel = (event) => { 
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(() => { 
    fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel', handleWheel)
  },[])


  return (
    <div className='title-cards'>
      <h2>{title?title:'New and Most Popular'}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => { 
          return <div className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="movie poster image" />
            <p>{card.original_title}</p>
          </div>
        } )}
      </div>
    </div>
  )
}
