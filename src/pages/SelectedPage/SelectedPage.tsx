import './SelectedPage.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchBookByIsbn, fetchBooks } from '../../slice/bookstore';
import { RootState, AppDispatch } from '../../store/store';
import { useParams } from 'react-router-dom';
import SelectedPosts from '../../components/SelectedPosts/SelectedPosts';

function SelectedPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { bookLoading, bookError, bookDetails } = useSelector((state: RootState) => state.bookstore);
    const { isbn13 } = useParams<{ isbn13: string }>();

    useEffect(() => {
        dispatch(fetchBooks());
        if (isbn13) {
            dispatch(fetchBookByIsbn(isbn13));
        }
    }, [dispatch, isbn13]);

    if (bookLoading) {
        return (
            <div className='container'>
                <div className='loading'>Loading...</div>
            </div>
        );
    }
    
    if (bookError) {
        return (
            <div className='container'>
                <div className='error'>Error: {bookError}</div>
            </div>
        );
    }
    
    if (!bookDetails || bookDetails.length === 0) {
        return (
            <div className='container'>
                <div className='no_posts_available'>No posts available.</div>
            </div>
        );
    }

    const book = bookDetails.find(b => b.isbn13 === isbn13);
    if (!book) {
        return (
            <div className='container'>
                <div className='book_not_found'>Book not found.</div>
            </div>
        );
    }

    return (
        <div className='selected-page_container'>
            <SelectedPosts book={book} stars={0} isbn13={book.isbn13}/>
        </div>
    );
}

export default SelectedPage;