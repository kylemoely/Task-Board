import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DefaultHeader from './components/defaultHeader';

function App() {
  return (
    <div>
      <Router>
        <DefaultHeader />
        <Routes>
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
