import './SelectedPage.css';
import { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchBookByIsbn, fetchBooks } from '../../slice/bookstore';
import { RootState, AppDispatch } from '../../store/store';
import { useParams } from 'react-router-dom';
import SelectedPosts from '../../components/SelectedPosts/SelectedPosts';
import { themeContext } from '../../providers/ThemeContext';
import Subscription from '../../components/Subscription/Subscription';
import SimilarPosts from '../../components/SimilarPosts/SimilarPosts';

function SelectedPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { bookLoading, bookError, bookDetails } = useSelector((state: RootState) => state.bookstore);
    const { isbn13 } = useParams<{ isbn13: string }>();
    const [color] = useContext(themeContext);

    useEffect(() => {
        if (isbn13) {
            dispatch(fetchBookByIsbn(isbn13));
        }
        dispatch(fetchBooks());
    }, [dispatch, isbn13]);

    if (bookLoading) {
        return (
            <div className={`container-${color}`}>
                <div className={`loading-${color}`}>Loading...</div>
            </div>
        );
    }
    
    if (bookError) {
        return (
            <div className={`container-${color}`}>
                <div className={`error-${color}`}>Error: {bookError}</div>
            </div>
        );
    }
    
    if (!bookDetails || bookDetails.length === 0) {
        return (
            <div className={`container-${color}`}>
                <div className={`no_posts_available-${color}`}>No posts available.</div>
            </div>
        );
    }

    const book = bookDetails.find(b => b.isbn13 === isbn13);
    if (!book) {
        return (
            <div className={`container-${color}`}>
                <div className={`book_not_found-${color}`}>Book not found.</div>
            </div>
        );
    }

    return (
        <div className={`selected-page_container-${color}`}>
            <div className={`container-${color}`}>
                <SelectedPosts book={book} stars={book.stars || 0} isbn13={book.isbn13} />
                <Subscription />
                <SimilarPosts selectedBookTitle={book.title} />
            </div>
        </div>
    );
}

export default SelectedPage;