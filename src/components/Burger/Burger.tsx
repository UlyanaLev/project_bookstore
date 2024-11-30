import React, { useState } from 'react';
import './Burger.css';

function Burger() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleBurger = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`burger ${isOpen ? 'open' : ''}`} onClick={toggleBurger}>
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
        </div>
    );
};

export default Burger;