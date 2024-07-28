import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: start;
  background-color: rgb(209, 210, 210);
`;

export const Forma = styled.div`
  background-color: white;
  padding: 30px 20px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  width: 250px;
  margin-top: 70px;

  h1{
    margin-bottom: 30px;
    text-align: center;
  }
  p{
    text-align: center;
  }

  input {
    outline: none;
    border: none;
    background-color: white;
    border-bottom: 1px solid black;
    font-size: 16px;
    padding-left: 10px;
    padding-bottom: 8px;
  }

  label {
    margin-bottom: 8px;
    font-size: 15px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }
`;

export const Button = styled.button`
  margin-top: 25px;
  border-radius: 10px;
  border: none;
  outline: none;
  background-image: linear-gradient(to right, red, yellow);
  padding: 10px 12px;
  width: 100%;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
`;