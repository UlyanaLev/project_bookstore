import { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Posts from '../../components/Posts/Posts';
import Titles from '../../components/Titles/Titles';
import { selectBook } from '../../slice/bookstore';
import { useLocation } from 'react-router-dom';
import { AppDispatch } from '../../store/store';
import { themeContext } from '../../providers/ThemeContext';
import './SearchPage.css';

function SearchPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { currentBooks } = useSelector(selectBook);
    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation();
    const [color] = useContext(themeContext);

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
        <div className={`search-page_container-${color}`}>
            <div className='container'>
                <div className='paddings'></div>
                <Titles content={`"${searchTerm}" Search results`} />
                <div className={`number_of_books_found-${color}`}>Found {booksFoundCount} {bookLabel}</div>
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