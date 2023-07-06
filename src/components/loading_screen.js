import React, { useState, useEffect } from 'react';


const Loading = () => {
    const [showLoading, setShowLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    if (!showLoading) {
        return null;
    }

    return (
        <>
            <img src={require(`../images/logo.svg`).default} alt="logo"></img>
        </>
    );
};

export default Loading;