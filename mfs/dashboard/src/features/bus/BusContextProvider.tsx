
import React, { createContext } from 'react';
import { BusContext } from './busContext';
import { useBus } from '../../hooks/useBus';
import { EventBusIntegration } from '../../types/allTypes';

// Create a component that wraps its children inside the shared context
const BusContextProvider: React.FC<{bus: EventBusIntegration}> = ({ bus, children }) => {

  return (
    <BusContext.Provider value={bus}>
      {children}
    </BusContext.Provider>
  );
};

export default BusContextProvider;
