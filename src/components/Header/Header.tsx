import './Header.css';
import Inputs from '../Inputs/Inputs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBagShopping, faUser, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { useContext } from "react";
import { setCurrentPage } from '../../slice/bookstore';
import { themeContext } from '../../providers/ThemeContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Burger from '../Burger/Burger';

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [color, setColor] = useContext(themeContext);

    function changeColor() {
        setColor(color === "light" ? "dark" : "light");
        console.log(color);
    }

    const handleSearchChange = (searchTerm: string) => {
        dispatch(setCurrentPage(1));
        if (searchTerm.length >= 2) {
            navigate(`/search?query=${searchTerm}`);
        } else {
            navigate('/');
        }
    };

    const navigateToFavoritesPage = () => {
        navigate('/favorites');
    };

    const navigateToCartPage = () => {
        navigate('/carts');
    };
    
    const navigateToAccountPage = () => {
        navigate('/account');
    };

    const iconColor = color === 'dark' ? '#FFFFFF' : '#313037';

    const isFavoritesPage = location.pathname === '/favorites';
    const isCartPage = location.pathname === '/carts';
    const isAccountPage = location.pathname === '/account';

    const isMobile = window.innerWidth <= 1010;

    return (
        <header className={`header-${color}`}>
            <div className={`container-${color}`}>
                <div className={`header_all-${color}`}>
                    <div className='header_left'>
                        <Link to="/" className={`logo-${color}`}>Bookstore</Link>
                        {color === "light" ? (
                            <FontAwesomeIcon 
                                icon={faMoon} 
                                className='faMoon' 
                                onClick={changeColor} 
                            />
                        ) : (
                            <FontAwesomeIcon 
                                icon={faSun} 
                                className='faSun' 
                                onClick={changeColor} 
                            />
                        )}
                    </div>
                    <div className='header_center'>
                        <Inputs onSearchChange={handleSearchChange} />
                    </div>
                    <div className='header_right'>
                        <FontAwesomeIcon 
                            icon={faBagShopping} 
                            className={`header_icon-${color}`} 
                            onClick={navigateToCartPage} 
                            style={{ color: isCartPage ? '#FC857F' : iconColor }}
                        />
                        {isMobile ? ( 
                            <Burger/>
                        ) : (
                            <>
                                <FontAwesomeIcon 
                                    icon={faHeart} 
                                    className={`header_icon-${color}`} 
                                    onClick={navigateToFavoritesPage} 
                                    style={{ color: isFavoritesPage ? '#FC857F' : iconColor }}
                                />
                                <FontAwesomeIcon 
                                    icon={faUser} 
                                    className={`header_icon-${color}`} 
                                    onClick={navigateToAccountPage} 
                                    style={{ color: isAccountPage ? '#FC857F' : iconColor }}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;