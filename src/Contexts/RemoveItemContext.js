import React from 'react';

export const RemovingContext = React.createContext({
    removingOrderId: "",
    removeSelectedOrder: () => {},
});

const RemoveItemContext = (props) => {
    return (
        <RemovingContext.Provider
            value={{
                removingOrderId: "",
                removeSelectedOrder: () => {},
            }}
        >
            {props.children}
        </RemovingContext.Provider>
    )
};

export default RemoveItemContext;