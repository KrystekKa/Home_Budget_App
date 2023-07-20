import React from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import { useTotalMoney } from "./MoneyContext";

export default function Home() {
    const totalMoneyString = useTotalMoney();
    const totalMoney = parseFloat(totalMoneyString);
    const formattedTotalMoney = isNaN(totalMoney) ? "0.00" : totalMoney.toFixed(2);

    return (
        <>
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
                <ul className={"expenses"}>
                    <li className={"expenses_error"}>Brak wydatków w ostatnim czasie</li>
                    <li className={"expense"}>Kwota Kategoria Data</li>
                </ul>
            </div>
        </>
    );
}


