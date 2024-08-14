import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { addUser } from '../../services/group.services';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Invite() {

  const { groupId } = useParams();
  let user = localStorage.getItem("user");
  user = JSON.parse(user);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchInvite()
    }
  }, [user])

  async function fetchInvite() {
    try {
      const response = await addUser(user.id, groupId); 
      toast.success(response.message);
      navigate(`/group/${groupId}`);
    } catch (error) {
      toast.error(error.response.data.message);
      navigate(`/group/${groupId}`);
    }
  }

  return (
    <div>Invite</div>
  )
}

export default Invite;