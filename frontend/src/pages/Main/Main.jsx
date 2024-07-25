import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import { register } from '../../services/auth.services';



function Main() {
    const [user,setUser] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("user");
        
        if (!user) {
          navigate('/login');
        }
        setUser(user);
        
      }, []);

    function logout(){
        localStorage.removeItem("user");
        navigate("/login");
    }


  return (
    <>
    <div>Welcome {user.username}</div>
    <button onClick={logout}>Log out</button>
    </>
  )
}

export default Main