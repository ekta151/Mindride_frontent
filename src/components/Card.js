import React from 'react';
import './Card.css'; // You can create a Card.css for styling

function Card({ title, description, buttonText, onClick, cardClass, buttonClass }) {
  return (
    <div className={`recommendation-card ${cardClass || ''}`}>
      <h3>{title}</h3>
      <p>{description}</p>
      <button className={`card-button ${buttonClass || ''}`} onClick={onClick}>{buttonText}</button>
    </div>
  );
}

export default Card; 