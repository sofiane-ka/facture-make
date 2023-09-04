import React from 'react';
import './App.css';

import Facture from './component/Facture';
import Accueil from './component/Accueil';
import { BrowserRouter } from 'react-router-dom';
import { Route , Routes } from 'react-router-dom';
function App() {
  return (
    
     <BrowserRouter>
    <Routes>
      <Route path="/facture" element={<Facture/> } />
      <Route path="/" element={<Accueil/> } />
 
      </Routes>
     </BrowserRouter>
    
  );
}

export default App;
