import React, { useState } from 'react';
import './StoreNamesDropdown.css';

const StoreNamesDropdown = (props) => {
    const [storeNamesDropdownIsShown, setStoreNamesDropdownIsShown] = useState(false);
    const [text, setText] = useState("");
    const [selectedStore, setSelectStore] = useState("All");

    const openSearchBoxHandler = () => {
        setStoreNamesDropdownIsShown(prevState => !prevState);
    };
    const textChangeHandler = (event) => {
        setText(event.target.value);
    };
    const onTrigger = (store) => {
        setSelectStore(store.name);
        setStoreNamesDropdownIsShown(false);
        setText("");
    };

    return (
        <div className="dropdown">
            <div className="search" onClick={openSearchBoxHandler}>
                <p>{selectedStore}</p>
                <i />
            </div>
            {storeNamesDropdownIsShown ? (
                <div className="input-and-options-box">
                    <div className="input">
                        <input type="text" placeholder="Search..." onChange={textChangeHandler} />
                        <i />
                    </div>
                    <div className="options">
                        {props.stores
                            .filter(store => store.name.toLowerCase().includes(text.toLowerCase()))
                            .map(store => {
                                return (
                                    <div className="store" key={store.storeEmailId} onClick={() => { onTrigger(store); }}>
                                        <p>{store.name}</p>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            ) : ""}
        </div>
    );
};

export default StoreNamesDropdown;