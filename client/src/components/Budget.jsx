import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { AppContext } from "../AppContext";
import { MdCreate } from "react-icons/md";
import axios from "axios";
export default function Budget() {
  const editBudgetRef = useRef();
  const [isMouseClick, setIsMouseClick] = useState(false);
  const { getBudget, budgetFromArray } = useContext(AppContext);
  const handleOnMouseClick = () => {
    setIsMouseClick(true);
    editBudgetRef.current.value = budgetFromArray;
  };
  const handleSaveBudget = async () => {
    const budget = editBudgetRef.current.value;
    const ubudget = {
      budget: budget,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      await axios.post("/api/v1/budgets", ubudget, config);
      getBudget();
    } catch (err) {
      console.log(err);
    }
    setIsMouseClick(false);
  };

  useEffect(() => {
    getBudget();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container>
      <div className="budget">
        Budget : ₹ {budgetFromArray}
        <span onClick={handleOnMouseClick}>
          <MdCreate /> Edit
        </span>
        <div className={`editBudget ${isMouseClick ? "show" : ""}`}>
          <input type="number" ref={editBudgetRef} />
          <button onClick={handleSaveBudget}>save</button>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  background-color: #e2e3e5;
  padding: 15px 10px;
  border-radius: 5px;
  width: max-content;
  .budget {
    color: #111111;
    font-weight: 500;
    font-size: 18px;
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 1rem;
    position: relative;
    span {
      background-color: #007bff;
      border-radius: 6px;
      padding: 2px 5px;
      font-size: 13px;
      cursor: pointer;
    }
    .editBudget {
      position: absolute;
      background-color: #aa9fff;
      padding: 10px;
      top: 40px;
      left: 150px;
      border-radius: 5px;
      display: none;
      flex-direction: column;
      align-items: flex-end;
      box-shadow: rgb(38 57 77 / 58%) -1px 9px 20px 0px;
      z-index: 99;
      input {
        width: 80px;
        outline: none;
        border: none;
        margin: 5px 0;
        font-size: 18px;
        padding: 5px 5px 0 5px;
        color: white;
        font-weight: 300;
        border-bottom: 2px solid black;
        background-color: transparent;
        &::-webkit-inner-spin-button,
        &::-webkit-outer-spin-button {
          -webkit-appearance: none;
        }
      }
      button {
        padding: 3px 8px;
        margin-top: 8px;
        border-radius: 10px;
        border: none;
        background-color: #007bff;
        font-size: 15px;
        box-shadow: rgb(0 0 0 / 45%) -1px 9px 20px 0px;
        cursor: pointer;
      }
    }
    .show {
      display: flex;
    }
  }
`;
