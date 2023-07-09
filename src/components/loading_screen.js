import React, { useState, useEffect } from 'react';


const Loading = () => {
    const [showLoading, setShowLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoading(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    if (!showLoading) {
        return null;
    }

    return (
        <>
            <div className={"loading_container"}>
                <img className={"loading_logo"}  src={require(`../images/logo.svg`).default} alt="logo"></img>
                <div className="loading_spinner"></div>
            </div>
        </>
    );
};

export default Loading;