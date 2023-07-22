import React, { useState, useEffect } from "react";
import "../css/_add_wallet.scss";
import Menu from "./Menu";
import { database, ref, push } from "./firebase";
import { authStateChanged } from "./firebase";

export default function AddWallet() {
    const [walletName, setWalletName] = useState("");
    const [money, setMoney] = useState("");
    const [user, setUser] = useState(null);
    const [unsubscribe, setUnsubscribe] = useState(null);

    useEffect(() => {
        const unsubscribe = authStateChanged((user) => {
            setUser(user);
        });

        setUnsubscribe(unsubscribe);

        return () => unsubscribe();
    }, []);

    const handleChange = (event) => {
        if (event.target.name === "name") {
            setWalletName(event.target.value);
        } else if (event.target.name === "money") {
            setMoney(event.target.value);
        }
    };

    const handleSubmit = () => {
        if (!user) {
            console.log("Użytkownik niezalogowany. Nie można zapisać danych.");
            return;
        }

        try {
            push(ref(database, `users/${user.uid}/wallets`), {
                name: walletName,
                money: money,
            });

            console.log("Nazwa portfela:", walletName);
            setWalletName("");
            setMoney("0");
        } catch (error) {
            console.error("Błąd podczas zapisu danych do Firebase:", error);
        }
    };

    return (
        <>
            <div className="addWallets_container">
            <Menu />
            <h1 className={"wallet_title"}>Dodaj nowy portfel</h1>
            <div className="add_wallet_form">
                <form className={"wallet_form"} onSubmit={handleSubmit}>
                    <label className="wallet_form_label">
                        <input
                            placeholder="Podaj nazwę portfela"
                            type="text"
                            name="name"
                            value={walletName}
                            onChange={handleChange}
                            className="form_input"
                        />
                    </label>
                    <label className="wallet_form_label">
                        <input
                            placeholder="Podaj początkową kwotę"
                            type="number"
                            name="money"
                            value={money}
                            onChange={handleChange}
                            className="form_input"
                        />
                    </label>
                    <button type="submit" className="wallet_submit_button">
                        +
                    </button>
                </form>
            </div>
            </div>
        </>
    );
}
