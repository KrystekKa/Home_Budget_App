import '../css/App.scss';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loading from "./loading_screen";
import Login from "./login";
import Home from "./Home";
import AddWallet from "./Add_wallet";
import { onAuthStateChanged, auth } from './firebase';

function App() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsUserLoggedIn(!!user);
            setIsLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Router>
            {isUserLoggedIn ? (
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/add_wallet" element={<AddWallet />} />
                </Routes>
            ) : (
                <Login />
            )}
        </Router>
    );
}

export default App;

