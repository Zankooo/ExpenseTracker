import React, { useEffect, useState } from 'react'
import "./Register.css"
import axios from '../../config/axios'
import {register} from '../../services/auth.services'


function Register() {

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
      console.log(response)

    } catch (error) {
      console.log(error)
      
    }

  }

  return (
    <div id='forma'> 

      <h1 id='burek'> Registriraj se debil</h1>

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

        <button>REGISTER NOW</button>

      </form>

    </div>

  )
}

export default Register