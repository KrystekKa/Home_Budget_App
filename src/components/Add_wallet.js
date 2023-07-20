import React, { useState, useEffect } from "react";
import "../css/_add_wallet.scss";
import Menu from "./Menu";
import { database, ref, push } from "./firebase"; // Importuj referencję do bazy danych z pliku firebase.js
import { authStateChanged } from "./firebase"; // Importuj funkcję do nasłuchiwania zmiany stanu uwierzytelnienia

export default function AddWallet() {
    const [walletName, setWalletName] = useState("");
    const [user, setUser] = useState(null); // Dodajemy stan do przechowywania danych użytkownika
    const [unsubscribe, setUnsubscribe] = useState(null); // Dodajemy stan do przechowywania funkcji unsubscribe

    useEffect(() => {
        // Nasłuchiwanie zmiany stanu uwierzytelnienia
        const unsubscribe = authStateChanged((user) => {
            setUser(user);
        });

        // Zapisujemy funkcję unsubscribe do stanu
        setUnsubscribe(unsubscribe);

        // Zwróć funkcję do wyłączenia nasłuchiwania po odmontowaniu komponentu
        return () => unsubscribe();
    }, []);

    const handleChange = (event) => {
        setWalletName(event.target.value);
    };

    const handleSubmit = () => {
        // Upewnij się, że użytkownik jest zalogowany
        if (!user) {
            console.log("Użytkownik niezalogowany. Nie można zapisać danych.");
            return;
        }

        // Zapisz dane do Firebase pod identyfikatorem użytkownika
        try {
            push(ref(database, `users/${user.uid}/wallets`), {
                name: walletName,
            });

            console.log("Nazwa portfela:", walletName);
            setWalletName(""); // Wyczyść pole input po pomyślnym zapisie
        } catch (error) {
            console.error("Błąd podczas zapisu danych do Firebase:", error);
        }
    };

    return (
        <>
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
                    <button type="submit" className="wallet_submit_button">
                        +
                    </button>
                </form>
            </div>
        </>
    );
}
