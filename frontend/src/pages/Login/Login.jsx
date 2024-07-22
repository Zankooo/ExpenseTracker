import React from 'react'
import {useNavigate} from 'react-router-dom';

function Login() {

const navigate = useNavigate();


function navigateRegister(){
    navigate('/register');
}


  return (
    <>
    <div>Login page</div>
    <button onClick={navigateRegister}>Odidi na Register</button>
    </>
  )
}

export default Login