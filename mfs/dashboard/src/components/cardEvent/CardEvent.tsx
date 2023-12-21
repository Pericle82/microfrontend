
import React, { useEffect } from 'react';
import { Card } from '../../types/eventTypes';

interface CardEventProps {
  card: Card;
}

const CardEvent: React.FC<CardEventProps> = ({ card }) => {

  const { title, description } = card;

  useEffect(() => {
  }, []);

  return (
    <div className="card-event">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default CardEvent;
