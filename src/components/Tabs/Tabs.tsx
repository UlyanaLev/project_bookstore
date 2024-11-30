import React, { useContext } from 'react';
import { themeContext } from '../../providers/ThemeContext';
import './Tabs.css';

interface ITabs {  
    content: string;
    active: boolean;
    tabsState: boolean;
    onClick: () => void;
}

function Tabs({ content, active, tabsState, onClick }: ITabs) {  
    const [color] = useContext(themeContext);
    
    return (
        <button 
            disabled={tabsState} 
            className={`tabs-list_item-${color} ${active ? `active-${color}` : ''}`}
            onClick={onClick}
        >
            {content}
        </button>
    );
}

export default Tabs;