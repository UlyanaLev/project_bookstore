import { useEffect, useRef, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchBookByIsbn, removeFromCart, ICartItem, IBookstore, setCartItems } from '../../slice/bookstore';
import { AppDispatch, RootState } from '../../store/store';
import { themeContext } from '../../providers/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import './PostsCart.css';
import Buttons from '../Buttons/Buttons';
import ButtonsQuantity from '../ButtonsQuantity/ButtonsQuantity';

interface IPostsCart {
    book: IBookstore;
    isbn13: string;
    quantity: number;
    onTotalSumUpdate: () => void;
}

function PostsCart({ book, isbn13, quantity: initialQuantity, onTotalSumUpdate }: IPostsCart) {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const imageRef = useRef<HTMLImageElement>(null);
    const [color] = useContext(themeContext);
    const [totalSum, setTotalSum] = useState(0);
    const [hovered, setHovered] = useState(0);
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const fetchedBook = useSelector((state: RootState) =>
        state.bookstore.bookDetails?.find(b => b.isbn13 === book.isbn13)
    );
    const currentItem = cartItems.find((item: ICartItem) => item.book.isbn13 === isbn13) || { quantity: 0 };
    const [quantity, setQuantity] = useState(currentItem.quantity || 1);
    const priceInNumber = fetchedBook?.price ? parseFloat(fetchedBook.price.replace('$', '')) : 0;
    const totalPrice = (priceInNumber * quantity).toFixed(2);

    useEffect(() => {
        const updatedCartItems = cartItems.map((item: ICartItem) =>
            item.book.isbn13 === book.isbn13 ? { ...item, quantity } : item
        );
    
        if (!updatedCartItems.find((item: ICartItem) => item.book.isbn13 === book.isbn13)) {
            updatedCartItems.push({ book: fetchedBook, quantity });
        }
    
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        dispatch(setCartItems(updatedCartItems));
        onTotalSumUpdate();
    }, [quantity, book.isbn13, fetchedBook, dispatch]);

    useEffect(() => {
        dispatch(fetchBookByIsbn(book.isbn13));
    }, [dispatch, book.isbn13]);
    
    const calculateTotalSum = () => {
        const newTotalSum = cartItems.reduce((acc: number, item: { book: { price: string }; quantity: number }) => {
            const priceInNumber = parseFloat(item.book.price.replace('$', '')) || 0;
            return acc + (priceInNumber * item.quantity);
        }, 0);
        setTotalSum(newTotalSum);
    };

    useEffect(() => {
        const updatedCartItems = cartItems.map((item: ICartItem) =>
            item.book.isbn13 === book.isbn13 ? { ...item, quantity } : item
        );
        if (!updatedCartItems.find((item: ICartItem) => item.book.isbn13 === book.isbn13)) {
            updatedCartItems.push({ book: fetchedBook, quantity });
        }
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        onTotalSumUpdate();
    }, [quantity, book.isbn13, fetchedBook, onTotalSumUpdate]);

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
    const navigateToSelectedPost = () => {
        navigate(`/selected/${book.isbn13}`);
    };
    const handleRemoveFromCart = () => {
        const updatedCartItems = cartItems.filter((item: { book: { isbn13: string } }) => item.book.isbn13 !== book.isbn13);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        dispatch(removeFromCart({ book, quantity: 0 }));
    };
    const buttonDelete = `button__delete-${color}`;
    if (!fetchedBook) {
        return <div className={`loading-${color}`}>Loading...</div>;
    }
    return (
        <div className='posts-cart'>
            <div className='posts-cart_wrap'>
                <div className='posts-cart_left'>
                    <img 
                        ref={imageRef} 
                        src={fetchedBook.image} 
                        alt={fetchedBook.title}
                        className='posts-cart_image' 
                        onMouseMove={handleMouseMove} 
                        onMouseLeave={handleMouseLeave} 
                    />
                </div>
                <div className='posts-cart_center'>
                    <div className='posts-cart_text' onClick={navigateToSelectedPost}>
                        <div className={`posts-cart_title-${color}`}>{fetchedBook.title}</div> 
                        <div className='posts-cart_description'>by {fetchedBook.authors}, {fetchedBook.publisher} {fetchedBook.year}</div> 
                    </div>
                    <div className='posts-cart_quantity'>
                    <ButtonsQuantity 
                        isbn13={isbn13} 
                        initialQuantity={quantity} 
                        onQuantityChange={setQuantity} 
                        onUpdateTotal={calculateTotalSum}
                    />
                    </div>
                </div>
                <div className='posts-cart_right'>
                    <div className={`posts-cart_price-${color}`}>{totalPrice}$</div>
                    <div className='posts-cart_button' onClick={handleRemoveFromCart}>
                        <Buttons buttonsState={false} typeButtons={buttonDelete}>
                            <FontAwesomeIcon icon={faXmark} />
                        </Buttons>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostsCart;