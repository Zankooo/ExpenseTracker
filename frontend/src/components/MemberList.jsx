import React from 'react'
import styled from 'styled-components'
import UserDetails from './UserDetails'

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 20px;

  & > * {
    margin-right: 10px;
  }
`


function MemberList({members}) {
  return (
    <Row>{members.map((member) => (
        <UserDetails username={member.username} key={member.username}/>
    ))}</Row>
  )
}

export default MemberList