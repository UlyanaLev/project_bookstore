import React from "react";
import './Tabs.css';

interface ITabs {  
    content: string;
    active: boolean;
    tabsState: boolean;
    onClick: () => void;
}

function Tabs({ content, active, tabsState, onClick }: ITabs) {  
    return (
        <button 
            disabled={tabsState} 
            className={"tabs-list_item" + (active ? ' active' : '')} // Добавьте класс, если активный таб
            onClick={onClick}
        >
            {content}
        </button>
    );
}

export default Tabs;