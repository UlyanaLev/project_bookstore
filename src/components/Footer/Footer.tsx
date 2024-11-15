import './Footer.css';
import {useContext} from "react";
// import {themeContext} from "../../providers/ThemeContext";

function Footer () {
    // const [color, setColor] = useContext(themeContext);
        return ( 
            <>
                <footer className='footer'>
                    <div className='container'>
                        <div className='footer-wrap'>
                            <div className='footer_left'>
                                <span className='footer_left_text'>©2022 Bookstore</span>
                            </div>
                            <div className='footer_right'>
                                <span className='footer_right_text'>All rights reserved</span>
                            </div>
                        </div>
                    </div>
                </footer>
            </>
        );
}

export default Footer;
