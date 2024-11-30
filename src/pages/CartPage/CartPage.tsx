import AllPostsCart from '../../components/AllPostsCart/AllPostsCart';
import './CartPage.css';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import Titles from '../../components/Titles/Titles';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { themeContext } from '../../providers/ThemeContext';

function CartPage() {
    const navigate = useNavigate();
    const [color] = useContext(themeContext);
    const cartItems = useSelector((state: RootState) => state.bookstore.cartItems);
    
    const handleBackNavigation = () => {
        navigate(-1);
    };

    return (
        <div className={`cart-page-${color}`}>
            <div className={`container-${color}`}>
                <FontAwesomeIcon icon={faArrowLeftLong} className={`faArrowLeftLong-${color}`} onClick={handleBackNavigation} />
                <Titles>{cartItems.length === 0 ? "No items in cart" : "Your Cart"}</Titles>
                <AllPostsCart onTotalSumUpdate={() => {}} />
            </div>
        </div>
    );
}

export default CartPage;