import './Buttons.css';

interface IButtons {
    content?: React.ReactNode;
    typeButtons: string;
    buttonsState: boolean;
    children?: React.ReactNode;
}

function Buttons({ content, typeButtons, buttonsState, children }: IButtons) {
    return (  
        <div className="buttons">
            <button disabled={buttonsState} className={typeButtons}>
                {children || content}
            </button>
        </div>
    );
}

export default Buttons;