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
import PatientLanding from './Components/Parent/PatientLanding';
import PatientUpdate from './Components/Parent/PatientUpdate';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function App() {

  var token;


  return (
    <div className="App">
      <ToastContainer theme='colored'></ToastContainer>
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
            <PatientLanding/>
          </PatientProtected>
          }/>

          <Route path='profile' element={<PatientUpdate/>}/>
          <Route path='logout' element={<Logout/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
