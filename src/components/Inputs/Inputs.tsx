import React, { useState } from 'react';
import './Inputs.css';

interface InputsProps {
    onSearchChange: (searchTerm: string) => void;
}

function Inputs({ onSearchChange }: InputsProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
        onSearchChange(value);
    };

    return (
        <div className="header__search-input">
            <input
                type="text"
                className={`search-input ${isFocused ? 'focused' : ''}`}
                placeholder={isFocused ? "Enter at least 2 characters..." : "Search..."}
                value={searchTerm}
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </div>
    );
}

export default Inputs;