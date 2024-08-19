import React from 'react'
import styled from 'styled-components'

const UserTicket = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const Avatar = styled.div`
  border-radius: 50px;
  width: 10px;
  height: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #d85e78;
  color: #fff;
  font-weight: 500;
  margin-right: 7px;
`

function UserDetails({username}) {
  return (
    <UserTicket>
      <Avatar>{username.substr(0, 1).toUpperCase()}</Avatar>
      <div className='username'>{username}</div>
    </UserTicket>
  )
}

export default UserDetails