import './AllPosts.css';
import { useEffect, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../../slice/bookstore';
import { RootState, AppDispatch } from '../../store/store';
import Posts from '../Posts/Posts';
import { themeContext } from '../../providers/ThemeContext';

function AllPosts() {
    const dispatch = useDispatch<AppDispatch>();
    const [color] = useContext(themeContext);
    const { currentBooks, bookLoading, bookError } = useSelector((state: RootState) => state.bookstore);
    
    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    if (bookLoading) {
        return <div className='container'><div className={`loading-${color}`}>Loading...</div></div>;
    }
    if (bookError) {
        return <div className='container'><div className={`error-${color}`}>Error: {bookError}</div></div>;
    }
    if (!currentBooks || currentBooks.length === 0) {
        return <div className='container'><div className={`no_posts_available-${color}`}>No posts available.</div></div>;
    }
    return (
        <section className='all_posts'>
            <div className='all_posts_wrap'>
                {currentBooks.map((book) => (
                    <Posts key={book.isbn13} book={book} isbn13={book.isbn13}/>
                ))}
            </div>
        </section>
    );
}
export default AllPosts;