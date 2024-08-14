import styled from "styled-components";

export const InviteButton = styled.button`
    border-radius: 10px;
    border: none;
    outline: none;
    background-image: linear-gradient(to right, red, yellow);
    padding: 10px 12px;
    width: 100%;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
    
    

`

export const PopUp = styled.form`
    
    padding: 22px 30px;
    display: flex;
    width: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    flex-direction: column;
    box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.5);
    border-radius: 11px;
   
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        
    }

    svg {
        cursor: pointer;
        font-size: 25px;
    }

    input {
        border-radius: 7px;
        border: 1px solid black;
        padding: 10px;
        font-size: medium;
        margin-bottom: 10px;
    }


`
