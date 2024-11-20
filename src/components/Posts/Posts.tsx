import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchBookByIsbn } from '../../slice/bookstore';
import { AppDispatch } from '../../store/store';
import { IBookstore } from '../../slice/bookstore';
import './Posts.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { RootState } from '../../store/store';
import {updateBookStars} from '../../slice/bookstore';

interface IPosts {
    book: IBookstore;
    isbn13: string;
    stars?: number;
}

function Posts ({ book, isbn13 }: IPosts) {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const location = useLocation();
    const imageRef = useRef<HTMLImageElement>(null);
    const [hovered, setHovered] = useState(0);
    const [stars, setStars] = useState(() => {
        const savedStars = localStorage.getItem(`stars_${isbn13}`);
        return savedStars ? JSON.parse(savedStars) : location.state?.stars || 0;
    });

    const fetchedBook = useSelector((state: RootState) => 
        state.bookstore.bookDetails?.find(b => b.isbn13 === book.isbn13)
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

    const navigateToSelectedPost = () => {
        const starCount = stars > 5 ? 5 : stars;
        navigate(`/selected/${book.isbn13}`, { state: { stars: starCount } });
    };

    return (
        <div className='posts'>
            <div className='posts_top'>
                <div className='posts_image-wrapper'>
                    <img 
                        ref={imageRef} 
                        src={fetchedBook?.image} 
                        alt={fetchedBook?.title}
                        className='posts_image' 
                        onMouseMove={handleMouseMove} 
                        onMouseLeave={handleMouseLeave} 
                    />
                </div>
                <div className='posts_text' onClick={navigateToSelectedPost}>
                    <div className='posts_title'>{fetchedBook?.title}</div> 
                    <div className='posts_description'>by {fetchedBook?.authors}, {fetchedBook?.publisher} {fetchedBook?.year}</div> 
                </div>
            </div>
            <div className='posts_bottom'>
                <div className='posts_price'>{fetchedBook?.price}</div>
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
        </div>
    );
};

export default Posts;