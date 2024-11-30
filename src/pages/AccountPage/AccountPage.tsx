import './AccountPage.css';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Titles from '../../components/Titles/Titles';
import { themeContext } from '../../providers/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

function AccountPage() {
    const navigate = useNavigate();
    const [color] = useContext(themeContext);

    const handleBackNavigation = () => {
        navigate(-1);
    };

    return (
        <div className={`account-page_container-${color}`}>
            <div className={`container-${color}`}>
                <FontAwesomeIcon icon={faArrowLeftLong} className={`faArrowLeftLong-${color}`} onClick={handleBackNavigation} />
                <Titles>Account</Titles>
            </div>
        </div>
    );
}

export default AccountPage;