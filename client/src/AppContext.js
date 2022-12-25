import { createContext, useReducer, useState } from "react";
import axios from "axios";
const AppReducer = (state, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return {
        expenses: [...state.expenses, action.payload],
      };
    case "GET_EXPENSES":
      return {
        expenses: action.payload,
      };

    case "DELETE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense._id !== action.payload
        ),
      };
    case "TRANSACTION_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

const initialState = {
  expenses: [
    // this is the place where all the expenses with name and cost are added up..
  ],
};

export const AppContext = createContext();

export const AppProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const [budgetFromArray, setBudgetFromArray] = useState(0);
  const getTransactions = async () => {
    try {
      const res = await axios.get("/api/v1/transactions");
      dispatch({
        type: "GET_EXPENSES",
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  const getBudget = async () => {
    try {
      const res = await axios.get("/api/v1/budgets");
      setBudgetFromArray(res.data.data[res.data.data.length - 1].budget);
      dispatch({
        type: "GET_BUDGET",
        payload: budgetFromArray,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AppContext.Provider
      value={{
        budget: state.budget,
        expenses: state.expenses,
        getTransactions,
        dispatch,
        getBudget,
        budgetFromArray,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
