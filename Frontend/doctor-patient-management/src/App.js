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
import DoctorLanding from './Components/Parent/DoctorLanding';
import Logout from './Components/Logout';


function App() {

  var token;


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='register' element={<Register/>}/>

          <Route path='/adminPage' element={
          <AdminProtected token={token}>
            <AdminLanding/>
          </AdminProtected>
          }/>

          <Route path='/doctorPage' element={
          <DoctorProtected token={token}>
            <DoctorLanding/>
          </DoctorProtected>
          }/>

          <Route path='/patientPage' element={
          < PatientProtected token={token}>
            
          </PatientProtected>
          }/>

          <Route path='logout' element={<Logout/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
