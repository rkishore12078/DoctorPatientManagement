import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Login from './Components/Login';
import Register from './Components/Register';
import Home from './Components/Home';
import { useState } from 'react';
import AllDoctors from './Components/Parent/AllDoctors'
import AdminProtected from './Components/Protected/AdminProtected';
import DoctorProtected from './Components/Protected/DoctorProtected';
import PatientProtected from './Components/Protected/PatientProtected';


function App() {

  var token;


  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='register' element={<Register/>}/>

          <Route path='/adminPage' element={
          <AdminProtected token={token}>
            
          </AdminProtected>
          }/>

          <Route path='/doctorPage' element={
          <DoctorProtected token={token}>
            <AllDoctors/>
          </DoctorProtected>
          }/>

          <Route path='/patientPage' element={
          < PatientProtected token={token}>
            <AllDoctors/>
          </PatientProtected>
          }/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
