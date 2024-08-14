import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { getGrupa } from '../../services/group.services';
import InviteForm, { InviteButton } from '../../components/InviteForm.js';
import { Button } from './Group.styles.js';


function Group() {  
  
  const {groupId} = useParams();
  const [grupa, setGrupa] = useState(null);

  const [isPopOpen, setIsPopOpen] = useState(false);
  

  function openPopUp(){
    setIsPopOpen(true);
    
  }

  function closePopUp(){
    setIsPopOpen(false);
    
  }

  async function fetchGroupData(){
    const response = await getGrupa(groupId);
    console.log('response je ' , response);
    setGrupa(response.group);
    
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
    <h1>{grupa.name}</h1>
    
    <div>
      {isPopOpen ? <InviteForm groupId={groupId} closePopUp={closePopUp}></InviteForm> : <></> }
    </div>

    <Button onClick={openPopUp}>Invite a person</Button>
    </>
  )
}

export default Group;