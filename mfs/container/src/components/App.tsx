import React, { Suspense, useEffect } from 'react';
import { useBus } from '../hooks/useBus';
import { MountOptions } from '../types/allTypes';
import BusContextProvider from '../features/bus/BusContextProvider';
import { Nav, NavLink, Tab, TabContainerProps, } from 'react-bootstrap';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';


const RemoteEventCreationForm = React.lazy(() => import('./RemoteEventCreationForm').catch((e) => {
  console.log('Failed to load EventCreationForm', e);
  return ({ default: () => <div>Failed to load</div> })
}));

const RemoteDashboard = React.lazy(() => import('./RemoteDashboard').catch((e) => {
  console.log('Failed to load Dashboard', e);
  return ({ default: () => <div>Failed to load</div> })
}
));

type AppProps = {
  mountOptions: MountOptions;
};

const App: React.FC<AppProps> = ({ mountOptions }) => {

  const { emit, off, on } = useBus(mountOptions.bus, 'App');
  const [key, setKey] = React.useState<string | undefined>(undefined);

  const tabRef = React.useRef<Element>(null);

  const navigate = useNavigate();

  React.useEffect(() => {
    console.log('App useEffect');
    if (!mountOptions.bus) return;
    if(!key) return;
    navigate(key);
    return () => {
      off('App');
    }
  }, [key]);

  useEffect(() => {
    const path = window.location.pathname;
    if(path.includes('dashboard')) {
      setKey('dashboard');
    }
    if(path.includes('form')) {
      setKey('form');
    }
  }, []);

  const busIntegration = mountOptions.bus;

  return (busIntegration &&

    <BusContextProvider bus={busIntegration}>

      <Tab.Container 
          id="left-tabs-example" 
          onSelect={(currentKey) => {currentKey && setKey(currentKey)}} 
          mountOnEnter 
          activeKey={key}>
        <Nav variant="tabs" >
          <Nav.Item>
            <Nav.Link eventKey="dashboard">Dashboard</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="form">Event Creation Form</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content >
          <Routes>
            <Route path="/dashboard" element={
              <Tab.Pane eventKey="dashboard" mountOnEnter={true}>
                <Suspense fallback={<div>Loading...</div>}>
                  <RemoteDashboard />
                </Suspense>
              </Tab.Pane>
            } />
            <Route path="/form" element={
              <Tab.Pane eventKey="form" mountOnEnter={true}>
                <Suspense fallback={<div>Loading...</div>}>
                  <RemoteEventCreationForm />
                </Suspense>
              </Tab.Pane>
            } />
          </Routes>

        </Tab.Content>

      </Tab.Container>


    </BusContextProvider>
  );
};

export default App;
