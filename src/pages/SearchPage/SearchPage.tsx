import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Posts from '../../components/Posts/Posts';
import Titles from '../../components/Titles/Titles';
import { selectBook, fetchBooks } from '../../slice/bookstore';
import { useLocation } from 'react-router-dom';
import { AppDispatch } from '../../store/store';
import './SearchPage.css';

function SearchPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { currentBooks } = useSelector(selectBook);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const query = params.get('query');
        if (query) {
            setSearchTerm(query);
        }
    }, [location]);

    const filteredBooks = currentBooks?.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const booksFoundCount = filteredBooks?.length || 0;
    const bookLabel = booksFoundCount === 1 ? 'book' : 'books';

    return (
        <div className='search-page_container'>
            <div className='container'>
                <Titles content={`"${searchTerm}" Search results`} />
                <div className='number_of_books_found'>Found {booksFoundCount} {bookLabel}</div>
                <div className='search-page_posts'>
                    {filteredBooks?.map(book => (
                        <Posts key={book.isbn13} book={book} isbn13={book.isbn13} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SearchPage;