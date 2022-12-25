import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../AppContext";
export default function Spent() {
  const { expenses } = useContext(AppContext);
  const totalExpense = expenses.reduce((total, item) => {
    return (total += item.cost);
  }, 0);
  return (
    <Container>
      <span>Spent so far: ₹ {totalExpense}</span>
    </Container>
  );
}

const Container = styled.div`
  background-color: #cce5ff;
  padding: 15px 0;
  padding-left: 10px;
  border-radius: 5px;
  width: 170px;
  span {
    color: #1d5896;
    font-weight: 500;
    font-size: 18px;
  }
`;
