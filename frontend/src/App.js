import './App.css';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Main from './pages/Main/Main';
import Test from './pages/Test';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  
  return (
    <div>
    
    <Router>
    <Routes>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/' element={<Main/>}></Route>
    </Routes>
    </Router>

    <ToastContainer />

    </div>
  );
}

export default App;
