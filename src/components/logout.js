import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { Navigate } from 'react-router-dom';

const Logout = () => {
    const [isLoggedOut, setIsLoggedOut] = useState(false);

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                setIsLoggedOut(true);
            })
            .catch((error) => {
                console.log('Błąd podczas wylogowywania:', error.message);
            });
    };

    if (isLoggedOut) {
        return <Navigate to="/login" />;
    }

    return (
        <a href="#" onClick={handleLogout}>Wyloguj</a>
    );
};

export default Logout;





