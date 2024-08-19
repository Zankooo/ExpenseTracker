import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import { register } from '../../services/auth.services';
import { Grid} from './Main.styles';
import { MdLogout } from "react-icons/md";
import {createGroup, getGroupsForUser} from "../../services/group.services";
import toast from 'react-hot-toast';
import GroupItem from '../../components/GroupItem.js';
import { Container } from '../../components/Container';
import { Header } from '../../components/Header.js';
import Button from '../../components/Button.jsx'
import CreateGroupForm from '../../components/CreateGroupForm.jsx';

function Main() {
    const [user,setUser] = useState(null);
    const navigate = useNavigate();

    const [groups, setGroups] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
      let user = localStorage.getItem("user");
      user = JSON.parse(user);
      console.log("uporabnik:", user);
      if (!user) {
        navigate('/login');
        return
      }
      setUser(user);
    }, []);

    useEffect( () => {
      pridobiGroups();
    }, [user]);

    async function pridobiGroups(){
      if(user){
        const response = await getGroupsForUser(user.id);
        setGroups(response.groups);
      }
        
    }

    function openPopup() {
      setIsPopupOpen(true);
    }

    function closePopup() {
      setIsPopupOpen(false);
    }
    
    function logout() {
        localStorage.removeItem("user");
        navigate("/login");
    }


  return (

    <>
    

    <Header>

      <h1>Welcome {user && user.username}</h1>  
      <Button  onClick={logout}>
        <p>Log-out</p>
        <MdLogout size={26}></MdLogout>
      </Button>

    </Header>

    <Container>
    <Button onClick={openPopup}>New group</Button>
   
    <br></br>
    <div className='logika-za-grupe'>
      {groups.length > 0 ? (
        <Grid>
          {groups.map(function (group) {
            return <GroupItem group={group}>
              
              </GroupItem>
      })}
    </Grid>
    ) : (<h3 className='naredi-ce-ni-grup'>No groups</h3>)}
    </div>
    
    </Container>
    {isPopupOpen ? <CreateGroupForm closePopup={closePopup} setGroups={setGroups}/> : <></>}
    </>
  )
}

export default Main