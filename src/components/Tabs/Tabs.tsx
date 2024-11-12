import React from "react";
import './Tabs.css'
// import { useContext } from "react";

interface ITabs {  
    content: string;
    active: boolean;
    tabsState: boolean;
}

function Tabs({ content, active, tabsState}: ITabs) {  
    // const [color] = useContext(themeContext);
    return (
        <button 
            disabled={tabsState} 
            className={"tabs-list_item"}
        >
            {content}
        </button>
    );
}

export default Tabs;