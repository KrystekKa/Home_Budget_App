import '../css/App.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import Menu from "./Menu";

export default function Home() {
    return (
        <>
        <Menu />
            <div className={"home_title"}>
              <h1 className={"budget"}>Dostępne środki</h1>
              <h2 className={"budget_sum"}>2222 zł</h2>
            </div>
            <div className={"home_buttons"}>
                <Link to="/add_wallet" className={"add_wallet btn"}>
                    Dodaj portfel
                </Link>
                <a href="#" className={"add_expense btn"}>Dodaj wydatek</a>
            </div>
            <p className={"last_expense_title"}>Ostatnie wydatki</p>
            <div className={"last_expense"}>
                <ul className={"expenses"}>
                    <li className={"expenses_error"}>Brak wydatków w ostatnim czasie</li>
                    <li className={"expense"}>Kwota Kategoria Data</li>
                </ul>
            </div>
        </>
    );
}