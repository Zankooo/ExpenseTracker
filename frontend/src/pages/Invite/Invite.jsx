import React from 'react'
import { useParams } from 'react-router-dom';
import { addUser } from '../../services/group.services';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Invite() {


  const {groupId} = useParams();
  const user = localStorage.getItem('user');
  const navigate = useNavigate();

  console.log('user' , user);

  if (user){
    const response = addUser(user.id, groupId); 
    toast.success(response.message);
    navigate(`/group/${groupId}`);
  }


  return (
    <div>Invite</div>
  )
}

export default Invite;