import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { getExpenses, getGrupa, getMembers, getReturns } from '../../services/group.services';
import InviteForm, { InviteButton } from '../../components/InviteForm';
import { Button } from './Group.styles.js';
import { GroupContainer } from '../../components/Container';
import { Header } from '../../components/Header';
import  AddExpenseForm  from '../../components/AddExpenseForm';
import ExpenseList from '../../components/ExpenseList';
import Page from '../../components/Page.js';
import Sidebar from '../../components/Sidebar.jsx';
import Card from '../../components/Card.jsx';
import MemberList from '../../components/MemberList.jsx';
import Row from '../../components/Row.jsx'
import ReturnsSidebar from '../../components/ReturnsSidebar.jsx';
import styled from 'styled-components';

const Main = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`

function Group() {  
  
  const {groupId} = useParams();
  const [grupa, setGrupa] = useState(null);
  const [expensi, setExpensi] = useState([]);
  const [total, setTotal] = useState(0);
  const [spentByMe, setSpentByMe] = useState(0);
  const [owned, setOwned] = useState(0);
  const [members, setMembers] = useState([]);
  const [returns, setReturns] = useState([]);

  const [isPopOpen, setIsPopOpen] = useState(false);
  const [isExpenseFormOpen, setIsExpenseFormOpen] = useState(false);

   useEffect(() =>{
    fetchGroupData();
    fetchExpenses();
    fetchMembers();
    fetchReturns();
  }, []);
  
  useEffect(() => {
    const t = calculateTotal();
    const t2 = calculateSpentByMe();
    const t3 = calculateOwnedByMe();
    setTotal(t);
    setSpentByMe(t2);
    setOwned(t3);

    // še spent by me
  }, [expensi, returns]);

  let user = localStorage.getItem('user')
  user = JSON.parse(user);
  const userId = user.username;
  

  function openPopUp(){
    setIsPopOpen(true);
  }

  function closePopUp(){
    setIsPopOpen(false);
    
  }

  function closeExpenseForm(){
    setIsExpenseFormOpen(false);
  }

  async function fetchGroupData(){
    const response = await getGrupa(groupId);
    setGrupa(response.group);
  }

  async function fetchMembers() {
    const response = await getMembers(groupId);
    setMembers(response.members);
  }

  async function fetchExpenses(){
    const response = await getExpenses(groupId);
    setExpensi(response.expenses);
  }

  async function fetchReturns() {
    const response = await getReturns(groupId);
    setReturns(response.returns);
  } 

  function calculateTotal() {
    return expensi.reduce((sum, {cost}) => {
      return sum + cost
    }, 0)
  }

  function calculateSpentByMe(){
    const myExpenses = expensi.filter(function filtering(expense){
      return expense.user.username === userId;
    })

    return myExpenses.reduce(function(total, {cost}){
      return total + cost;
    }, 0);
  }

  function calculateOwnedByMe() {
    const myOwned = returns.filter(function (r) {
      return r.from.username === userId;
    });

    return myOwned.reduce(function(sum, {amount}) {
      return sum + amount;
    }, 0);
  }

  function openExpenseForm(){
    setIsExpenseFormOpen(true);
  }
  
  if (!grupa){
    return <h1></h1>
  }
  
  return (
    <Page>
    <Header>
      <div>
        <h1>{grupa.name}</h1>
        <h3>{grupa.description}</h3>
      </div>
      <Row>
        <MemberList members={members}/>
        <Button onClick={openPopUp}>Invite a person</Button>
      </Row>
    </Header>
    <GroupContainer>
      <Sidebar>
        <Button onClick={openExpenseForm}>New expense</Button> 
      <div>
        {expensi.length > 0 ? <ExpenseList expensi={expensi}/> : 
        (<h3>No expenses!</h3>)}
      </div>
      </Sidebar>
      <Main>
        <Row>
          <Card>
            <h3>Total spent</h3>
            <div>{total} €</div>
          </Card>
          <Card>
            <h3>Spent by me</h3>
            <div>{spentByMe} €</div>
          </Card>
          <Card>
            <h3>I own to others</h3>
            <div>{owned} €</div>
          </Card>
        </Row>
        <ReturnsSidebar returns={returns}/>
        </Main>
        
      
    </GroupContainer>

    <div>
      {isPopOpen ? <InviteForm groupId={groupId} closePopUp={closePopUp}></InviteForm> : <></> }
    </div>
    <div>
      {isExpenseFormOpen ? <AddExpenseForm groupId={groupId} closeExpenseForm={closeExpenseForm} setExpensi={setExpensi}></AddExpenseForm> : <></> }
    </div>
    

    </Page>
  )
}

export default Group;