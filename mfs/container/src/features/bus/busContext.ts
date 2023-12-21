import { createContext } from "react";
import { EventBusIntegration } from "../../types/allTypes";


export const BusContext = createContext<EventBusIntegration | undefined>(undefined);