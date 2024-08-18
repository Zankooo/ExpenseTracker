import React from 'react'
import Sidebar from './Sidebar'
import ReturnItem from './ReturnItem'
import styled from 'styled-components'

const List = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow-y: scroll;
  height: calc(100vh - 115px);
`

function ReturnsSidebar
({returns}) {
  return (
    <Sidebar>
      <List>
        {returns.map(function (r) {
          return <ReturnItem returnObject={r}/>
        })}
      </List>
    </Sidebar>
  )
}

export default ReturnsSidebar