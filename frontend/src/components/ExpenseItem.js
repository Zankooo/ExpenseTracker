import React from 'react'

function ExpenseItem({expense}) {
  return (
    <div>
        <div>{expense.name}</div>
        <div>{expense.cost}</div>
    </div>
  )
}

export default ExpenseItem;