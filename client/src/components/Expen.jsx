import React, { useContext } from "react";
import styled from "styled-components";
import { VscClose } from "react-icons/vsc";
import { AppContext } from "../AppContext";
import axios from "axios";
export default function Expen({ item, cost, id }) {
  const { dispatch } = useContext(AppContext);
  const handleDeleteExp = async () => {
    try {
      await axios.delete(`api/v1/transactions/${id}`);
      dispatch({
        type: "DELETE_EXPENSE",
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error,
      });
    }
  };

  return (
    <Container>
      <div className="expList">
        <div className="exp">
          <p>{item}</p>
          <div className="money-cut">
            <span>₹ {cost}</span>
            <VscClose onClick={handleDeleteExp} />
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .expList {
    .exp {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border: 1px solid lightgrey;
      border-radius: 2px;
      padding: 8px;
      .money-cut {
        display: flex;
        align-items: center;
        gap: 1rem;
        span {
          background-color: #007bff;
          padding: 5px 10px;
          border-radius: 10px;
        }
        svg {
          background-color: #21252a;
          border-radius: 50%;
          color: white;
          font-size: 15px;
          padding: 1px;
          cursor: pointer;
        }
      }
    }
  }
`;
