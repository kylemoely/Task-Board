import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DefaultHeader from './components/defaultHeader';
import Home from './pages/Home';

function App() {
  return (
    <div>
      <Router>
        <DefaultHeader />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
