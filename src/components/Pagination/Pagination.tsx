import './Pagination.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage, selectBook } from '../../slice/bookstore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Pagination = () => {
    const dispatch = useDispatch();
    const { currentPage, totalPages } = useSelector(selectBook);

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        dispatch(setCurrentPage(page));
    };

    return (
        <section className='pagination'>
            <div className='container'>
                <div className='button_pagination'>
                    <button className='button_prev' onClick={() => handlePageChange(currentPage - 1)}>
                        <FontAwesomeIcon className='button_arrow' icon={faArrowLeftLong} />
                        <p className='button_text'>Prev</p>
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
                                    style={{ color: isActive ? '#313037' : '#A8A8A8' }}
                                >
                                    {pageNumber}
                                </button>
                            );
                        })}
                    </div>
                    <button className='button_next' onClick={() => handlePageChange(currentPage + 1)}>
                        <p className='button_text'>Next</p>
                        <FontAwesomeIcon className='button_arrow' icon={faArrowRight} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Pagination;