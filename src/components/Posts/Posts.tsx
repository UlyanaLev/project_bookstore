import React, { useEffect, useRef, useState } from 'react';
import './Posts.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { fetchBookByIsbn } from '../../slice/bookstore';
import { AppDispatch } from '../../store/store';
import { IBookstore } from '../../slice/bookstore';

interface IPosts {
    book: IBookstore;
}

const Posts: React.FC<IPosts> = ({ book }) => {
    const dispatch = useDispatch<AppDispatch>();
    const imageRef = useRef<HTMLImageElement>(null);
    const [rating, setRating] = useState(0);
    const [hovered, setHovered] = useState(0);

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
        setRating(index + 1);
    };

    return (
        <div className='posts'>
            <div className='posts_top'>
                <div className='posts_image-wrapper'>
                    <img ref={imageRef} src={book.image} alt={book.title} className='posts_image' onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} />
                </div>
                <div className='posts_text'>
                    <div className='posts_title'>{book.title}</div>
                    <div className='posts_description'>{book.subtitle}</div>
                </div>
            </div>
            <div className='posts_bottom'>
                <div className='posts_price'>{book.price}</div>
                <button className='posts_stars'>
                    {Array(5).fill(null).map((_, index) => (
                        <FontAwesomeIcon 
                            className='posts_stars_styles' 
                            key={index} 
                            icon={faStar} 
                            style={{ color: (hovered || rating) > index ? '#313037' : '#E7E7E7' }} 
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