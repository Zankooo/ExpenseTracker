import styled from "styled-components";

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: none;
  outline: none;
  background-color: #0071e3;
  padding: 12px 20px;
  color: #fff;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #207edb;
  }
`

export default Button;