import React from 'react';

import AppNavbar from './components/AppNavbar';
import JobList from './components/JobList'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

function App() {
  return (
    <div className="App">
      <AppNavbar />
      <JobList />
    </div>
  );
}

export default App;
