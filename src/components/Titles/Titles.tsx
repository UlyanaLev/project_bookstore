import './Titles.css';
import {useContext} from "react";
import {themeContext} from "../../providers/ThemeContext";

interface ITitles {
    content?: React.ReactNode;
    children?: React.ReactNode;
}

function Titles ({content, children}: ITitles) {
    const [color] = useContext(themeContext);
        return (  
            <>
                <section className={`titles-${color}`}>
                    <div className='title'>
                        <h2 className={`title_text-${color}`}>{children || content}</h2>
                    </div>
                </section>
            </>
        );
}

export default Titles;