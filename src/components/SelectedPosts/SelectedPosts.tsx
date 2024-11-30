import React, { useEffect, useRef, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useLocation, useNavigate } from 'react-router-dom';
import './SelectedPosts.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Titles from '../Titles/Titles';
import Buttons from '../Buttons/Buttons';
import { IBookstore } from '../../slice/bookstore';
import TabsContainer from '../TabsContainer/TabsContainer';
import { fetchBookByIsbn } from '../../slice/bookstore';
import { AppDispatch } from '../../store/store';
import { themeContext } from '../../providers/ThemeContext';
import {updateBookStars, addToCart, addToFavorites, IFavoriteBooks, removeFromCart, removeFromFavorites } from '../../slice/bookstore';

interface ISelectedPosts {
    book: IBookstore;
    isbn13: string;
    stars?: number;
}

function SelectedPosts ({ book, isbn13 }: ISelectedPosts) {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const location = useLocation();
    const imageRef = useRef<HTMLImageElement>(null);
    const [hovered, setHovered] = useState(0);
    const [color] = useContext(themeContext);
    const [activeTab, setActiveTab] = useState('description');
    const favoriteBooks = useSelector((state: RootState) => state.bookstore.favoriteBooks);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (book.isbn13) {
            dispatch(fetchBookByIsbn(book.isbn13));
        }
    }, [dispatch, book.isbn13]);
    
    const fetchedBook = useSelector((state: RootState) =>
        state.bookstore.bookDetails?.find(b => b.isbn13 === isbn13)
    );
    const cartItems = useSelector((state: RootState) => state.bookstore.cartItems);
    const isBookInCart = cartItems.some(item => item.book.isbn13 === fetchedBook?.isbn13);
    const [stars, setStars] = useState(() => {
        const savedStars = localStorage.getItem(`stars_${isbn13}`);
        if (savedStars) {
            return JSON.parse(savedStars);
        } else if (location.state && location.state.stars) {
            return location.state.stars;
        }
        return 0;
    });
    const [hoveredStars, setHoveredStars] = useState(0);
    const isBookFavorited = favoriteBooks.some(favorite => favorite.book.isbn13 === fetchedBook?.isbn13);

    useEffect(() => {
        setIsFavorite(isBookFavorited);
    }, [isBookFavorited]);

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
        setHoveredStars(0);
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
    const handleMouseEnterStar = (index: number) => {
        setHoveredStars(index + 1);
    };

    const handleBackNavigation = () => {
        navigate(-1);
    };

    if (!fetchedBook) {
        return (
            <div className='container'>
                <div className={`loading-${color}`}>Loading...</div>
            </div>
        );
    }

    const handleAddToFavorite = () => {
        if (fetchedBook) {
            const favoriteBook: IFavoriteBooks = { book: fetchedBook };
            if (!isFavorite) {
                dispatch(addToFavorites(favoriteBook));
            } else {
                dispatch(removeFromFavorites(fetchedBook.isbn13));
            }
        }
    };

    const handleAddToCart = () => {
        if (fetchedBook) {
            const cartItem = { book: fetchedBook, quantity: 1 };
            const isBookInCart = cartItems.some(item => item.book.isbn13 === fetchedBook.isbn13);

            if (isBookInCart) {
                dispatch(removeFromCart(cartItem));
            } else {
                dispatch(addToCart(cartItem));
            }
        }
    };
    const buttonAddToFavorite = isFavorite ? `button__add-to-favorite-${color} active` : `button__add-to-favorite-${color}`;
    const buttonAddToCart = `button__add-to-cart-${color}`;

    const heartIconColor = isFavorite ? '#FC857F' : '';
    return (
        <section className={`selected_posts-${color}`}>
            <div className='selected_posts_wrap'>
                <FontAwesomeIcon icon={faArrowLeftLong} className={`faArrowLeftLong-${color}`} onClick={handleBackNavigation} />
                <Titles>{fetchedBook?.title}</Titles>
                <div className='selected_posts_top'>
                    <div className='selected_posts_left'>
                        <div className='selected_posts_photo'>
                            <img ref={imageRef} src={fetchedBook?.image} alt={fetchedBook?.title} className='selected_posts_image' onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} />
                        </div>
                        <div className='selected_posts_heart' onClick={handleAddToFavorite}>
                            <Buttons buttonsState={false} typeButtons={buttonAddToFavorite}>
                                <FontAwesomeIcon icon={faHeart} style={{ color: heartIconColor }}/>
                            </Buttons>
                        </div>
                    </div>
                    <div className='selected_posts_right'>
                        <div className='selected_posts_discription'>
                            <div className='selected_posts_discription_left'>
                                <div className={`selected_posts_discription_price-${color}`}>{fetchedBook?.price}</div>
                                <div className='selected_posts_discription_publisher'>Publisher</div>
                                <div className='selected_posts_discription_language'>Language</div>
                                <div className='selected_posts_discription_rating'>Rating</div>
                                <div className='selected_posts_discription_pages'>Pages</div>
                                <div className='selected_posts_discription_year'>Year</div>
                            </div>
                            <div className='selected_posts_discription_right'>
                                <div className='selected_posts_discrip_stars'>
                                <button className='posts_stars'>
                                    {Array(5).fill(null).map((_, index) => (
                                        <FontAwesomeIcon
                                            className={`posts_stars_styles-${color}`}
                                            key={index}
                                            icon={faStar}
                                            style={{ color: (hoveredStars || stars) >= index + 1 ? '#FC857F' : '#E7E7E7' }} 
                                            onMouseEnter={() => handleMouseEnterStar(index)}
                                            onMouseLeave={handleMouseLeave}
                                            onClick={() => handleClick(index)}
                                        />
                                    ))}
                                </button>
                                </div>
                                <div className={`selected_posts_discrip_publisher-${color}`}>{fetchedBook?.publisher}</div>
                                <div className={`selected_posts_discrip_language-${color}`}>{fetchedBook?.language}</div>
                                <div className={`selected_posts_discrip_rating-${color}`}>{fetchedBook?.rating}</div>
                                <div className={`selected_posts_discrip_pages-${color}`}>{fetchedBook?.pages}</div>
                                <div className={`selected_posts_discrip_year-${color}`}>{fetchedBook?.year}</div>
                            </div>
                        </div>
                        <div className='selected_posts_add-to-cart' onClick={handleAddToCart}>
                            <Buttons buttonsState={false} typeButtons={buttonAddToCart}>{isBookInCart ? 'Remove from cart' : 'Add to cart'}</Buttons>
                        </div>
                    </div>
                </div>
                <div className='selected_posts_bottom'>
                    <TabsContainer setActiveTab={setActiveTab} activeTab={activeTab} />
                    <div className={`selected_posts_disc-${color}`}>
                        {activeTab === 'description' && fetchedBook?.desc}
                        {activeTab === 'authors' && fetchedBook?.authors}
                        {activeTab === 'reviews' && <div>No reviews yet.</div>}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SelectedPosts;