import React, { useEffect, useRef, useState } from 'react';
import { InviteButton } from './InviteForm.styles';
import { MdClose, MdOutlineEuroSymbol } from "react-icons/md";
import { PopUp } from './PopUp';
import './AddExpenseForm.css'
import toast from 'react-hot-toast';
import { addExpense } from '../services/expense.services';


function AddExpenseForm({ groupId, closeExpenseForm, setExpensi }) {

  const [copied, setCopied] = useState(false);

  const [dataExpensa, setDataExpensa] = useState({
    name: '', cost : ''
  }); 

  function isValidInput() {
    const costNum = Number(dataExpensa.cost);
    return !isNaN(costNum);
  }

  function handleChange(event) {
    setDataExpensa((expense) => ({
      ...expense,
      [event.target.name]: event.target.value
    }))
  }

  
// pattern matching iz filea- kjer smo ustvarjali grupo
  async function handleSubmit(event){
    event.preventDefault();
    if (!isValidInput()) {
      toast.error("Invalid input for cost");
      return;
    }
    try {
      const data = {
        name: dataExpensa.name,
        cost: Number(dataExpensa.cost)
      }
      const response = await addExpense(groupId, data);
      console.log('Uspešno!', response);
      // ni response.group ampak je neki druzga    
      const expense = response.expense;
      //in od tukej spodaj treba spremenit vse
      setExpensi((expensi) => (
        [expense, ...expensi]
        ))
      setDataExpensa({
          name : '',
          cost : ''
        })
      closeExpenseForm();
      toast.success(response.message);
  
    } catch (error) {
      console.log("Login ne dela ker: " , error)
      toast.error(error.response.data.message);   
    }
  }


  return (
    <PopUp>
      <div className='header'>
        <h2>Add Expense</h2>
        <MdClose onClick={closeExpenseForm}/>
      </div>

      {/* Use the environment variable to set the input value */}
      <form onSubmit={handleSubmit}>

        <div id='bothInputs'>
          
          <input 
          id='inputName'
          name='name'
          placeholder='Expense name'
          onChange={handleChange}
          value={dataExpensa.name}
          ></input>

          <input 
          id="inputCost"  
          name="cost"
          placeholder='eur' 
          maxLength={5}
          onChange={handleChange}
          value={dataExpensa.cost}></input>

        </div>

        <InviteButton type='submit'>Add expense</InviteButton>
        
        <br></br>
        
      </form>
    

    </PopUp>

    
  );
}
export default AddExpenseForm;


//css popravit da bo izgledal okej
// fajn bi blo ce dodam ta expense v grupo na backendu
//in potem sprejmem response in to prikazem v frontendu