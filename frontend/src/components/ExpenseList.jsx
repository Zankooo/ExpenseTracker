import React from 'react'
import ExpenseItem from './ExpenseItem'
import styled from 'styled-components'

const List = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  height: calc(100vh - 115px);
`

function ExpenseList({expensi}) {
  return (
    <List>
      {expensi.map(function (expense) {
        return <ExpenseItem expense={expense} key={expense.id}/>
      })}
  </List>
  )
}

export default ExpenseList