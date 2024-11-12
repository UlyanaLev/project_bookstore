import React, { useState } from 'react';
import './Inputs.css';

function Inputs() {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="header__search-input">
            <input
                type="text"
                className={`search-input ${isFocused ? 'focused' : ''}`}
                placeholder={isFocused ? "Enter at least 2 characters..." : "Search..."}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </div>
    );
}

export default Inputs;