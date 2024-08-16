import React, { useEffect, useCallback, useRef } from 'react'
import { useParams } from 'react-router-dom';
import { addUser } from '../../services/group.services';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Invite() {

  const done = useRef(false);

  const fetchInvite = useCallback(async () => {
    try {
        const response = await addUser(user.id, groupId); 
        toast.success(response.message);
        navigate(`/group/${groupId}`);
      } 
      catch (error) {
        toast.error(error.response.data.message);
        navigate(`/group/${groupId}`);
      }
  }, []);

  const { groupId } = useParams();
  let user = localStorage.getItem("user");
  user = JSON.parse(user);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if(done.current == false){
        fetchInvite();
        done.current = true;
      }
    }
    else {
      localStorage.setItem('inviteGroupid', groupId);
      navigate(`/register`);
      
    }
    
  }, [fetchInvite]);
  

   

  return (
    <div>Invite</div>
  )
}

export default Invite;



// 5 folka v group
// 1 placa za to 20 
// 20/5 = 4 eur

//20 je nekdo dolzen
// 40



