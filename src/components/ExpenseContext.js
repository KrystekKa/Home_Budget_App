import { createContext, useContext, useState } from "react";

const ExpenseContext = createContext();

export function useExpenseContext() {
    return useContext(ExpenseContext);
}

export function ExpenseProvider({ children }) {
    const [expensesList, setExpensesList] = useState([]);

    const addExpenseToList = (expenseData) => {
        setExpensesList([...expensesList, expenseData]);
    };

    return (
        <ExpenseContext.Provider value={{ expensesList, addExpenseToList }}>
            {children}
        </ExpenseContext.Provider>
    );
}
