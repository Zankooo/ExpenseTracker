import React from 'react'
import styled from 'styled-components';

const StyledArrow = styled.div`
  
  display: flex;
  flex-direction: row;
  align-items: center;
  
  
  .line {
    position: relative;
    border-bottom: 2px solid black;
    width: 50px;
    margin: 10px;
    
  }
  .line-right{
    
  }
  
  .line-right::after {
    content: '';
    position: absolute;
    right: -10px; /* Adjust the position of the arrow */
    top: -3px;    /* Center the arrow vertically */
    border-left: 10px solid black;
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
    margin-right: 10px;
  }
  `

function Arrow({text}) {
  return (
    <StyledArrow>
      <div class=" line"></div>
        <p>{text}</p>
      <div class="line line-right"></div>
    </StyledArrow>
  )
}

export default Arrow;