export enum EventType {
    COMPONENT_MOUNTED = 'COMPONENT_MOUNTED',
    COMPONENT_UNMOUNTED = 'COMPONENT_UNMOUNTED',
    CARD_LIST_UPDATED = 'CARD_LIST_UPDATED',
  }

export type Card = {
    id: string;
    title: string;
    description: string;
    status: string;
    tasks: string[];
};

export type CardListUpdatedEvent = {
    source: string;
    eventType: EventType.CARD_LIST_UPDATED;
    payload: {
        cards: Card[];
    };
};

