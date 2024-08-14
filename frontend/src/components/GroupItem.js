import React from 'react'
import { Card } from './GroupItem.styles';
import { useNavigate } from 'react-router-dom';



function GroupItem({group}) {
    const navigate = useNavigate()
    
    const handleClick = () => {
      navigate(`/group/${group.id}`,  )
    };
    

  return (
    <Card onClick={handleClick}>
    
    <div className='group-name'>{group.name}</div>
    <div className='group-desc'>{group.description}</div>
    </Card>
  )
}

export default GroupItem;