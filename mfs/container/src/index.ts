interface Window {
    dashboard: string;
    event_creation_form: string;
    core: string;
  }
  
  if(process.env.NODE_ENV === 'development') {
    window.dashboard = 'http://localhost:3003/remoteEntry.js'
    window.event_creation_form = 'http://localhost:3004/remoteEntry.js'
    window.core = 'http://localhost:3005/remoteEntry.js'
  } 
  

import('./bootstrap');

