import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import { register } from '../../services/auth.services';
import { Header, Button } from './Main.styles';
import { MdLogout } from "react-icons/md";
import {createGroup} from "../../services/group.services";
import toast from 'react-hot-toast';

function Main() {
    const [user,setUser] = useState(null);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
      name: "", description : ""
    });

    const [groups, setGroups] = useState([]);
    
    useEffect(() =>{
      console.log("Tole so grupe: " , groups);
      console.log("tole je form data: " , formData)
    }, [groups, formData]);


    useEffect(() => {
        let user = localStorage.getItem("user");
        user = JSON.parse(user);
        console.log("uporabnik:", user);
        if (!user) {
          navigate('/login');
        }
        setUser(user);
        
      }, []);

    function logout(){
        localStorage.removeItem("user");
        navigate("/login");
    }

    function handleChange(event) {
      setFormData((prevState) => ({
        ...prevState,
        [event.target.name] : event.target.value 
      }));
      
    };

    async function handleSubmit(event){
      event.preventDefault();

      try {
        const response = await createGroup(formData);
        console.log("Uspešno!", response);
        setGroups((group) => (
          [...groups, group]
          ))
        toast.success(response.message);
  
      } catch (error) {
        console.log("Login ne dela ker: " , error)
        toast.error(error.response.data.message);
        
      }

    }

  return (
    <>
    <Header>

      <h1>Welcome {user && user.username}</h1>  
      <Button  onClick={logout}>
        <p>Log-out</p>
        <MdLogout size={26}></MdLogout>
      </Button>

    </Header>

    

    <form onSubmit={handleSubmit}>
      <label htmlFor='name'>Group name:</label>
      <input id='name' name='name' onChange={handleChange}></input>

      <label htmlFor='description'>Group description:</label>
      <input name='description' id='description' onChange={handleChange}></input>

      <button>Button</button>
    </form>
    </>
  )
}

export default Main