import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

export type EventBusIntegration = BehaviorSubject<BusEvent | undefined>;

export type MountOptions = {
    bus: EventBusIntegration;
    [key: string]: any;
}

export enum EventType {
    COMPONENT_MOUNTED = 'COMPONENT_MOUNTED',
    COMPONENT_UNMOUNTED = 'COMPONENT_UNMOUNTED',
    CARD_LIST_UPDATED = 'CARD_LIST_UPDATED',
}

export type BusEvent = {
    source: string;
    eventType: keyof typeof EventType;
    payload?: any;
}

export type EventCallback = (...args: any[]) => void;
