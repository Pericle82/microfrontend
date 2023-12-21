import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import { BehaviorSubject, } from 'rxjs';
import { BusEvent, MountOptions } from './types/allTypes';
import { render } from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const mount = (el: HTMLElement, options: MountOptions) => {
  if (!el) return;
  createRoot(el).render(
      <BrowserRouter>
            <Routes>
        <Route path='*' element={<App mountOptions={options} />} />
      </Routes>
        
      </BrowserRouter>
  );  
}

const root = document.getElementById('root');
if(!root) throw new Error('Root element not found');
mount(root, {
  bus: new BehaviorSubject<BusEvent | undefined>(undefined)
});


