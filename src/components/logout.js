import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';

const Logout = () => {
    const [isLoggedOut, setIsLoggedOut] = useState(false);

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                setIsLoggedOut(true);
                setTimeout(() => {
                    window.location.reload();
                }, 0);
            })
            .catch((error) => {
                console.log('Błąd podczas wylogowywania:', error.message);
            });
    };

    if (isLoggedOut) {
        return null
    }

    return (
        <a href="#" onClick={handleLogout}>Wyloguj</a>
    );
};

export default Logout;




