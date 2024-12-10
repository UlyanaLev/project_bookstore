import './MainPage.css';
import { useContext } from 'react';
import Titles from '../../components/Titles/Titles';
import AllPosts from '../../components/AllPosts/AllPosts';
import Pagination from '../../components/Pagination/Pagination';
import { themeContext } from '../../providers/ThemeContext';
import Subscription from '../../components/Subscription/Subscription';

function MainPage() {
    const [color] = useContext(themeContext);
    return (
        <div className={`main-page_container-${color}`}>
            <div className={`container-${color}`}>
                <div className='paddings'></div>
                <Titles>New Releases Books</Titles>
                <AllPosts />
                <Pagination />
                <Subscription/>
            </div>
        </div>
    );
}

export default MainPage;