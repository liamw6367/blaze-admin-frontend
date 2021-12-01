import React, { useState } from 'react';

const CategoryNamesDropdown = (props) => {
    const [categoryNamesDropdownIsShown, setCategoryNamesDropdownIsShown] = useState(false);
    const [text, setText] = useState("");

    const ALL_CATEGORIES = "All";
    const TEST_CATEGORY = "Test Category"
    const FILTERED_ALL_CATEGORIES = ALL_CATEGORIES.toLowerCase().includes(text.toLowerCase());

    const openSearchBoxHandler = () => {
        setCategoryNamesDropdownIsShown(prevState => !prevState);
    };
    const textChangeHandler = (event) => {
        setText(event.target.value);
    };
    const onTrigger = (category) => {
        props.onPass(category);
        setCategoryNamesDropdownIsShown(false);
        setText("");
    };
    const onAdd = (allCategories) => {
        props.onChange(allCategories);
        setCategoryNamesDropdownIsShown(false);
        setText("");
    };

    console.log(props, "props");

    return (
        <div className="dropdown">
            <div className="search" onClick={openSearchBoxHandler}>
                <p> {props.chosenCategoryName} </p>
                <i /> 
            </div>
            {categoryNamesDropdownIsShown ? (
                <div className="input-and-options-box">
                    <div className="input">
                        <input type="text" placeholder="Search..." onChange={textChangeHandler} />
                        <i />
                    </div>
                    <div className="options">
                        {
                            FILTERED_ALL_CATEGORIES && (
                                <div className="store" onClick={ onAdd.bind(null, ALL_CATEGORIES) }>
                                    <p> {ALL_CATEGORIES} </p>
                                </div>
                            )
                        }
                        {
                            props.categories
                                .filter(category => category.name?.toLowerCase().includes(text.toLowerCase()))
                                .map(category => {
                                    return (
                                        <div className="store" key={category.id} onClick={ onTrigger.bind(null, category) }>
                                            <p> {category.name} </p>
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

export default CategoryNamesDropdown;