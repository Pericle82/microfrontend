import React, { useContext, useEffect } from 'react';
import { BusContext } from '../../features/bus/busContext';
import { Card, CardListUpdatedEvent } from '../../types/eventTypes';
import CardEvent from '../cardEvent/CardEvent';
import { useBus } from '../../hooks/useBus';
import { EventType } from '../../types/allTypes';

interface CardContainerProps {
}

const CardContainer: React.FC<CardContainerProps> = () => {

    const [cards, setCards] = React.useState<Card[] | undefined>([]);
    const bus = useContext(BusContext);
    const {on, emit, off} = useBus(bus, 'CardContainer');

    useEffect(() => {
        console.log('CardContainer useEffect');
        on(EventType.CARD_LIST_UPDATED, (event: CardListUpdatedEvent) => {
            if (!event) {
                return;
            }
            setCards(event.payload.cards);
        });
        emit({
            source: 'CardContainer',
            eventType: 'COMPONENT_MOUNTED'
        });
        return () => {
            off('CardContainer');
        }

    }, []);

    return (
        <div id="card_container">
            {cards?.map((card, index) => (
                <CardEvent key={index} card={card} />
            ))}
        </div>
    );
};

export default CardContainer;
