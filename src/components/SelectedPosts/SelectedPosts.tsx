import React, { useEffect, useRef, useState } from 'react';
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
import {updateBookStars} from '../../slice/bookstore';

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
    const [activeTab, setActiveTab] = useState('description');
    const [stars, setStars] = useState(() => {
        const savedStars = localStorage.getItem(`stars_${isbn13}`);
        return savedStars ? JSON.parse(savedStars) : location.state?.stars || 0;
    });

    const fetchedBook = useSelector((state: RootState) =>
        state.bookstore.bookDetails?.find(b => b.isbn13 === isbn13)
    );

    useEffect(() => {
        dispatch(fetchBookByIsbn(book.isbn13));
    }, [dispatch, book.isbn13]);

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

    const handleBackNavigation = () => {
        navigate(-1);
    };

    if (!fetchedBook) {
        return (
            <div className='container'>
                <div className='loading'>Loading...</div>
            </div>
        );
    }

    const buttonAddToFavorite = 'button__add-to-favorite';
    const buttonAddToCart = 'button__add-to-cart';

    return (
        <section className='selected_posts'>
            <div className='container'>
                <div className='selected_posts_wrap'>
                    <FontAwesomeIcon icon={faArrowLeftLong} className='faArrowLeftLong' onClick={handleBackNavigation} />
                    <Titles>{fetchedBook?.title}</Titles>
                    <div className='selected_posts_top'>
                        <div className='selected_posts_left'>
                            <div className='selected_posts_photo'>
                                <img ref={imageRef} src={fetchedBook?.image} alt={fetchedBook?.title} className='selected_posts_image' onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} />
                            </div>
                            <div className='selected_posts_heart'>
                                <Buttons buttonsState={false} typeButtons={buttonAddToFavorite}>
                                    <FontAwesomeIcon icon={faHeart} />
                                </Buttons>
                            </div>
                        </div>
                        <div className='selected_posts_right'>
                            <div className='selected_posts_discription'>
                                <div className='selected_posts_discription_left'>
                                    <div className='selected_posts_discription_price'>{fetchedBook?.price}</div>
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
                                                    className='posts_stars_styles'
                                                    key={index}
                                                    icon={faStar}
                                                    style={{ color: stars >= index + 1 ? '#313037' : '#E7E7E7' }} 
                                                    onMouseEnter={() => handleMouseEnter(index)}
                                                    onMouseLeave={handleMouseLeave}
                                                    onClick={() => handleClick(index)}
                                                />
                                            ))}
                                        </button>
                                    </div>
                                    <div className='selected_posts_discrip_publisher'>{fetchedBook?.publisher}</div>
                                    <div className='selected_posts_discrip_language'>{fetchedBook?.language}</div>
                                    <div className='selected_posts_discrip_rating'>{fetchedBook?.rating}</div>
                                    <div className='selected_posts_discrip_pages'>{fetchedBook?.pages}</div>
                                    <div className='selected_posts_discrip_year'>{fetchedBook?.year}</div>
                                </div>
                            </div>
                            <Buttons buttonsState={false} typeButtons={buttonAddToCart}>Add to cart</Buttons>
                        </div>
                    </div>
                    <div className='selected_posts_bottom'>
                        <TabsContainer setActiveTab={setActiveTab} activeTab={activeTab} />
                        <div className='selected_posts_disc'>
                            {activeTab === 'description' && fetchedBook?.desc}
                            {activeTab === 'authors' && fetchedBook?.authors}
                            {activeTab === 'reviews' && <div>No reviews yet.</div>}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SelectedPosts;