import React, { useState, useContext } from 'react';
import JustifyContext from '../Contexts/JustifyingContext';
import Blaze from './Blaze';
import CategoryNamesDropdown from '../Dropdowns/CategoryNamesDropdown';
import ProductInfo from '../Lists/ProductInfo';

const Products = (props) => {
    const justCtx = useContext(JustifyContext);
    
    const [searchingText, setSearchingText] = useState("");
    const [chosenCategoryName, setChosenCategoryName] = useState("All");

    const changeInputHandler = (event) => {
        setSearchingText(event.target.value);
    };
    const passCategoryNameHandler = (currentCategory) => {
        setChosenCategoryName(currentCategory.categoryName);
        console.log(currentCategory);
        console.log(currentCategory.categoryName);
    };
    const changeCategoryNameHandler = (allCategories) => {
        setChosenCategoryName(allCategories);
        console.log(allCategories);
    };
    // const passProductHandler = (currentProduct) => {
    //     props.showProduct(currentProduct);
    // };   

    const filteredProductsByData = props.products.filter( product => product.productName.toLowerCase().includes(searchingText.toLowerCase()) );
    const filteredProductsByCategory = (chosenCategoryName === "All") 
                                        ? filteredProductsByData 
                                        : filteredProductsByData.filter( product => product.productCategory === chosenCategoryName );

    return (
        <Blaze
            onClick={justCtx.onJustify}
            isExtended={justCtx.isExtended}
            nav={
                <div className={justCtx.isExtended ? "blaze-nav" : "wide-blaze-nav"}>
                    <p> Products </p>
                </div>
            }
            main={
                <div className={ `blaze-main ${justCtx.isExtended ? "" : "wide"}` }>
                    <div className="filtering justify">
                        <span className="text"> View: </span>
                        <div className="search-input">
                            <input type="text" name="" id="" placeholder="Search..." onChange={changeInputHandler} />
                            <i />
                        </div>
                        <span className="text"> Category: </span>
                        <CategoryNamesDropdown 
                            categories={props.categories} 
                            onPass={passCategoryNameHandler} 
                            onChange={changeCategoryNameHandler} 
                            chosenCategoryName={chosenCategoryName} 
                        />
                    </div>
                    {
                        (filteredProductsByCategory.length === 0) 
                        ? (
                            <div className="store-info-box all-orders-box">
                                <h2 className="no-orders-available">No Products Available</h2>
                            </div>
                        ) 
                        : (
                            <div className="store-info-box">
                                <table className="info-table">
                                    <thead>
                                        <tr>
                                            <th className="padding-left">#</th>
                                            <th className="padding-left">Name</th>
                                            <th>Image</th>
                                            <th>Description</th>
                                            <th className="last-box">View</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filteredProductsByCategory.map((product, index) => {
                                                return (
                                                    <ProductInfo 
                                                        product={product} 
                                                        index={index + 1} 
                                                        key={product.id} 
                                                        // onPass={passProductHandler}
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

export default Products;