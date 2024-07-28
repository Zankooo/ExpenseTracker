import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
import axios from '../../config/axios'
import {login} from '../../services/auth.services'
import toast from 'react-hot-toast';
import { Button, Container, Forma } from './Login.styles';


function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email : "",
    password : ""
  }) 

  useEffect(() => {
    console.log(formData)
  }
  , [formData])

  function handleChange (event) {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name] : event.target.value // burek
    }));
    
  };

  // funkcija ki poslje na server (backend)
  async function handleSubmit(event){
    // nocemo da se refresha stran ko submitamo
    event.preventDefault();
    // namesto try se izvede catch, in to je problem
    // in pol crasha backend in pol sesporoci da post 
    // ne dela
    try {
      const response = await login(formData);
      console.log("Uspešno!", response)
      navigate("/");
      toast.success(response.message);

    } catch (error) {
      console.log("Login ne dela ker: " , error)
      toast.error(error.response.data.message);
    }

  }

  return (
    <Container>
    
    <Forma> 

      <h1 id='burek'>Login</h1>

      <form onSubmit={handleSubmit}>

        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input name='email' id='email' type='text' onChange={handleChange} ></input>
        </div>

        <div className='form-group'>
          <label htmlFor='pwd'>Password</label>
          <input type='password' id='pwd' name='password' onChange={handleChange}></input>
        </div>

        <Button>LOGIN NOW</Button>

      </form>
      <br></br>
      <br></br>
      <p style={{fontSize: "13px"}}>
        Need an account? <Link to={'/register'}>SIGN UP</Link>
      </p>
      
    </Forma>
    
    </Container>
  )
}

export default Login