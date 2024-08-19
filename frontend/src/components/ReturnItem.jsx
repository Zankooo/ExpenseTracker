import React from 'react'
import UserDetails from './UserDetails'
import styled from 'styled-components'
import Arrow from './Arrow'

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
        <Arrow text={returnObject.amount}>

        </Arrow>
      <UserDetails username={returnObject.to.username}/>
    </ReturnRow>
  )
}

export default ReturnItem;