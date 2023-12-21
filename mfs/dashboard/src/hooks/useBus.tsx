import { useEffect, useRef } from 'react';
import { BehaviorSubject, Subscription, filter } from 'rxjs';
import { BusEvent, EventBusIntegration, EventCallback, EventType } from '../types/allTypes';
import React from 'react';

export type Integration = {
  emit: (event: BusEvent) => void
  on: (eventType: EventType, callback: EventCallback) => void,
  off: (source: string) => void,
}


export function useBus(bus: EventBusIntegration | undefined, source: string): Integration {

  const busRef = useRef(bus);
  const [subscription, setSubscription] = React.useState<Map<string, Subscription[]>>(new Map());

  if (!bus) {
    return {
      emit: () => { },
      on: () => { },
      off: () => { }
    };
  }
  const integration: Integration = {  
    on: (eventType: EventType, callback: EventCallback) => {
      const sub =  bus.pipe(filter((event: BusEvent | undefined) => {
        if (!event) {
          return false;
        }
        return event.eventType === eventType
      })
      ).subscribe((event) => {
        console.log('useBus subscription', event);
        callback(event);
      });
      const subs = subscription.get(eventType) || [];
      subs.push(sub);
      subscription.set(eventType, subs);
      setSubscription(subscription);

    },
    emit: (event: BusEvent) => {
      console.log('useBus emit', event);
      bus.next(
        {
          ...event,
          source,
        }
      );
    },
    off: (source: string) => {
      const subs = subscription.get(source);
      if (!subs) {
        return;
      }
      subs.forEach((sub) => {
        sub.unsubscribe();
      });
      subscription.delete(source);
    }
  }

  useEffect(() => {
    return () => {
      if (!subscription) {
        return;
      }
      subscription.forEach((subs) => {
        subs.forEach((sub) => {
          sub.unsubscribe();
        });
      });
    };
  }, []);

  return integration;
}
