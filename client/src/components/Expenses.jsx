import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Expen from "./Expen";
import { AppContext } from "../AppContext";

export default function Expenses() {
  const { expenses, getTransactions } = useContext(AppContext);
  const bottomRef = useRef();
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [expenses]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <h1>Expenses</h1>
      <input
        type="text"
        placeholder="Type to search..."
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="scrollExp">
        {expenses
          .filter((edata) =>
            edata.name.toLowerCase().includes(query.toLowerCase())
          )
          .map((edata) => (
            <Expen
              item={edata.name}
              key={edata._id}
              cost={edata.cost}
              id={edata._id}
            />
          ))}
        <div ref={bottomRef} />
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  h1 {
    margin: 0.8rem;
  }
  input {
    width: 100%;
    font-size: 1.2rem;
    padding: 6px;
    outline: none;
    border: 1px solid lightgrey;
    border-radius: 2px;
    margin-bottom: 1.5rem;
  }
  .scrollExp {
    max-height: 212px;
    scroll-behavior: smooth;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #cdb3eb47;
  }
`;
