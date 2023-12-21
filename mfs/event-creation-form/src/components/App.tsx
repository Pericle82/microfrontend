import React from 'react';
import BusContextProvider from '../features/BusContextProvider';
import { useBus } from '../hooks/useBus';
import { MountOptions } from '../types/allTypes';
import FormContextProvider from '../features/FormContextProvider';
import StepContainer from './stepContainer/StepContainer';
import './app.scss';

type AppProps = {
  mountOptions: MountOptions;
};

const App: React.FC<AppProps> = ({ mountOptions }) => {

  const { emit, off, on } = useBus(mountOptions.bus, 'App');

  React.useEffect(() => {
    console.log('App useEffect');


    return () => {
      off('App');
    }
  }, []);

  const busIntegration = mountOptions.bus;

  return (busIntegration &&

    <BusContextProvider bus={busIntegration}>
      <FormContextProvider>
        <StepContainer />
      </FormContextProvider>
    </BusContextProvider>
  );
};

export default App;
