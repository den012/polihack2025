import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import SignIn  from './components/GoogleAuth/SignIn';
import RHome from './components/RHome';
import Login from './components/Login';

const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        {/* <Route path='/' element={<SignIn />} />
        <Route path='/home' element={<Home />} /> */}
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<RHome />} />
      </Routes>
    </Router>
  )
}

export default App;