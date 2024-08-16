import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { getGrupa } from '../../services/group.services';
import InviteForm, { InviteButton } from '../../components/InviteForm.js';
import { Button } from './Group.styles.js';
import { Container } from '../../components/Container.js';
import { Header } from '../../components/Header.js';
import  AddExpenseForm  from '../../components/AddExpenseForm.js';

function Group() {  
  
  const {groupId} = useParams();
  const [grupa, setGrupa] = useState(null);

  const [isPopOpen, setIsPopOpen] = useState(false);
  const [isExpenseFormOpen, setIsExpenseFormOpen] = useState(false);

  function openPopUp(){
    setIsPopOpen(true);
    
  }

  function closePopUp(){
    setIsPopOpen(false);
    
  }

  function closeExpenseForm(){
    setIsExpenseFormOpen(false);
  }

  async function fetchGroupData(){
    const response = await getGrupa(groupId);
    console.log('response je ' , response);
    setGrupa(response.group);
    
  }



  function openExpenseForm(){
    setIsExpenseFormOpen(true);
  }

  useEffect(() =>{
    fetchGroupData();
  }, []);

  useEffect(() =>{
    console.log(grupa);
  }, [grupa]);
  
  if (!grupa){
    return <h1></h1>
  }

  return (
    <>
    <Header>
      <div>
        <h1>{grupa.name}</h1>
        <h3>{grupa.description}</h3>
      </div>
      <Button onClick={openPopUp}>Invite a person</Button>
      
    </Header>

    <Container>
    



    
    <Button onClick={openExpenseForm}>Expense form</Button>

    
    </Container>

    <div>
      {isPopOpen ? <InviteForm groupId={groupId} closePopUp={closePopUp}></InviteForm> : <></> }
    </div>

    <div>
      {isExpenseFormOpen ? <AddExpenseForm groupId={groupId} closePopUp={closeExpenseForm}></AddExpenseForm> : <></> }
    </div>
    

    </>
  )
}

export default Group;