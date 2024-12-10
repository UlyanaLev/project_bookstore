import './Subscription.css';
import { useContext, useState } from "react";
import { themeContext } from "../../providers/ThemeContext";
import Buttons from '../Buttons/Buttons';

function Subscription() {
    const [color] = useContext(themeContext);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const buttonSubscribe = `button__subscribe-${color}`;

    const handleSubscribe = () => {
        setMessage('Почта успешно отправлена!');
        setIsVisible(true);
        setEmail('');

        setTimeout(() => {
            setIsVisible(false);
        }, 3000);
    };

    return (
        <>
            <section className={`subscription-${color}`}>
                <div className='subscription-wrap'>
                    <div className='subscription_top'>
                        <div className={`subscription_title-${color}`}>Subscribe to Newsletter</div>
                        <div className='subscription_text'>Be the first to know about new IT books, upcoming releases, exclusive offers and more.</div>
                    </div>
                    <div className='subscription_bottom'>
                        <input 
                            type="text" 
                            className={`subscription_input-${color}`} 
                            placeholder='Your email' 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className='subscribe-button' onClick={handleSubscribe}>
                            <Buttons buttonsState={false} typeButtons={buttonSubscribe}>Subscribe</Buttons>
                        </div>
                    </div>
                    {isVisible && <div className="subscription_message" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s' }}>{message}</div>}
                </div>
            </section>
        </>
    );
}

export default Subscription;