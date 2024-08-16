import styled from "styled-components";



export const Grid = styled.div`
    display: inline-grid;
    grid-template-columns: auto auto;
    grid-gap: 20px;

`


export const Button = styled.div`
    background-color: white;
    display: flex;
    align-items: center;
    border: 1px solid black;
    padding-left: 5px;
    cursor: pointer;

    p{
        margin-right: 10px;
    }
`
