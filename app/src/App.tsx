import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import SignIn  from './components/GoogleAuth/SignIn';
import Home from './components/Home';
import Events from './components/Events';
import Cart from './components/Cart';

import Success from './components/CheckoutPages/Cancel';
import Cancel from './components/CheckoutPages/Cancel';


const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/home' element={<Home />} />
        <Route path='/events' element={<Events />} />
        <Route path='/cart' element={<Cart />} />

        <Route path='/cancel' element={<Cancel />} />
        <Route path='/success' element={<Success />} />
      </Routes>
    </Router>
  )
}

export default App;