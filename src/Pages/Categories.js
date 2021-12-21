import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import JustifyContext from '../Contexts/JustifyingContext';
import Blaze from './Blaze';
import StoreStatusDropdown from '../Dropdowns/StoreStatusDropdown';
import CategoriesInfo from '../Lists/CategoriesInfo';
import axios from 'axios';

const Categories = (props) => {
    const justCtx = useContext(JustifyContext);
    
    const [searchingText, setSearchingText] = useState("");
    const [currentCategoryStatus, setCurrentCategoryStatus] = useState("All");
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/categories/get`)
        .then((res) => {
            setIsLoading(false);
            setCategories(res.data);
            console.log(res.data);
        })
        .catch((err) => {
            setIsLoading(false);
            console.log(err);
        });
    }, []);

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

    const filteredCategoriesByData = categories.filter( category => category.name.toLowerCase().includes(searchingText.toLowerCase()) );
    const filteredCategoriesByStatus = (currentCategoryStatus === "Active")
    ? filteredCategoriesByData.filter(category => category.is_active)
    : (currentCategoryStatus === "Inactive")
    ? filteredCategoriesByData.filter(category => !category.is_active)
    : filteredCategoriesByData;

    const removeHandler = (id) => {
        console.log(id);
        axios.delete(`${process.env.REACT_APP_API_URL}/categories/remove?id=${id}`,)
            .then(res => {
                console.log(res.data, "sssssssssssssssss");
                setCategories(res.data);
            })
            .catch(err => console.log(err));
    };

    // if(isLoading) {
    //     return (
    //         <div>
    //             <p> LOADING..... </p>
    //         </div>
    //     );
    // }

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
                            <Link to="/admin/add-category">Add New</Link>
                        </div>
                    </div>
                    {
                        (filteredCategoriesByStatus.length === 0) 
                        ? (
                            <div className="store-info-box all-orders-box">
                                <h2 className="no-orders-available">no categories available.</h2>
                            </div>
                        )
                        : (
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
                                                        onRemove={removeHandler}
                                                    />
                                                );
                                            }) 
                                        } 
                                    </tbody>
                                </table>
                            </div>
                        )
                    }
                </div>
            }
        />
    );
};

export default Categories;