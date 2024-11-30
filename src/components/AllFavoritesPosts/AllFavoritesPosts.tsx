import './AllFavoritesPosts.css';
import { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { themeContext } from '../../providers/ThemeContext';
import { fetchBooks } from '../../slice/bookstore';
import { RootState, AppDispatch } from '../../store/store';
import FavoritesPosts from '../FavoritesPosts/FavoritesPosts';

function AllFavoritesPosts() {
    const [color] = useContext(themeContext);
    const dispatch = useDispatch<AppDispatch>();
    const { favoriteBooks, bookLoading, bookError } = useSelector((state: RootState) => state.bookstore);
    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);
    if (bookLoading) {
        return <div className='container'><div className={`loading-${color}`}>Loading...</div></div>;
    }
    if (bookError) {
        return <div className='container'><div className={`loading-${color}`}>Error: {bookError}</div></div>;
    }
    return (
        <section className='all_posts-cart'>
            <div className='all_posts-cart_wrap'>
                {favoriteBooks.map(({ book }) => (
                    <FavoritesPosts key={book.isbn13} book={book} isbn13={book.isbn13} />
                ))}
            </div>
        </section>
    );
}
export default AllFavoritesPosts;