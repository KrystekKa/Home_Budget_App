import React, { createContext, useState, useEffect, useContext } from "react";
import { database, ref, onValue } from "./firebase";
import { auth } from "./firebase";

const MoneyContext = createContext();

export const MoneyProvider = ({ children }) => {
    const [totalMoney, setTotalMoney] = useState(0);

    useEffect(() => {
        const user = auth.currentUser;

        if (user) {
            const walletsRef = ref(database, `users/${user.uid}/wallets`);
            const unsubscribe = onValue(walletsRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const total = Object.values(data).reduce(
                        (acc, wallet) => acc + parseFloat(wallet.money),
                        0
                    );
                    setTotalMoney(total.toFixed(2));
                } else {
                    setTotalMoney(0);
                }
            });

            return () => unsubscribe();
        }
    }, []);

    return (
        <MoneyContext.Provider value={totalMoney}>{children}</MoneyContext.Provider>
    );
};

export const useTotalMoney = () => {
    return useContext(MoneyContext);
};

