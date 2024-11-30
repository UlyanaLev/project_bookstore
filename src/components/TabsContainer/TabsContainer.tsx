import './TabsContainer.css';
import Tabs from '../Tabs/Tabs';
import { themeContext } from '../../providers/ThemeContext';
import { useContext } from 'react';

interface ITabsContainer {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

function TabsContainer({ activeTab, setActiveTab }: ITabsContainer) {
    const [color] = useContext(themeContext);
    return (
        <section className={`tabs-${color}`}>
            <div className={`tabs-list-${color}`}>
                <Tabs
                    tabsState={false} 
                    active={activeTab === 'description'} 
                    content='Description' 
                    onClick={() => setActiveTab('description')}
                />
                <Tabs
                    tabsState={false} 
                    active={activeTab === 'authors'} 
                    content='Authors' 
                    onClick={() => setActiveTab('authors')}
                />
                <Tabs
                    tabsState={false} 
                    active={activeTab === 'reviews'} 
                    content='Reviews' 
                    onClick={() => setActiveTab('reviews')}
                />
            </div>
        </section>
    );
}

export default TabsContainer;