import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import { useTotalMoney } from "./MoneyContext";
import { database, ref, onValue, auth } from "./firebase";

export default function Home() {
    const totalMoneyString = useTotalMoney();
    const totalMoney = parseFloat(totalMoneyString);
    const formattedTotalMoney = isNaN(totalMoney) ? "0.00" : totalMoney.toFixed(2);

    const [expensesList, setExpensesList] = useState([]);

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            const expensesRef = ref(database, `users/${user.uid}/wallets`);
            const expensesListener = onValue(expensesRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    // Assuming data is an object with wallets and their expenses
                    const allExpenses = Object.values(data).reduce((allExpenses, wallet) => {
                        if (wallet.expenses) {
                            const walletExpenses = Object.values(wallet.expenses);
                            allExpenses.push(...walletExpenses);
                        }
                        return allExpenses;
                    }, []);
                    setExpensesList(allExpenses);
                } else {
                    setExpensesList([]);
                }
            });

            // Clean up the listener when the component unmounts
            return () => expensesListener();
        }
    }, []);

    return (
        <>
            <div className="container">
            <Menu />
            <div className={"home_title"}>
                <h1 className={"budget"}>Dostępne środki</h1>
                <h2 className={"budget_sum"}>{formattedTotalMoney} zł</h2>
            </div>
            <div className={"home_buttons"}>
                <Link to="/add_wallet" className={"add_wallet btn"}>
                    Dodaj portfel
                </Link>
                <Link to="/add_expense" className={"add_expense btn"}>
                    Dodaj wydatek
                </Link>
            </div>
            <p className={"last_expense_title"}>Ostatnie wydatki</p>
            <div className={"last_expense"}>
                <table className="expenses">
                    <thead>
                    <tr className="table_title" >
                        <th>Portfel</th>
                        <th>Nazwa</th>
                        <th>Kwota</th>
                        <th>Data</th>
                    </tr>
                    </thead>
                    <tbody>
                    {expensesList.map((expense, index) => (
                        <tr key={index}>
                            <td className="table_cell" >{expense.selectedWallet.name}</td>
                            <td className="table_cell" >{expense.name}</td>
                            <td className="table_cell" >{expense.amount} zł</td>
                            <td className="table_cell" >{expense.date ? new Date(expense.date).toLocaleDateString("pl-PL") : "Brak daty"}</td>
                        </tr>
                    ))}
                    {expensesList.length === 0 && (
                        <tr className="expenses_error">
                            <td colSpan="4">Brak wydatków w ostatnim czasie</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            </div>
        </>
    );
}







