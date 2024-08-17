import React, { useEffect, useRef, useState } from 'react';
import { InviteButton } from './InviteForm.styles';
import { MdClose, MdOutlineEuroSymbol } from "react-icons/md";
import { PopUp } from './PopUp';
import './AddExpenseForm.css'
import toast from 'react-hot-toast';
import { addExpense } from '../services/expense.services';


function AddExpenseForm({ groupId, closeExpenseForm, setExpensi }) {
  // Use the environment variable
  const APP_URL = process.env.REACT_APP_URL;

  const [copied, setCopied] = useState(false);
  
  const [expense, setExpense] = useState();
  const [cost, setCost] = useState();

  const [dataExpensa, setDataExpensa] = useState({
    name: '', cost : ''
  });


  

  useEffect(() => {
    console.log(expense);
    console.log(cost);
  }, [expense, cost]); 

  function handleChange(event) {
    const { id, value } = event.target;
    if (id === 'inputName') {
      setExpense(value);
    } else if (id === 'inputCost') {
      setCost(value);
    }
  }

  
// pattern matching iz filea- kjer smo ustvarjali grupo
  async function handleSubmit(event){
    event.preventDefault();
    try {
      const response = await addExpense(dataExpensa);
      console.log('Uspešno!', response);
      // ni response.group ampak je neki druzga    
      const expense = response.expense;
      //in od tukej spodaj treba spremenit vse
      setExpensi((expensi) => (
        [...expensi, expense]
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
          placeholder='Expense name'
          onChange={handleChange}
          value={expense}
          ></input>

          <input 
          id="inputCost"  
          placeholder='eur' 
          maxLength={5}
          onChange={handleChange}
          value={cost}></input>

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