import React, { useState } from 'react';

const CriteriaDropdown = (props) => {
    const { fromUpdate, currentCriterion } = props;

    const criteria = [
        { criterion: "Min Bill" },
        { criterion: "First Download", },
        { criterion: "Welcome Back", },
        { criterion: "None", },
    ];

    const [selected, setSelected] = useState(fromUpdate ? currentCriterion : "");
    const [criteriaDropdownIsShown, setCriteriaDropdownIsShown] = useState(false);
    const [text, setText] = useState("");

    const openSearchBoxHandler = () => {
        setCriteriaDropdownIsShown(prevState => !prevState);
    };
    const textChangeHandler = (event) => {
        setText(event.target.value);
    };
    const showSelected = (selectedCriterion) => {
        setSelected(selectedCriterion.criterion);
        setCriteriaDropdownIsShown(false);
        setText("");
        props.onTrigger(selectedCriterion);
    };

    const filteredCriteriaByCriterion = criteria.filter(selectedCriterion => selectedCriterion.criterion.toLowerCase().includes(text.toLowerCase()));

    return (
        <div className="dropdown reward-type">
            <div className="search" onClick={openSearchBoxHandler}>
                <p> { selected } </p>
                <i />
            </div>
            {
                criteriaDropdownIsShown ? (
                    <div className="options-and-input-box">
                        <div className="input-container">
                            <div className="input">
                                <input type="text" placeholder="Search..." onChange={textChangeHandler} />
                                <i />
                            </div>
                        </div>
                        <div className="options">
                            {
                                (filteredCriteriaByCriterion.length === 0) 
                                ? (
                                    <div className="no-matches">
                                        <p className="no-matches__message"> No matches found </p>
                                    </div>
                                )
                                : (
                                    filteredCriteriaByCriterion.map((selectedCriterion, index) => {
                                        return (
                                            <div className="store" key={index} onClick={() => showSelected(selectedCriterion)}>
                                                <p> {selectedCriterion.criterion} </p>
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

export default CriteriaDropdown;
