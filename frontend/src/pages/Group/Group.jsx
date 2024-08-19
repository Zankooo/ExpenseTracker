import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { getExpenses, getGrupa, getMembers, getReturns, getTotalByMember } from '../../services/group.services';
import InviteForm, { InviteButton } from '../../components/InviteForm';
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
import { Heading } from './Group.styles.js';
import PieChart from '../../components/PieChart.jsx';
import Column from "../../components/Column.jsx"
import Button from '../../components/Button.jsx'
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate, Navigate } from 'react-router-dom';

const Main = styled.div`
  display: flex;
  flex-direction: row;
`

function Group() {  
  
  const navigate = useNavigate();
  const {groupId} = useParams();
  const [grupa, setGrupa] = useState(null);
  const [expensi, setExpensi] = useState([]);
  const [total, setTotal] = useState(0);
  const [spentByMe, setSpentByMe] = useState(0);
  const [owned, setOwned] = useState(0);
  const [ownedToMe, setOwnedToMe] = useState(0);
  const [members, setMembers] = useState([]);
  const [returns, setReturns] = useState([]);
  const [totalByMember, setTotalByMember] = useState([]);

  const [isPopOpen, setIsPopOpen] = useState(false);
  const [isExpenseFormOpen, setIsExpenseFormOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

   useEffect(() =>{
    fetchGroupData();
    fetchExpenses();
    fetchMembers();
    fetchReturns();
    fetchTotalByMember();
    setLoaded(true);
  }, []);
  
  useEffect(() => {
    calculateTotal();
    calculateSpentByMe();
    fetchTotalByMember();
    fetchReturns();
  }, [expensi]);

  useEffect(() => {
    calculateOwnedToMe();
    calculateOwnedByMe();
  }, [returns]);

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

  async function fetchTotalByMember() {
    const response = await getTotalByMember(groupId);
    setTotalByMember(response.totals);
  }

  function calculateTotal() {
    const result = expensi.reduce((sum, {cost}) => {
      return sum + cost
    }, 0)
    setTotal(result);
  }

  function calculateSpentByMe() {
    const myExpenses = expensi.filter(function filtering(expense){
      return expense.user.username === userId;
    })

    const result = myExpenses.reduce(function(total, {cost}){
      return total + cost;
    }, 0);

    setSpentByMe(result);
  }

  function calculateOwnedByMe() {
    const myOwned = returns.filter(function (r) {
      return r.from.username === userId;
    });

    const result = myOwned.reduce(function(sum, {amount}) {
      return sum + amount;
    }, 0);
    setOwned(result);
  }

  function calculateOwnedToMe() {
    
    const myOwned = returns.filter(function (r) {
      return r.to.username === userId;
    });

    const result = myOwned.reduce(function(sum, {amount}) {
      return sum + amount;
    }, 0);
    setOwnedToMe(result);
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
    <Row>
      <MdArrowBackIosNew style={{marginRight:'20px', cursor:'pointer'}} size={30} onClick={() => navigate('/')} />
      <div>
        <h1>{grupa.name}</h1>
        <h3>{grupa.description}</h3>
      </div>
      </Row>

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
        <Column>
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
            <Card>
              <h3>Others own me</h3>
              <div>{ownedToMe} €</div>
            </Card>
          </Row>
          <Row>
            <Column>
              <Heading>Returns</Heading>
              <ReturnsSidebar returns={returns}/>
            </Column>
          </Row>
        </Column>
        <Column style={{justifyContent: "center", alignItems: "center"}}>
          {loaded ? <PieChart expensi={totalByMember}/> : <></>}
        </Column>
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