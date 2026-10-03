import React from 'react';
import {createRoot,hydrateRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App.jsx';
import './styles/site.css';
const root=document.getElementById('root');
const app=<BrowserRouter><App/></BrowserRouter>;
if(root.querySelector('main'))hydrateRoot(root,app);else createRoot(root).render(app);
