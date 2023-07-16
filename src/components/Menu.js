import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Logout from "./logout";

export default function Menu() {
    const [showMenu, setShowMenu] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setShowMenu(true);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const handleClick = () => {
        const navbarLinks = document.getElementsByClassName('navbar-links')[0];
        navbarLinks.classList.toggle('active');
        setIsOpen(!isOpen);
    };

    if (isLoading || !showMenu) {
        return null;
    }

    return (
        <nav className="navbar">
            <div className="brand-title">Home Budget</div>
            <a href="#" className={`toggle-button ${isOpen ? 'open' : ''}`} onClick={handleClick}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </a>
            <div className="navbar-links">
                <ul>
                    <li>
                        <a href="#">Strona główna</a>
                    </li>
                    <li>
                        <a href="#">Kontakt</a>
                    </li>
                    <li>
                        <Logout />
                    </li>
                </ul>
            </div>
        </nav>
    );
}



