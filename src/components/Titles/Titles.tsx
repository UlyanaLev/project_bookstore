import './Titles.css';
import {useContext} from "react";
// import {themeContext} from "../../providers/ThemeContext";

interface ITitles {
    content?: React.ReactNode;
    children?: React.ReactNode;
}

function Titles ({content, children}: ITitles) {
    // const [color] = useContext(themeContext);
        return (  
            <>
                <section className='titles'>
                    <div className='container'>
                        <div className='title'>
                            <h2 className='title_text'>{children || content}</h2>
                        </div>
                    </div>
                </section>
            </>
        );
}

export default Titles;