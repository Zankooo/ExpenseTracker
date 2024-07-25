import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import { register } from '../../services/auth.services';



function Main() {
    const [user,setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        let user = localStorage.getItem("user");
        user = JSON.parse(user);
        console.log("uporabnik:" , user);
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
    
    <div>Welcome {user && user.username}</div>
    <button onClick={logout}>Log out</button>
    </>
  )
}

export default Main