import './FavoritesPage.css';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { selectFavoriteBooks } from '../../slice/bookstore';
import AllFavoritesPosts from '../../components/AllFavoritesPosts/AllFavoritesPosts';
import Titles from '../../components/Titles/Titles';
import { themeContext } from '../../providers/ThemeContext';

function FavoritesPage() {
    const navigate = useNavigate();
    const [color] = useContext(themeContext);
    const favoriteBooks = useSelector(selectFavoriteBooks);
    const handleBackNavigation = () => {
        navigate(-1);
    };

    return (
        <div className={`favorites-page-${color}`}>
            <div className={`container-${color}`}>
                <FontAwesomeIcon icon={faArrowLeftLong} className={`faArrowLeftLong-${color}`} onClick={handleBackNavigation} />
                {favoriteBooks.length === 0 ? (
                    <Titles>You don't have any favorite books</Titles>
                ) : (
                    <Titles>Favorites</Titles>
                )}
                <AllFavoritesPosts />
            </div>
        </div>
    );
}

export default FavoritesPage;