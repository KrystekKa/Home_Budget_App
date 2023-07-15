import React, { useState, useEffect } from 'react';
import { auth, signInWithEmailAndPassword } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowForm(true);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setError('');
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setError('');
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setError('');
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setError('');

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('Zalogowano');
            })
            .catch((error) => {
                setError('Adres e-mail lub hasło nie są poprawne');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                console.log('Błąd logowania:', error.message);
            });
    };

    const handleRegister = (e) => {
        e.preventDefault();

        setError('');

        setShowRegisterForm(true);
    };

    const handleCreateAccount = (e) => {
        e.preventDefault();

        setError('');

        if (password !== confirmPassword) {
            setError('Błąd rejestracji: Hasła nie są identyczne');
            setPassword('');
            setConfirmPassword('');
            return;
        }

        if (password.length < 6) {
            setError('Błąd rejestracji: Hasło musi posiadać co najmniej 6 znaków');
            setPassword('');
            setConfirmPassword('');
            return;
        }

        const emailRegex = /^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i;
        if (!emailRegex.test(email)) {
            setError('Błąd rejestracji: Nieprawidłowy adres email');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('Zarejestrowano');
            })
            .catch((error) => {
                console.log('Błąd rejestracji:', error.message);
            });
    };

    if (!showForm) {
        return (
            <div className="loading-card">

            </div>
        );
    }

    if (showRegisterForm) {
        return (
            <div className="register-form">
                <img src={require("../images/short_logo_hb.svg").default} alt="logo" className={"shortLogo"}></img>
                <form className={"form"}>
                    <input className={"email"} type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
                    <input className={"password"} type="password" placeholder="Hasło" value={password} onChange={handlePasswordChange} />
                    <input className={"password"} type="password" placeholder="Potwierdź hasło" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                    {error && <p className={"error"}>{error}</p>}
                    <div className="button-container">
                        <button className={"singInBtn"} type="submit" onClick={handleCreateAccount}>Zarejestruj się</button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="login-form">
            <img src={require("../images/short_logo_hb.svg").default} alt="logo" className={"shortLogo"}></img>
            <form className={"form"}>
                <input className={"email"} type="email" placeholder="Wpisz e-mail" value={email} onChange={handleEmailChange}></input>
                <input className={"password"} type="password" placeholder="Wpisz hasło" value={password} onChange={handlePasswordChange}></input>
                {error && <p className={"error"}>{error}</p>}
                <div className="button-container">
                    <button className={"login"} type="submit" onClick={handleLogin}>Zaloguj się</button>
                    <button className={"singIn"} type="submit" onClick={handleRegister}>Zarejestruj się</button>
                </div>
            </form>
        </div>
    );
};

export default Login;


