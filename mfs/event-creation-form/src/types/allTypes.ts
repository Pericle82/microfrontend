import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { EventType } from "./eventTypes";

export type EventBusIntegration = BehaviorSubject<BusEvent | undefined>;

export type MountOptions = {
    bus: EventBusIntegration;
    [key: string]: any;
}

export type BusEvent = {
    source: string;
    eventType: keyof typeof EventType;
    payload?: any;
}

export type EventCallback = (...args: any[]) => void;
