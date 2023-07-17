import '../css/App.scss';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loading from "./loading_screen";
import Login from "./login";
import Home from "./Home";
import AddWallet from "./Add_wallet";

function App() {
  return (
    <>
        <Loading />
        <Login />
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add_wallet" element={<AddWallet />} />
            </Routes>
        </Router>
    </>
  );
}

export default App;
