import './Header.css';
import Inputs from '../Inputs/Inputs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../slice/bookstore';
import { useNavigate, Link } from 'react-router-dom';

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSearchChange = (searchTerm: string) => {
        dispatch(setCurrentPage(1));
        if (searchTerm.length >= 2) {
            navigate(`/search?query=${searchTerm}`);
        } else {
            navigate('/');
        }
    };

    return (
        <header className='header'>
            <div className='container'>
                <div className='header_all'>
                    <div className='header_left'>
                        <Link to="/" className='logo'>Bookstore</Link>
                    </div>
                    <div className='header_center'>
                        <Inputs onSearchChange={handleSearchChange} />
                    </div>
                    <div className='header_right'>
                        <FontAwesomeIcon icon={faHeart} className='header_icon' />
                        <FontAwesomeIcon icon={faBagShopping} className='header_icon' />
                        <FontAwesomeIcon icon={faUser} className='header_icon' />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;