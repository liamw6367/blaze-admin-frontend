import React, { useState } from 'react';

const RewardTypeDropdown = (props) => {
    const { fromUpdate, currentType } = props;

    const rewardTypes = [
        { type: "Percentage(%)", },
        { type: "Product(Multiple)", },
    ];

    const [selected, setSelected] = useState(fromUpdate ? currentType : ""); 
    const [rewardTypeDropdownIsShown, setRewardTypeDropdownIsShown] = useState(false);
    const [text, setText] = useState("");

    const openSearchBoxHandler = () => {
        setRewardTypeDropdownIsShown(prevState => !prevState);
    };
    const textChangeHandler = (event) => {
        setText(event.target.value);
    };
    const showSelected = (selectedType) => {
        setSelected(selectedType.type);
        setRewardTypeDropdownIsShown(false);
        setText("");
        props.onTrigger(selectedType);
    };

    const filteredRewardTypesByType =  rewardTypes.filter(selectedType => selectedType.type.toLowerCase().includes(text.toLowerCase()));

    return (
        <div className="dropdown reward-type">
            <div className="search" onClick={openSearchBoxHandler}>
                <p>{ selected }</p>
                <i />
            </div>
            {
                rewardTypeDropdownIsShown ? (
                    <div className="options-and-input-box">
                        <div className="input-container">
                            <div className="input">
                                <input type="text" placeholder="Search..." onChange={textChangeHandler} />
                                <i />
                            </div>
                        </div>
                        <div className="options">
                            {
                                (filteredRewardTypesByType.length === 0)
                                ? (
                                    <div className="no-matches">
                                        <p className="no-matches__message"> No matches found </p>
                                    </div>
                                )
                                : (
                                    filteredRewardTypesByType.map((selectedType, index) => {
                                        return (
                                            <div className="store" key={index} onClick={() => showSelected(selectedType)}>
                                                <p> {selectedType.type} </p>
                                            </div>
                                        );
                                    })
                                )
                            }
                        </div>
                    </div>
                ) : ""
            }
        </div>
    );
}

export default RewardTypeDropdown;
