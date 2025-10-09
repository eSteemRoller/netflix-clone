
import React, { useEffect, useRef } from 'react';
import './TitleCards.css';
import cards_data from '../../assets/cards/cards_data';



export default function TitleCards({title, category}) { 

  const cardsRef = useRef();

  const handleWheel = (event) => { 
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(() => { 
    cardsRef.current.addEventListener('wheel', handleWheel)
  },[])


  return (
    <div className='title-cards'>
      <h2>{title?title:'New and Most Popular'}</h2>
      <div className="card-list" ref={cardsRef}>
        {cards_data.map((card, index) => { 
          return <div className="card" key={index}>
            <img src={card.image} alt="movie poster image" />
            <p>{card.name}</p>
          </div>
        } )}
      </div>
    </div>
  )
}
