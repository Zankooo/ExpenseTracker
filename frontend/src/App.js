import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Main from './pages/Main/Main';
import Test from './pages/Test';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Group from './pages/Group/Group';


function App() {
  
  return (
    <div>
    
    <Router>
    <Routes>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/' element={<Main/>}></Route>
      <Route path='/group/:groupId' element={<Group/>}></Route>
    </Routes>
    </Router>

    <Toaster
      position="top-right"
      reverseOrder={false}
    />
    

    </div>
  );
}

export default App;
