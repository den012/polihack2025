import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import SignIn  from './components/GoogleAuth/SignIn';
import Home from './components/Home';
import Events from './components/Events';


const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/home' element={<Home />} />
        <Route path='/events' element={<Events />} />
      </Routes>
    </Router>
  )
}

export default App;