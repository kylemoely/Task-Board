import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DefaultHeader from './components/defaultHeader';
import Home from './pages/Home';
import Create from './pages/Create';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Project from './pages/Project';

function App() {
  return (
    <div>
      <Router>
        <DefaultHeader />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Create />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/project' element={<Project />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
