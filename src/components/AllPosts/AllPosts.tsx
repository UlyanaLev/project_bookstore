import './AllPosts.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../../slice/bookstore';
import { RootState, AppDispatch } from '../../store/store';
import Posts from '../Posts/Posts';

function AllPosts() {
    const dispatch = useDispatch<AppDispatch>();
    const { currentBooks, bookLoading, bookError } = useSelector((state: RootState) => state.bookstore); // Извлекаем currentBooks

    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    if (bookLoading) {
        return <div>Loading...</div>;
    }

    if (bookError) {
        return <div>Error: {bookError}</div>;
    }

    if (!currentBooks || currentBooks.length === 0) {
        return <div>No posts available.</div>;
    }

    return (
        <section className='all_posts'>
            <div className='container'>
                <div className='all_posts_wrap'>
                    {currentBooks.map((book) => (
                        <Posts key={book.isbn13} book={book} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default AllPosts;