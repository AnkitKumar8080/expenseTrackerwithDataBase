import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../AppContext";

export default function Remaining() {
  const { expenses, budgetFromArray } = useContext(AppContext);
  const totalExpense = expenses.reduce((total, item) => {
    return (total += item.cost);
  }, 0);

  return (
    <Container
      style={{
        backgroundColor: `${totalExpense > budgetFromArray ? "red" : ""}`,
      }}
    >
      <span>Remaining : ₹ {budgetFromArray - totalExpense}</span>
    </Container>
  );
}

const Container = styled.div`
  background-color: #d4edda;
  padding: 15px 0;
  padding-left: 10px;
  border-radius: 5px;
  width: 170px;
  span {
    color: #266335;
    font-weight: 500;
    font-size: 18px;
  }
`;
