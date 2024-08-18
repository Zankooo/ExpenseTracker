import React from 'react'
import styled from 'styled-components';
import UserDetails from './UserDetails';

const ExpenseItemCard = styled.div`
  display: inline-flex;
  flex-direction: column;
  flex: 0 0;
  padding: 10px;
  border-bottom: 1px solid #cecece;
  &:hover {
    background-color: #e2e2e2;
  }

  .expense-details {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 15px;
  }

  .expense-name {
    font-size: 16px;
    font-weight: 600;
  }
`

function ExpenseItem({expense}) {
  return (
    <ExpenseItemCard>
      <div className="expense-details">
        <div className="expense-name">{expense.name}</div>
        <div>{expense.cost}€</div>
      </div>
      <UserDetails username={expense.user.username}/>
    </ExpenseItemCard>
  )
}

export default ExpenseItem;