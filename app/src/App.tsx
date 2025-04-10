import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import SignIn  from './components/GoogleAuth/SignIn';
import Home from './components/Home';
import Events from './components/Events';
import Tickets from './components/Tickets';

import Success from './components/CheckoutPages/Succes';
import Cancel from './components/CheckoutPages/Cancel';


const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/home' element={<Home />} />
        <Route path='/events' element={<Events />} />
        <Route path='/tickets' element={<Tickets />} />

        <Route path='/cancel' element={<Cancel />} />
        <Route path='/success' element={<Success />} />
      </Routes>
    </Router>
  )
}

export default App;