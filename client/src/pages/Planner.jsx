import React from "react";
import styled from "styled-components";
import Budget from "../components/Budget";
import Spent from "../components/Spent";
import Remaining from "../components/Remaining";
import Expenses from "../components/Expenses";
import AddExpense from "../components/AddExpense";
import { AppProvider } from "../AppContext";

export default function Planner() {
  return (
    <AppProvider>
      <Container>
        <h1>My Budget planner</h1>
        <div className="budgetPlan">
          <Budget />
          <Spent />
          <Remaining />
        </div>
        <Expenses />
        <AddExpense />
      </Container>
    </AppProvider>
  );
}

const Container = styled.div`
  width: 80%;
  background-color: whitesmoke;
  border-radius: 20px;
  padding: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  h1 {
    margin: 0.8rem;
  }
  .budgetPlan {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
  }
`;
