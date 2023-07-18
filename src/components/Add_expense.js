import React, { useState } from 'react';
import '../css/_add_expense.scss';
import Menu from './Menu';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function AddExpense() {
    const [expenseData, setExpenseData] = useState({
        name: '',
        amount: '',
        date: new Date(),
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setExpenseData({ ...expenseData, [name]: value });
    };

    const handleDateChange = (date) => {
        setExpenseData({ ...expenseData, date });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(expenseData);
    };

    return (
        <>
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
                    <button type="submit" className="expense_submit_button">
                    </button>
                </form>
            </div>
        </>
    );
}