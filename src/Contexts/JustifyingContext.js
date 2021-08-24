import React, {useState} from 'react';

const JustifyContext = React.createContext({
    isExtended: true,
    onJustify: () => {}, 
});

export const JustifyingContext = (props) => {
    const [isExtended, setIsExtended] = useState(true);

    const justifyContextHandler = () => {
        setIsExtended((prevState) => !prevState);
    };

    return (
        <JustifyContext.Provider 
            value={{
                isExtended: isExtended,
                onJustify: justifyContextHandler,
            }}
        >
            {props.children}
        </JustifyContext.Provider>
    );
};

export default JustifyContext;