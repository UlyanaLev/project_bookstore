import './Header.css';
import Inputs from '../Inputs/Inputs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'

function Header() {

    return (
        <header className='header'>
            <div className='container'>
                <div className='header_all'>
                    <div className='header_left'>
                        <div className='logo'>Bookstore</div>
                    </div>
                    <div className='header_center'>
                        <Inputs />
                    </div>
                    <div className='header_rigth'>
                        <FontAwesomeIcon icon={faHeart} className='header_icon'/>
                        <FontAwesomeIcon icon={faBagShopping} className='header_icon'/>
                        <FontAwesomeIcon icon={faUser} className='header_icon'/>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;