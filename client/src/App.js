import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout'
import Home from './pages/Home';
import Create from './pages/Create';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Project from './pages/Project';
import PersistLogin from './components/PersistLogin';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>

        <Route path='/signup' element={<Create />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        
        <Route element={<PersistLogin />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/project/:projectId' element={<Project />} />
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
