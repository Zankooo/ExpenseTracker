import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { getGrupa } from '../../services/group.services';

function Group() {  
  
  const {groupId} = useParams();
  const [grupa, setGrupa] = useState(null);

  

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
    <h1>{grupa.name}</h1>
  )
}

export default Group;