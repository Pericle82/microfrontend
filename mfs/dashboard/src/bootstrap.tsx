import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import { BehaviorSubject, } from 'rxjs';
import { BusEvent, MountOptions } from './types/allTypes';
import { render } from 'react-dom';

const mount = (el: HTMLElement, options: MountOptions) => {
 createRoot(el).render(<React.StrictMode>
    <App mountOptions={options} />
  </React.StrictMode>);
}

if (process.env.NODE_ENV === 'development' && document.getElementById('dashboard-root')) {
  console.log('Running in development mode');
  const bus = new BehaviorSubject<BusEvent| undefined>(undefined);
  const root = document.getElementById('dashboard-root');

  const mountOptions: MountOptions = {
    bus
  }

  if (root) {
    mount(root, mountOptions)
  }
}

export { mount };
