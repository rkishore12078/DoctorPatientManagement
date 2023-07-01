import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Login from './Components/Login';
import Register from './Components/Register';
import Home from './Components/Home';
import AdminLanding from './Components/Parent/AdminLanding'
import AdminProtected from './Components/Protected/AdminProtected';
import DoctorProtected from './Components/Protected/DoctorProtected';
import PatientProtected from './Components/Protected/PatientProtected';
import Doctor from './Components/Child/Doctor';
import { useState } from 'react';


function App(props) {

  var token;

  const[user,setUser]=useState({
    "userId": 0,
    "email": "",
    "password": "",
    "role": "",
    "token": ""
})

  // var populate=(newUser)=>
  // {
  //   props.newUser;
  // }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Doctor/>
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
            <AdminLanding/>
          </DoctorProtected>
          }/>

          <Route path='/patientPage' element={
          < PatientProtected token={token}>
            
          </PatientProtected>
          }/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
