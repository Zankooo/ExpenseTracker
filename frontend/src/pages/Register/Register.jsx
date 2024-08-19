import React, { useEffect, useState } from 'react'
import {register} from '../../services/auth.services'
import {useNavigate} from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Forma, Container } from './Register.styles';
import Button from '../../components/Button';



function Register() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username : "",
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
    try {
      const response = await register(formData);
      console.log(response.message);
      
      const inviteGroupId = localStorage.getItem('inviteGroupid');
      if (inviteGroupId){
        navigate(`/invite/${inviteGroupId}`);
      }
      else{
        navigate(`/`)

      }
      
      toast.success(response.message);
      localStorage.removeItem('inviteGroupid');
      
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
      
    }

  }

  return (
    <Container>
      <Forma> 

        <h1 id='burek'>Registracija</h1>

        <form onSubmit={handleSubmit}>

          <div className='form-group'>
            <label htmlFor='username'>Username</label>
            <input name='username' id='username' type='text' onChange={handleChange}></input>
          </div>

          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input name='email' id='email' type='text' onChange={handleChange} ></input>
          </div>

          <div className='form-group'>
            <label htmlFor='pwd'>Password</label>
            <input type='password' id='pwd' name='password' onChange={handleChange}></input>
          </div>

          <Button style={{width: "100%", marginTop: "20px"}}>REGISTER NOW</Button>
          

        </form>

        <br></br>
        <br></br>
        <p style={{fontSize: "13px"}}>
          Already have an account? <Link to={'/login'}>LOGIN</Link>
        </p>

        

      </Forma>
    </Container>
  )
}

export default Register