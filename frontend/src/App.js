import './App.css';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Test from './pages/Test';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {useNavigate} from 'react-router-dom';



function App() {
  
  return (
    <div>
    
    <Router>
    <Routes>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
    </Routes>
    </Router>


    </div>
  );
}

export default App;
