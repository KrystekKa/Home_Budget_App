import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import { database, ref, onValue, update } from "./firebase";
import { auth } from "./firebase";
import "../css/_wallets.scss";

export default function Wallets() {
    const [wallets, setWallets] = useState([]);
    const [editIndex, setEditIndex] = useState(-1);
    const [editedMoney, setEditedMoney] = useState("");

    useEffect(() => {
        const user = auth.currentUser;

        if (user) {
            const walletsRef = ref(database, `users/${user.uid}/wallets`);
            const unsubscribe = onValue(walletsRef, (snapshot) => {
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

            return () => unsubscribe();
        }
    }, []);

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditedMoney("");
    };

    const handleSave = (walletId, newValue) => {
        const user = auth.currentUser;

        if (user) {
            const walletRef = ref(database, `users/${user.uid}/wallets/${walletId}`);
            const updatedMoney = parseFloat(wallets[editIndex].money) + parseFloat(newValue);
            update(walletRef, { money: updatedMoney })
                .then(() => {
                    setEditIndex(-1);
                    setEditedMoney("");
                })
                .catch((error) => {
                    console.error("Błąd:", error);
                });
        }
    };

    return (
        <>
            <Menu />
            <div className="wallets">
                <p className="my_wallets">Moje portfele</p>
                <ul className="wallets_list">
                    {wallets.map((wallet, index) => (
                        <li key={wallet.id} className="wallet_item">
                            <span className="wallet_name">{wallet.name}</span>
                            {editIndex === index ? (
                                <>
                                    <input
                                        className={"money_input"}
                                        type="number"
                                        value={editedMoney}
                                        onChange={(e) => setEditedMoney(e.target.value)}
                                    />
                                    <button className={"wallet_btn"} onClick={() => handleSave(wallet.id, editedMoney)}>
                                        Zapisz
                                    </button>
                                </>
                            ) : (
                                <>
                  <span
                      className={`wallet_money ${parseFloat(wallet.money) < 0 ? "minus" : "plus"}`}
                  >
                    {parseFloat(wallet.money).toFixed(2)} zł
                  </span>
                                    <button
                                        className={"wallet_btn"}
                                        onClick={() => handleEdit(index)}
                                    >
                                        Edytuj
                                    </button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}













