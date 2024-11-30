import './TotalSum.css';
import { useContext } from 'react';
import { themeContext } from '../../providers/ThemeContext';
import Buttons from '../Buttons/Buttons';

interface ITotalSum {
    totalSum: string;
}

function TotalSum({ totalSum }: ITotalSum) {
    const [color] = useContext(themeContext);

    return (
        <div className='total-sum-container'>
            <div className='total-sum'>
                <div className='total-sum-top'>
                    <div className={`total-sum-left-${color}`}>Total:</div>
                    <div className={`total-sum-right-${color}`}>{totalSum}$</div>
                </div>
                <div className='total-sum-bottom'>
                    <Buttons buttonsState={false} typeButtons={`button__check-out-${color}`}>{'Check Out'}</Buttons>
                </div>
            </div>
        </div>
    );
}

export default TotalSum;