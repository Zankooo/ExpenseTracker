import styled from "styled-components";

export const Card = styled.div`
    
    box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.2);
    border-radius: 11px;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    width: 201px;
    height: 120px;
    cursor: pointer;


    .group-name {
        font-size: large;
        font-weight: 600;
        margin-bottom: 7px;
        text-align: center;
        
        border-top-right-radius: 11px;
        border-top-left-radius: 11px;
        background-color: #E0E0E0;
        padding: 7px;

    }

    .group-desc{
        word-wrap: break-word;
        overflow: hidden;
        padding: 7px;
        
    }
    &:hover,
    &:focus {
        box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.4);
    }
  
`
