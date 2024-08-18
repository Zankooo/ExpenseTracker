import React from 'react'
import UserDetails from './UserDetails'
import styled from 'styled-components'

const ReturnRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
`

function ReturnItem({returnObject}) {
  return (
    <ReturnRow>
      <UserDetails username={returnObject.from.username}/>
      <div> &nbsp;-- </div>
      <div> {returnObject.amount}€ </div>
      <div> --&gt; &nbsp;</div>
      <UserDetails username={returnObject.to.username}/>
    </ReturnRow>
  )
}

export default ReturnItem