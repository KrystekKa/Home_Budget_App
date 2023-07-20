import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import { database, ref, onValue } from "./firebase"; // Importuj referencję do bazy danych z pliku firebase.js
import { auth } from "./firebase"; // Importuj obiekt autentykacji

export default function Wallets() {
    const [wallets, setWallets] = useState([]);

    useEffect(() => {
        // Pobierz aktualnie zalogowanego użytkownika
        const user = auth.currentUser;

        if (user) {
            // Pobierz dane z bazy danych Firebase dla tego użytkownika
            const walletsRef = ref(database, `users/${user.uid}/wallets`);
            const unsubscribe = onValue(walletsRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const walletList = Object.values(data);
                    setWallets(walletList);
                } else {
                    setWallets([]);
                }
            });

            // Zwróć funkcję do wyłączenia nasłuchiwania po odmontowaniu komponentu
            return () => unsubscribe();
        }
    }, []);

    return (
        <>
            <Menu />
            <div className="wallets">
                <p className="my_wallets">Moje portfele</p>
                <ul className={"wallets_list"}>
                    {wallets.map((wallet, index) => (
                        <li key={index}>{wallet.name}</li>
                    ))}
                </ul>
            </div>
        </>
    );
}

