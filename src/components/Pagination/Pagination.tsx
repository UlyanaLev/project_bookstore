import './Pagination.css';
import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage, selectBook } from '../../slice/bookstore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { themeContext } from '../../providers/ThemeContext';

const Pagination = () => {
    const dispatch = useDispatch();
    const { currentPage, totalPages } = useSelector(selectBook);
    const [color] = useContext(themeContext);

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        dispatch(setCurrentPage(page));
        window.scrollTo(0, 0);
    };

    return (
        <section className={`pagination-${color}`}>
            <div className='button_pagination'>
                <button 
                    className='button_prev' 
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 1}
                >
                    <FontAwesomeIcon className={`button_arrow-${color}`} icon={faArrowLeftLong} />
                    <p className={`button_text-${color}`}>Prev</p>
                </button>
                <div className='button_pagination_center'>
                    {[...Array(totalPages)].map((_, index) => {
                        const pageNumber = index + 1;
                        const isActive = pageNumber === currentPage;
                        return (
                            <button 
                                className='button_numbers' 
                                key={index} 
                                onClick={() => handlePageChange(pageNumber)} 
                                style={{ color: isActive ? '#FC857F' : '#A8A8A8' }}
                            >
                                {pageNumber}
                            </button>
                        );
                    })}
                </div>
                <button 
                    className='button_next' 
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                >
                    <p className={`button_text-${color}`}>Next</p>
                    <FontAwesomeIcon className={`button_arrow-${color}`} icon={faArrowRight} />
                </button>
            </div>
        </section>
    );
};

export default Pagination;