// AddWallet.js
import React, { useState } from "react";
import "../css/_add_wallet.scss"; // Zaimportowano AddWallet.scss zamiast App.scss
import Menu from "./Menu";

export default function AddWallet() {
    const [walletName, setWalletName] = useState("");

    const handleChange = (event) => {
        setWalletName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Przetwarzanie danych (np. wysłanie do serwera)
        console.log("Nazwa portfela:", walletName);
        // Możesz dodać logikę przekierowania lub resetowania formularza po zakończeniu przetwarzania danych
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