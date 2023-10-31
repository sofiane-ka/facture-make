import React , {useContext , useState} from 'react';
import './App.css';
import { SharedContext } from './component/SharedContext';
import Facture from './component/Facture';
import Accueil from './component/Accueil';
import { BrowserRouter } from 'react-router-dom';
import { Route , Routes } from 'react-router-dom';
import Factures from './component/Factures';
import { Link } from 'react-scroll';
import Attachements from './component/Attachements';
import Attach from './component/Attach';

function App() {
  
  
  const [ready, setReady] = useState(false);
  const handleReady = () => {
    setReady(!ready);
  };
  return (
    <BrowserRouter>
    <SharedContext.Provider value={{ready, handleReady}}>
     
    <Routes>
      <Route path="factures" element={<Factures/>}/>
      <Route path="/factures/:factureNum" element={<Facture/> } />
      <Route path="/attachements" element={<Attachements/> } />
      <Route path="/Attachements:factureNum" element={<Attach/> } />
      <Route path="/facture" element={<Facture/> } />
      <Route path="/" element={<Accueil/> } />
      
 
      </Routes>
     
     </SharedContext.Provider>
     </BrowserRouter>
  );
}

export default App;
