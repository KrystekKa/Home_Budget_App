import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Logout from "./logout";
import {Link} from "react-router-dom";

export default function Menu() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsUserLoggedIn(true);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className="brand-title">Home Budget</div>
            <a href="#" className={`toggle-button ${isOpen ? 'open' : ''}`} onClick={handleClick}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </a>
            {isUserLoggedIn && (
                <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
                    <ul>
                        <li>
                            <Link to="/">Strona główna</Link>
                        </li>
                        <li>
                            <a href="#">Kontakt</a>
                        </li>
                        <li>
                            <Logout />
                        </li>
                        <li>
                            <Link to="/wallets">Portfele</Link>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
}



