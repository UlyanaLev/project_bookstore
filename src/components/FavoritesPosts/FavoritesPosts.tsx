import './FavoritesPosts.css';
import React, { useEffect, useRef, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchBookByIsbn, updateBookStars, IBookstore, removeFromFavorites, IFavoriteBooks } from '../../slice/bookstore';
import { AppDispatch, RootState } from '../../store/store';
import Buttons from '../Buttons/Buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { themeContext } from '../../providers/ThemeContext';

interface IFavoritesPosts {
    book: IBookstore;
    isbn13: string;
}

function FavoritesPosts({ book, isbn13 }: IFavoritesPosts) {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const location = useLocation();
    const imageRef = useRef<HTMLImageElement>(null);
    const [hovered, setHovered] = useState(0);
    const [color] = useContext(themeContext);
    const [stars, setStars] = useState(() => {
        const savedStars = localStorage.getItem(`stars_${isbn13}`);
        return savedStars ? JSON.parse(savedStars) : location.state?.stars || 0;
    });

    const favoriteBooks = JSON.parse(localStorage.getItem('favoriteBooks') || '[]');
    const fetchedBook = useSelector((state: RootState) => 
        state.bookstore.bookDetails?.find(b => b.isbn13 === book.isbn13)
    );

    useEffect(() => {
        dispatch(fetchBookByIsbn(book.isbn13));
    }, [dispatch, book.isbn13]);

    useEffect(() => {
        const updatedCartItems = favoriteBooks.map((item: IFavoriteBooks) =>
            item.book.isbn13 === book.isbn13 ? { ...item } : item
        );
        if (!updatedCartItems.find((item: IFavoriteBooks) => item.book.isbn13 === book.isbn13)) {
            updatedCartItems.push({ book: fetchedBook });
        }
        localStorage.setItem('favoriteBooks', JSON.stringify(updatedCartItems));
    }, [book.isbn13, fetchedBook]);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        const image = imageRef.current;
        if (image) {
            const { offsetX, offsetY } = event.nativeEvent;
            const { clientWidth, clientHeight } = image;
            image.style.transform = `scale(2)`;
            image.style.transformOrigin = `${(offsetX / clientWidth) * 100}% ${(offsetY / clientHeight) * 100}%`;
        }
    };

    const handleMouseLeave = () => {
        if (imageRef.current) {
            imageRef.current.style.transform = 'scale(1)';
            imageRef.current.style.transformOrigin = 'center';
        }
        setHovered(0);
    };
    const handleMouseEnter = (index: number) => {
        setHovered(index + 1);
    };

    const handleClick = (index: number) => {
        const newStars = index + 1;
        setStars(newStars);
        localStorage.setItem(`stars_${isbn13}`, JSON.stringify(newStars));
        dispatch(updateBookStars({ isbn13, stars: newStars }));
    };

    const navigateToSelectedPost = () => {
        const starCount = stars > 5 ? 5 : stars;
        navigate(`/selected/${book.isbn13}`, { state: { stars: starCount } });
    };

    const handleRemoveFromFavorites = () => {
        const isbnToRemove = fetchedBook?.isbn13;
        if (isbnToRemove) {
            dispatch(removeFromFavorites(isbnToRemove));
        }
    }

    const buttonDelete = `button__delete-${color}`;

    return (
        <div className='favorites-posts'>
            <div className='favorites-posts_wrap'>
                <div className='favorites-posts_left'>
                    <img 
                        ref={imageRef} 
                        src={fetchedBook?.image} 
                        alt={fetchedBook?.title}
                        className='favorites-posts_image' 
                        onMouseMove={handleMouseMove} 
                        onMouseLeave={handleMouseLeave} 
                    />
                </div>
                <div className='favorites-posts_center'>
                    <div className='favorites-posts_center_top'>
                        <div className='favorites-posts_text' onClick={navigateToSelectedPost}>
                            <div className={`favorites-posts_title-${color}`}>{fetchedBook?.title}</div> 
                            <div className='favorites-posts_description'>by {fetchedBook?.authors}, {fetchedBook?.publisher} {fetchedBook?.year}</div> 
                        </div>
                    </div>
                    <div className='favorites-posts_center_bottom'>
                        <div className={`favorites-posts_price-${color}`}>{fetchedBook?.price}</div>
                        <button className='posts_stars'>
                        {Array(5).fill(null).map((_, index) => (
                            <FontAwesomeIcon 
                                className={`posts_stars_styles-${color}`}
                                key={index}
                                icon={faStar}
                                style={{ color: stars >= index + 1 ? '#FC857F' : '#E7E7E7' }} 
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => handleClick(index)}
                            />
                        ))}
                        </button>
                    </div>
                </div>
                <div className='favorites-posts_right'>
                <div className='favorites-posts_button' onClick={handleRemoveFromFavorites}>
                    <Buttons buttonsState={false} typeButtons={buttonDelete}>
                        <FontAwesomeIcon icon={faHeart} />
                    </Buttons>
                </div>
                </div>
            </div>
        </div>
    );
}

export default FavoritesPosts;