import styled from "styled-components";


export const Header = styled.div`
    background-color: white;
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    align-items: center;



`
export const Grid = styled.div`
    display: inline-grid;
    grid-template-columns: auto auto;
    grid-gap: 20px;

`
export const Container = styled.div`
    padding: 0 50px;
    width: 100%;
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
