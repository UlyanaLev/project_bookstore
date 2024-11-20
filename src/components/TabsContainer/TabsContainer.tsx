import './TabsContainer.css';
import Tabs from '../Tabs/Tabs';

interface ITabsContainer {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

function TabsContainer({ activeTab, setActiveTab }: ITabsContainer) {
    return (
        <section className={`tabs`}>
            <div className='container'>
                <div className={`tabs-list`}>
                    <Tabs
                        tabsState={false} 
                        active={activeTab === 'description'} 
                        content='Description' 
                        onClick={() => setActiveTab('description')} // Обработка клика
                    />
                    <Tabs
                        tabsState={false} 
                        active={activeTab === 'authors'} 
                        content='Authors' 
                        onClick={() => setActiveTab('authors')} // Обработка клика
                    />
                    <Tabs
                        tabsState={false} 
                        active={activeTab === 'reviews'} 
                        content='Reviews' 
                        onClick={() => setActiveTab('reviews')} // Обработка клика
                    />
                </div>
            </div>
        </section>
    );
}

export default TabsContainer;