import {createContext, PropsWithChildren, useState} from "react";

type TContext = [string, (color: string) => void];

export const themeContext = createContext<TContext>(["", () => {}]);

const ThemeContext = ({children} : PropsWithChildren<{}>) => {
    const [color, setColor] = useState("light");
    return (
        <div>
            <themeContext.Provider value={[color, setColor]}>
                {children}
            </themeContext.Provider>
        </div>
    );
};

export default ThemeContext;