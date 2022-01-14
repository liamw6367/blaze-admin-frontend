import React, {useState} from 'react';

const JustifyContext = React.createContext({
    isExtended: true,
    onJustify: () => {},
    deliveryFeeData: {},
    passDeliveryFeeData: () => {}, 
});

export const JustifyingContext = (props) => {
    const [isExtended, setIsExtended] = useState(true);
    const [deliveryFeeData, setDeliveryFeeData] = useState({});
    const passDeliveryFeeData = (data) => setDeliveryFeeData(data);

    const justifyContextHandler = () => {
        setIsExtended((prevState) => !prevState);
    };

    return (
        <JustifyContext.Provider 
            value={{
                isExtended: isExtended,
                onJustify: justifyContextHandler,
                deliveryFeeData,
                passDeliveryFeeData
            }}
        >
            {props.children}
        </JustifyContext.Provider>
    );
};

export default JustifyContext;