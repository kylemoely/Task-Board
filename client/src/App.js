import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DefaultHeader from './components/defaultHeader';
import Home from './pages/Home';
import Create from './pages/Create';
import Login from './pages/Login';

function App() {
  return (
    <div>
      <Router>
        <DefaultHeader />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Create />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
