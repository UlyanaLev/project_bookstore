import { useEffect, useState, useContext } from 'react';
import './ButtonsQuantity.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { themeContext } from '../../providers/ThemeContext';

interface IButtonsQuantity {
    isbn13: string;
    initialQuantity: number;
    onQuantityChange: (newQuantity: number) => void;
    onUpdateTotal: () => void;
}

function ButtonsQuantity({ isbn13, initialQuantity, onQuantityChange, onUpdateTotal }: IButtonsQuantity) {
    const [quantity, setQuantity] = useState(initialQuantity);
    const [color] = useContext(themeContext);

    useEffect(() => {
        setQuantity(initialQuantity);
    }, [initialQuantity]);

    const handleIncrement = () => {
        setQuantity(prevQuantity => {
            const newQuantity = prevQuantity + 1;
            onQuantityChange(newQuantity);
            updateCartItems(newQuantity);
            onUpdateTotal();
            return newQuantity;
        });
    };

    const handleDecrement = () => {
        setQuantity(prevQuantity => {
            if (prevQuantity > 1) {
                const newQuantity = prevQuantity - 1;
                onQuantityChange(newQuantity);
                updateCartItems(newQuantity);
                onUpdateTotal();
                return newQuantity;
            } else {
                onQuantityChange(1);
                return 1;
            }
        });
    };

    const updateCartItems = (newQuantity: any) => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        const updatedCartItems = cartItems.map((item: any) => 
            item.book.isbn13 === isbn13 ? { ...item, quantity: newQuantity } : item
        );
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    return (
        <div className="buttons-quantity">
            <button onClick={handleDecrement} className={`buttons-quantity_item-${color}`}>
                <FontAwesomeIcon icon={faMinus} />
            </button>
            <span className={`quantity-${color}`}>{quantity}</span>
            <button onClick={handleIncrement} className={`buttons-quantity_item-${color}`}>
                <FontAwesomeIcon icon={faPlus} />
            </button>
        </div>
    );
}

export default ButtonsQuantity;