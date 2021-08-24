import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import JustifyContext from '../Contexts/JustifyingContext';
import Blaze from './Blaze';
import StoreStatusDropdown from '../Dropdowns/StoreStatusDropdown';
import CategoriesInfo from '../Lists/CategoriesInfo';

const Categories = (props) => {
    const justCtx = useContext(JustifyContext);
    
    const [searchingText, setSearchingText] = useState("");
    const [currentCategoryStatus, setCurrentCategoryStatus] = useState("All");

    const changeInputHandler = (event) => {
        setSearchingText(event.target.value);
    };
    const triggerStatusHandler = (selectedStatus) => {
        setCurrentCategoryStatus(selectedStatus.status);
    // console.log(selectedStatus)
    };
    const passCategoryHandler = (currentCategory) => {
        props.showCategory(currentCategory);
    };

    const filteredCategoriesByData = props.categories.filter( category => category.categoryName.toLowerCase().includes(searchingText.toLowerCase()) );
    const filteredCategoriesByStatus = (currentCategoryStatus === "Active")
    ? filteredCategoriesByData.filter(category => category.categoryIsActive)
    : (currentCategoryStatus === "Inactive")
    ? filteredCategoriesByData.filter(category => !category.categoryIsActive)
    : filteredCategoriesByData;

    return (
        <Blaze
            onClick={justCtx.onJustify}
            isExtended={justCtx.isExtended}
            nav={
                <div className={justCtx.isExtended ? "blaze-nav" : "wide-blaze-nav"}>
                    <p>Categories</p>
                </div>
            }
            main={
                <div className={`blaze-main ${justCtx.isExtended ? "" : "wide"}`}>
                    <div className="filtering justify">
                        <span className="text">View:</span>
                        <div className="search-input">
                            <input type="text" name="" id="" placeholder="Search..." onChange={changeInputHandler} />
                            <i />
                        </div>
                        <StoreStatusDropdown onTrigger={triggerStatusHandler} />
                        <div className="add-store-button">
                            <Link to="/AddCategory">Add New</Link>
                        </div>
                    </div>
                    <div className="store-info-box">
                        <table className="info-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Thumbnail</th>
                                    <th>Description</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredCategoriesByStatus.map((category, index) => {
                                        return (
                                            <CategoriesInfo 
                                                category={category} 
                                                index={index + 1} 
                                                key={category.id} 
                                                onPass={passCategoryHandler}
                                            />
                                        );
                                    }) 
                                } 
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        />
    );
};

export default Categories;