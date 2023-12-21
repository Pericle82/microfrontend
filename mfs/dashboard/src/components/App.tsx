import React from 'react';
import BusContextProvider from '../features/bus/BusContextProvider';
import { useBus } from '../hooks/useBus';
import CardContainer from './cardContainer/CardContainer';
import mock from '../../dev/mock.json';
import { EventType, MountOptions } from '../types/allTypes';

type AppProps = {
  mountOptions: MountOptions;
};

const App: React.FC<AppProps> = ({ mountOptions }) => {

  const { emit, off, on } = useBus(mountOptions.bus, 'App');
  const [page, setPage] = React.useState<string>('home');

  React.useEffect(() => {
    console.log('App useEffect');
    if(!mountOptions.bus) return;
    if(page != 'home') return;
    emit({
      source: 'App',
      eventType: EventType.CARD_LIST_UPDATED,
      payload: {
        cards: mock.cards
      }
    });

    return () => {
      off('App');
    }
  }, [page]);

  const busIntegration = mountOptions.bus;

  return (busIntegration &&
    
    <BusContextProvider bus={busIntegration}>
      <div>
        <button onClick={() => setPage('home')}>Home</button>
        <button onClick={() => setPage('about')}>About</button>
      </div>
      {page === 'home' && <CardContainer />}
      {page === 'about' && <div>About</div>}
    </BusContextProvider>
  );
};

export default App;
