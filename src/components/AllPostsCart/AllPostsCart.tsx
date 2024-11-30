import './AllPostsCart.css';
import { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../../slice/bookstore';
import { RootState, AppDispatch } from '../../store/store';
import PostsCart from '../PostsCart/PostsCart';
import { themeContext } from '../../providers/ThemeContext';
import TotalSum from '../../components/TotalSum/TotalSum';
import { selectTotalSum } from '../../slice/bookstore';

interface AllPostsCartProps {
    onTotalSumUpdate: () => void;
}

function AllPostsCart({ onTotalSumUpdate }: AllPostsCartProps) {
    const [color] = useContext(themeContext);
    const dispatch = useDispatch<AppDispatch>();
    const { cartItems, bookLoading, bookError } = useSelector((state: RootState) => state.bookstore);
    const totalSum = useSelector(selectTotalSum);

    const calculateTotalSum = () => {
        const newTotalSum = cartItems.reduce((acc: number, item: { book: { price: string }; quantity: number }) => {
            const priceInNumber = parseFloat(item.book.price.replace('$', '')) || 0;
            return acc + (priceInNumber * item.quantity);
        }, 0);
        onTotalSumUpdate();
    };

    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        calculateTotalSum();
    }, [cartItems]);

    if (bookLoading) {
        return <div className='container'><div className={`loading-${color}`}>Loading...</div></div>;
    }
    if (bookError) {
        return <div className='container'><div className={`error-${color}`}>Error: {bookError}</div></div>;
    }

    return (
        <section className='all_posts-cart'>
            <div className='all_posts-cart_wrap'>
                {cartItems.map(({ book, quantity }) => (
                    <PostsCart 
                        key={book.isbn13} 
                        book={book} 
                        isbn13={book.isbn13} 
                        quantity={quantity}
                        onTotalSumUpdate={onTotalSumUpdate}
                    />
                ))}
                <TotalSum totalSum={totalSum} />
            </div>
        </section>
    );
}

export default AllPostsCart;