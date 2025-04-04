import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import SignIn  from './components/GoogleAuth/SignIn';
import Home from './components/Home';

const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App;