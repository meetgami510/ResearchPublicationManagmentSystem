import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Upload from "./components/Upload";
import Login from "./components/Login";
import Journal from "./pages/Journal"
import Register from "./components/Register";
import { ToastContainer, toast } from 'react-toastify';
import {useCookies} from 'react-cookie'
import 'react-toastify/dist/ReactToastify.css';

import EmailVerify from './components/EmailVerify'
import VerifyEmail from "./components/VerifyEmail";
import { useSelector } from 'react-redux';
import Spinner from './components/Spinner';
import Home from "./pages/Home";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const {loading} = useSelector(state=>state.alerts)
  const [cookies,setCookies,removeCookies] = useCookies(['token']);

  const handleSetCookies = (key ,data) => {
    setCookies(`${key}`,data,{path:'/'});
  }
  const handleRemoveCookies = (key) => {
    removeCookies(`${key}`,{path:'/'});
  }

  return (
    <>
      <BrowserRouter>
      {loading ? <Spinner/> :
      <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login/>} />   
            <Route path='/senddata' element={<Upload/>} />
            <Route path='/admin/Jounal' element={<Journal/>} />
            <Route path='/register' element={<Register/>}/>
            <Route path="/user/:id/verify/:token" element={<EmailVerify />} />
            <Route path='/user/:id/adminverify/:token' element={<VerifyEmail />}/>
        </Routes>
      }

      </BrowserRouter>
      <ToastContainer/>
    </>
  );
}

export default App;
