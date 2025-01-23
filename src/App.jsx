import './App.css';
import HomePage from './HomePage/HomePage';
import NavBar from './NavBar/NavBar';
import UsersPage from './UsersPage/UsersPage';
import ScheduleDetails from './ScheduleDetails/ScheduleDetails';
import { Routes, Route} from 'react-router-dom';
// import { useState } from 'react';

function App() {
  return (
    <div className="App">
      <NavBar> </NavBar>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/users" element={<UsersPage/>}/>
        <Route path="/schedule/:id" element={<ScheduleDetails/>} />
      </Routes>
    </div>
  );
}

export default App;
