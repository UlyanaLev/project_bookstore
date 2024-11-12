import './TabsContainer.css';
import Tabs from '../Tabs/Tabs';

function TabsContainer() {
    // const [color] = useContext(themeContext);

    return (
        <section className={`tabs`}>
            <div className='container'>
                <div className={`tabs-list`}>
                    <Tabs
                        tabsState={false} 
                        active={true} 
                        content='Description' 
                    />
                    <Tabs
                        tabsState={false} 
                        active={false} 
                        content='Authors' 
                    />
                    <Tabs
                        tabsState={false} 
                        active={false} 
                        content='Reviews' 
                    />
                </div>
            </div>
        </section>
    );
}

export default TabsContainer;