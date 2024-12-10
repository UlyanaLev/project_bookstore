import './SimilarPosts.css';
import { useEffect, useContext, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { themeContext } from "../../providers/ThemeContext";
import { RootState, AppDispatch } from '../../store/store';
import { fetchBooks, IBookstore } from '../../slice/bookstore';
import Posts from '../Posts/Posts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface SimilarPostsProps {
    selectedBookTitle: string;
}

function SimilarPosts({ selectedBookTitle }: SimilarPostsProps) {
    const dispatch = useDispatch<AppDispatch>();
    const [color] = useContext(themeContext);
    const { currentBooks, bookLoading, bookError } = useSelector((state: RootState) => state.bookstore);
    const [displayedBooks, setDisplayedBooks] = useState<IBookstore[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!currentBooks || currentBooks.length === 0) {
            dispatch(fetchBooks());
        } else {
            const selectedIndex = currentBooks.findIndex(book => 
                book.title === selectedBookTitle || 
                book.subtitle === selectedBookTitle || 
                book.desc === selectedBookTitle
            );
            if (selectedIndex !== -1) {
                const nextBooks = currentBooks.slice(selectedIndex + 1, selectedIndex + 4);
                const prevBooks = currentBooks.slice(Math.max(selectedIndex - 3, 0), selectedIndex);
                setDisplayedBooks(prevBooks.concat(nextBooks));
                setCurrentIndex(0);
            } else {
                setDisplayedBooks([]);
            }
        }
    }, [dispatch, currentBooks, selectedBookTitle]);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % displayedBooks.length);
    };
    
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + displayedBooks.length) % displayedBooks.length);
    };

    if (bookLoading) {
        return <div className='container'><div className={`loading-${color}`}>Loading...</div></div>;
    }
    
    if (bookError) {
        console.error("Error fetching books:", bookError);
        return <div className='container'><div className={`error-${color}`}>Error: {bookError}</div></div>;
    }
    
    if (displayedBooks.length === 0 && !bookLoading && !bookError) {
        return <div className='container'><div className={`no_posts_available-${color}`}>No posts available.</div></div>;
    }

    const booksToDisplay = displayedBooks.slice(currentIndex, currentIndex + 3);
    
    return (
        <section className={`similar-${color}`}>
            <div className='similar-wrap'>
                <div className='similar_top'>
                    <div className={`similar_title-${color}`}>Similar Books</div>
                    <div className='similar_top_arrow'>
                        <FontAwesomeIcon 
                            icon={faArrowLeft} 
                            className={`similar_arrow-${color} ${currentIndex === 0 ? 'disabled' : ''}`} 
                            onClick={currentIndex > 0 ? handlePrev : undefined} 
                            style={{ color: currentIndex === 0 ? '#A8A8A8' : undefined }}
                        />
                        <FontAwesomeIcon 
                            icon={faArrowRight} 
                            className={`similar_arrow-${color} ${currentIndex + 3 >= displayedBooks.length ? 'disabled' : ''}`} 
                            onClick={currentIndex + 3 < displayedBooks.length ? handleNext : undefined} 
                            style={{ color: currentIndex + 3 >= displayedBooks.length ? '#A8A8A8' : undefined }}
                        />
                    </div>
                </div>
                <div className='similar_bottom'>
                    {booksToDisplay.map((book: IBookstore) => (
                        <Posts key={book.isbn13} book={book} isbn13={book.isbn13} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default SimilarPosts;