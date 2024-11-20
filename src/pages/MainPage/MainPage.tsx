import './MainPage.css';
import Titles from '../../components/Titles/Titles';
import AllPosts from '../../components/AllPosts/AllPosts';
import Pagination from '../../components/Pagination/Pagination';

function MainPage() {
    return (
        <div className='main-page_container'>
            <Titles>New Releases Books</Titles>
            <AllPosts />
            <Pagination />
        </div>
    );

}

export default MainPage;