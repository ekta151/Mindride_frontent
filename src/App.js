import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import React from 'react';
import './App.css';
import Login from './components/Login';
import Registration from './components/Registration';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <><div className="App">
      <Login />
    </div><Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Router></>
    
  );
}

export default App;
