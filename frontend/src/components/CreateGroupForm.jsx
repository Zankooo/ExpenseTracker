import React, { useEffect, useRef, useState } from 'react';
import { MdClose } from "react-icons/md";
import { PopUp } from './PopUp';
import './AddExpenseForm.css'
import toast from 'react-hot-toast';
import Button from './Button';
import { createGroup } from '../services/group.services';


function CreateGroupForm({ closePopup, setGroups }) {

  const [formData, setFormData] = useState({
    name: '', description : ''
  });


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
        const group = response.group;
        setGroups((groups) => (
          [...groups, group]
          ))
        setFormData({
          name: '', description : ''
        })
        toast.success(response.message);
        closePopup();
  
      } catch (error) {
        console.log('Login ne dela ker: ' , error);
        toast.error(error.response.data.message);
        
      }

    }


  return (
    <PopUp>
      <div className='header'>
        <h2>Create a new group</h2>
        <MdClose onClick={closePopup}/>
      </div>

      <form onSubmit={handleSubmit}
      style={{width: "100%"}}>

          <input 
          id='inputName'
          name='name'
          placeholder='Group name'
          onChange={handleChange}
          value={formData.name}
          style={{width: "100%"}}
          ></input>

          <input 
          id="inputDescription"  
          name="description"
          placeholder='Group description' 
          onChange={handleChange}
          value={formData.description}
          style={{width: "100%"}}></input>

        <Button type='submit' style={{width: "100%"}}>Create group</Button>
        
        <br></br>
        
      </form>
    

    </PopUp>

    
  );
}
export default CreateGroupForm;


//css popravit da bo izgledal okej
// fajn bi blo ce dodam ta expense v grupo na backendu
//in potem sprejmem response in to prikazem v frontendu