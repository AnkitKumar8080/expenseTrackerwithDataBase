import React, { useContext, useRef } from "react";
import styled from "styled-components";
import { AppContext } from "../AppContext";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export default function AddExpense() {
  const name = useRef();
  const cost = useRef();
  const { dispatch } = useContext(AppContext);
  const onSubmit = async (event) => {
    event.preventDefault();
    const expense = {
      name: name.current.value,
      cost: parseInt(cost.current.value),
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/v1/transactions", expense, config);
      dispatch({
        type: "ADD_EXPENSE",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error,
      });
    }
    name.current.value = "";
    cost.current.value = "";
  };
  return (
    <Container>
      <h1>Add Expense</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" autoComplete="off" required ref={name} />
        <label htmlFor="cost">Cost</label>
        <input type="number" id="cost" required ref={cost} />
        <button type="submit">Add</button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  width: 60%;
  h1 {
    margin: 0.8rem;
  }
  form {
    display: flex;
    flex-direction: column;
    label {
      margin-bottom: 0.2rem;
      font-size: 1.3rem;
      font-weight: 500;
    }
    input {
      border: 1px solid lightgrey;
      padding: 8px 5px;
      font-size: 20px;
      border-radius: 2px;
      margin-top: 2px;
      margin-bottom: 1rem;
      outline: none;
      &::-webkit-inner-spin-button,
      &::-webkit-outer-spin-button {
        -webkit-appearance: none;
      }
    }

    button {
      width: max-content;
      padding: 8px 15px;
      border-radius: 10px;
      border: none;
      background-color: #007bff;
      font-size: 20px;
      box-shadow: rgb(0 0 0 / 45%) -1px 9px 20px 0px;
    }
  }
`;
