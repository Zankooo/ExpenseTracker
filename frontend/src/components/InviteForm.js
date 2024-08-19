import React, { useState } from 'react';
import { MdClose } from "react-icons/md";
import { PopUp } from './PopUp';
import Button from './Button';

function InviteForm({ groupId, closePopUp }) {
  // Use the environment variable
  const APP_URL = process.env.REACT_APP_URL;

  const [copied, setCopied] = useState(false);
  
  

  function handleClick(event){
    const link = document.getElementById('link');
    event.preventDefault();
    
    link.select();
    link.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(link.value);
    setCopied(true);
  }
  

  return (
    <PopUp>
      <div className='header'>
        <h2>INVITATION LINK</h2>
        <MdClose onClick={closePopUp}/>
      </div>
      
      {/* Use the environment variable to set the input value */}
      <input id='link' value={`${APP_URL}/invite/${groupId}`} readOnly></input>
      <Button onClick={handleClick}>Copy link</Button>
      <br></br>
      <div>{copied ? <p style={{color:"green"}}>Link copied!</p> : ""}</div>
    </PopUp>

    
  );
}

export default InviteForm;
