import React, { useState, useEffect } from "react";
import "../css/_add_expense.scss";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { auth, database, ref, onValue, push, update } from "./firebase";
import { useExpenseContext } from "./ExpenseContext";

export default function AddExpense() {
    const [expenseData, setExpenseData] = useState({
        name: "",
        amount: "",
        date: new Date(),
        selectedWallet: null,
    });

    const [wallets, setWallets] = useState([]);
    const navigate = useNavigate();
    const { addExpenseToList } = useExpenseContext();

    useEffect(() => {
        const fetchWallets = async () => {
            const user = auth.currentUser;

            if (user) {
                const walletsRef = ref(database, `users/${user.uid}/wallets`);
                const snapshot = await onValue(walletsRef, (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        const walletList = Object.entries(data).map(([id, wallet]) => ({
                            id,
                            ...wallet,
                        }));
                        setWallets(walletList);
                    } else {
                        setWallets([]);
                    }
                });
            }
        };

        fetchWallets();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setExpenseData({ ...expenseData, [name]: value });
    };

    const handleDateChange = (date) => {
        setExpenseData({ ...expenseData, date });
    };

    const handleWalletChange = (event) => {
        const selectedWalletId = event.target.value;
        const selectedWallet = wallets.find((wallet) => wallet.id === selectedWalletId);
        setExpenseData({ ...expenseData, selectedWallet });
    };

    const handleExpenseDeduction = (walletId, expenseAmount) => {
        const user = auth.currentUser;

        if (user) {
            const walletRef = ref(database, `users/${user.uid}/wallets/${walletId}`);
            const updatedMoney =
                parseFloat(wallets.find((wallet) => wallet.id === walletId).money) -
                parseFloat(expenseAmount);
            update(walletRef, { money: updatedMoney })
                .then(() => {
                })
                .catch((error) => {
                    console.error("Error updating document:", error);
                });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        addExpenseToList(expenseData);

        const user = auth.currentUser;
        if (user && expenseData.selectedWallet) {
            const walletId = expenseData.selectedWallet.id;
            const expenseAmount = parseFloat(expenseData.amount);
            handleExpenseDeduction(walletId, expenseAmount);

            const expensesRef = ref(
                database,
                `users/${user.uid}/wallets/${expenseData.selectedWallet.id}/expenses`
            );
            try {
                const formattedExpenseData = {
                    ...expenseData,
                    date: expenseData.date.toISOString(),
                };
                await push(expensesRef, formattedExpenseData);

                setExpenseData({
                    name: "",
                    amount: "",
                    date: new Date(),
                    selectedWallet: null,
                });
                navigate("/");
            } catch (error) {
                console.error("Błąd zapisu wydatku do portfela:", error);
            }
        }
    };

    return (
        <>
            <div className="addExpense_container">
            <Menu />
            <h1 className={"expense_title"}>Dodaj nowy wydatek</h1>
            <div className="add_expense_form">
                <form className="expense_form" onSubmit={handleSubmit}>
                    <label className="form_label">
                        <input
                            type="text"
                            name="name"
                            value={expenseData.name}
                            onChange={handleChange}
                            className="form_input_expense"
                            placeholder="Nazwa"
                        />
                    </label>
                    <label className="form_label">
                        <input
                            type="number"
                            name="amount"
                            value={expenseData.amount}
                            onChange={handleChange}
                            className="form_input_expense"
                            placeholder="Kwota"
                        />
                    </label>
                    <label className="form_label">
                        <DatePicker
                            selected={expenseData.date}
                            onChange={handleDateChange}
                            dateFormat="dd/MM/yyyy"
                            className="form_input_expense datepicker_input"
                        />
                    </label>
                    <label className="form_label">
                        <select
                            name="selectedWallet"
                            value={expenseData.selectedWallet?.id || ""}
                            onChange={handleWalletChange}
                            className="form_input_expense"
                        >
                            <option value="">Wybierz portfel</option>
                            {wallets.map((wallet) => (
                                <option key={wallet.id} value={wallet.id} className="options">
                                    {wallet.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <button type="submit" className="expense_submit_button"></button>
                </form>
            </div>
        </div>
        </>
    );
}


