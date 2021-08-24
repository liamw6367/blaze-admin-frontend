import React, { useContext, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import JustifyContext from '../Contexts/JustifyingContext';
import Blaze from '../Pages/Blaze';
import { useUpdatingDataValidation } from '../hooks/use-validation';
import RewardTypeDropdown from '../Dropdowns/RewardTypeDropdown';
import CriteriaDropdown from '../Dropdowns/CriteriaDropdown';

const EditDiscount = (props) => {
    const { categories, products, targetDiscount } = props;
    
    const justCtx = useContext(JustifyContext);

    const history = useHistory();

    const categoryInputRef = useRef();
    const rewardProductInputRef = useRef();
    const discountingProductInputRef = useRef();

    const [rewardProducts, setRewardProducts] = useState(products);
    const [selectedRewardProducts, setSelectedRewardProducts] = useState(targetDiscount.rewardProducts);
    const [discountingProducts, setDiscountingProducts] = useState(products);
    const [selectedDiscountingProducts, setSelectedDiscountingProducts] = useState(targetDiscount.products);
    const [rewardProductsInputIsTouched, setRewardProductsInputIsTouched] = useState(false);
    const [discountingProductsInputIsTouched, setDiscountingProductsInputIsTouched] = useState(false);

    const [enteredCategoryName, setEnteredCategoryName] = useState("");
    const [enteredRewardProductName, setEnteredRewardProductName] = useState("");
    const [enteredProductName, setEnteredProductName] = useState("");

    const [allProductsAreMarked, setAllProductsAreMarked] = useState(targetDiscount.allProductsAreMarked);
    const [discountIsActive, setDiscountIsActive] = useState(targetDiscount.discountIsActive);

    const [rewardCategories, setRewardCategories] = useState(categories);
    const [selectedCategories, setSelectedCategories] = useState(targetDiscount.categories);
    const [currentType, setCurrentType] = useState(targetDiscount.rewardType);
    const [currentCriterion, setCurrentCriterion] = useState(targetDiscount.criteria);
    
    const [categoryDropdownIsShown, setCategoryDropdownIsShown] = useState(false);
    const [rewardProductDropdownIsShown, setRewardProductDropdownIsShown] = useState(false);
    const [productDropdownIsShown, setProductDropdownIsShown] = useState(false);

    const {
        enteredValue: enteredName,
        inputIsValid: nameInputIsValid,
        inputIsInvalid: nameInputIsInvalid,
        changeInputValueHandler: changeNameInputValueHandler,
        blurInputHandler: blurNameInputHandler,
    } = useUpdatingDataValidation( targetDiscount.discountName, (value) => value.trim() !== "" );

    const [codeNameInputIsBeingChanged, setCodeNameInputIsBeingChanged] = useState(false);
    // const {
    //     enteredValue: enteredCodeName,
    //     inputIsValid: codeNameInputIsValid,
    //     inputIsInvalid: codeNameInputIsInvalid,
    //     changeInputValueHandler: changeCodeNameInputValueHandler,
    //     blurInputHandler: blurCodeNameInputHandler,
    // } = useUpdatingDataValidation( targetDiscount.discountCodeName, (value) => value.trim() !== "" );

    const rewardTypeFieldIsValid = (currentType === "Percentage(%)" || currentType === "Product(Multiple)");

    const {
        enteredValue: enteredRewardPercentage,
        inputIsValid: rewardPercentageInputIsValid,
        inputIsInvalid: rewardPercentageInputIsInvalid,
        changeInputValueHandler: changeRewardPercentageInputValueHandler,
        blurInputHandler: blurRewardPercentageInputHandler,
    } = useUpdatingDataValidation( targetDiscount.rewardPercentage, (value) => value.trim() !== "" );

    const criteriaFieldIsValid = (currentCriterion === "Min Bill" || currentCriterion === "First Download" || currentCriterion === "Welcome Back" || currentCriterion === "None");
    
    const {
        enteredValue: enteredMinBill,
        inputIsValid: minBillInputIsValid,
        inputIsInvalid: minBillInputIsInvalid,
        changeInputValueHandler: changeMinBillInputValueHandler,
        blurInputHandler: blurMinBillInputHandler,
    } = useUpdatingDataValidation( targetDiscount.minBill, (value) => value.trim() !== "" );
    const {
        enteredValue: enteredDuration,
        inputIsValid: durationInputIsValid,
        inputIsInvalid: durationInputIsInvalid,
        changeInputValueHandler: changeDurationInputValueHandler,
        blurInputHandler: blurDurationInputHandler,
    } = useUpdatingDataValidation( targetDiscount.duration, (value) => value.trim() !== "" );

    const rewardProductsFieldIsValid = selectedRewardProducts.length !== 0;
    const rewardProductsFieldIsInvalid = rewardProductsInputIsTouched && !rewardProductsFieldIsValid;
    const discountingProductsFieldIsValid = selectedDiscountingProducts.length !== 0;
    const discountingProductsFieldIsInvalid = discountingProductsInputIsTouched && !discountingProductsFieldIsValid;

    const filteredCategoriesByName = rewardCategories.filter(category => category.categoryName.toLowerCase().includes(enteredCategoryName.toLowerCase()));
    const filteredRewardProductsByName = rewardProducts.filter(rewardProduct => rewardProduct.productName.toLowerCase().includes(enteredRewardProductName.toLowerCase()));
    const filteredDiscountingProductsByName = discountingProducts.filter(discountingProduct => discountingProduct.productName.toLowerCase().includes(enteredProductName.toLowerCase()));

    const triggerTypeHandler = (selectedType) => {
        setCurrentType(selectedType.type);
        console.log(selectedType);
    }; 
    const triggerCriterionHandler = (selectedCriterion) => {
        setCurrentCriterion(selectedCriterion.criterion);
        console.log(selectedCriterion);
    };

    const showCategoryNamesDropdownHandler = (event) => {
        event.stopPropagation();
        setCategoryDropdownIsShown(true);
    };
    const hideNamesDropdownsHandler = (event) => {
        event.stopPropagation();
        setCategoryDropdownIsShown(false);
        setRewardProductDropdownIsShown(false);
        setProductDropdownIsShown(false);
        console.log("***********");
    };

    const showRewardProductNamesDropdownHandler = (event) => {
        event.stopPropagation();
        setRewardProductDropdownIsShown(true);
    };
    const showProductNamesDropdownHandler = (event) => {
        event.stopPropagation();
        setProductDropdownIsShown(true);
    };

    const addSelectedCategoryHandler = (event, selectedCategory) => {
        event.stopPropagation();
        categoryInputRef.current.focus();
        setRewardCategories(prevCategories => prevCategories.filter(category => category.id !== selectedCategory.id));
        setSelectedCategories(prevCategories => [...prevCategories, selectedCategory]);
        setEnteredCategoryName("");
    };
    const removeSelectedCategoryHandler = (selectedCategory) => {
        categoryInputRef.current.focus();
        setRewardCategories(prevCategories => [selectedCategory, ...prevCategories]);
        setSelectedCategories(prevCategories => prevCategories.filter(category => category.id !== selectedCategory.id));
    };

    const addSelectedRewardProductHandler = (event, selectedRewardPoduct) => {
        event.stopPropagation();
        rewardProductInputRef.current.focus();
        setRewardProducts(prevRewardProducts => prevRewardProducts.filter(rewardProduct => rewardProduct.id !== selectedRewardPoduct.id));
        setSelectedRewardProducts(prevRewardProducts => [selectedRewardPoduct, ...prevRewardProducts]);
        setEnteredRewardProductName("");
    };
    const removeSelectedRewardProductHandler = (selectedRewardPoduct) => {
        rewardProductInputRef.current.focus();
        setRewardProducts(prevRewardProducts => [selectedRewardPoduct, ...prevRewardProducts]);
        setSelectedRewardProducts(prevRewardProducts => prevRewardProducts.filter(rewardProduct => rewardProduct.id !== selectedRewardPoduct.id));
    };

    const addSelectedDiscountingProductHandler = (event, selectedDiscountingProduct) => {
        event.stopPropagation();
        discountingProductInputRef.current.focus();
        setDiscountingProducts(prevDiscountingProducts => prevDiscountingProducts.filter(discountingProduct => discountingProduct.id !== selectedDiscountingProduct.id));
        setSelectedDiscountingProducts(prevDiscountingProducts => [selectedDiscountingProduct, ...prevDiscountingProducts]);
        setEnteredProductName("");
    };
    const removeSelectedDiscountingProductHandler = (selectedDiscountingProduct) => {
        discountingProductInputRef.current.focus();
        setDiscountingProducts(prevDiscountingProducts => [selectedDiscountingProduct, ...prevDiscountingProducts]);
        setSelectedDiscountingProducts(prevDiscountingProducts => prevDiscountingProducts.filter(discountingProduct => discountingProduct.id !== selectedDiscountingProduct.id));
    };
    
    const categoriesFieldIsNotEmpty = selectedCategories.length !== 0;

    const discountDataFormIsValid = nameInputIsValid && rewardTypeFieldIsValid && ((currentType === "Percentage(%)") ? rewardPercentageInputIsValid : (currentType === "Product(Multiple)") ? rewardProductsFieldIsValid : true) && criteriaFieldIsValid && ((currentCriterion === "Min Bill") ? minBillInputIsValid : (currentCriterion === "Welcome Back") ? durationInputIsValid : true) && (!allProductsAreMarked ? discountingProductsFieldIsValid : true);

    const updateDiscountDataHandler = (event) => {
        event.preventDefault();
        const updatedDiscountData = {
            discountName: enteredName,
            discountCodeName: targetDiscount.discountCodeName,
            rewardType: currentType,
            rewardPercentage: enteredRewardPercentage,
            rewardProducts: selectedRewardProducts,
            criteria: currentCriterion,
            minBill: enteredMinBill,
            duration: enteredDuration,
            categories: !allProductsAreMarked ? selectedCategories : categories,
            products: !allProductsAreMarked ? selectedDiscountingProducts : products,
            allProductsAreMarked,
            discountIsActive,
        };
        props.onUpdate(updatedDiscountData);

        history.push('./Discounts');
    };

    return (
        <Blaze
            onClick={justCtx.onJustify}
            isExtended={justCtx.isExtended}
            nav={
                <div className={justCtx.isExtended ? "blaze-nav border" : "wide-blaze-nav border"}>
                    <Link to="/Discounts"><p>Discounts/</p></Link> 
                    <Link to="/EditDiscount"><p className="text-color">Edit Discount</p></Link> 
                </div> 
            }
            main={
                <div className={`blaze-main ${justCtx.isExtended ? "" : "wide"}`}>
                    <div className="store-info-box info-box-margin" onClick={(event) => hideNamesDropdownsHandler(event)}>
                        <form action="#" name="" id="" onSubmit={updateDiscountDataHandler}>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <label htmlFor="discount-name" className="label"> Name * </label>
                                    <div>
                                        <input 
                                            className={`user-inputs__input ${ nameInputIsInvalid ? "invalid" : nameInputIsValid ? "valid" : "" }`}
                                            type="text" 
                                            name="" 
                                            id="discount-name" 
                                            value={enteredName} 
                                            onChange={changeNameInputValueHandler}
                                            onBlur={blurNameInputHandler}
                                        />
                                        {
                                            nameInputIsInvalid && <p className="error-message">This field is required!</p> 
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <label htmlFor="code-name" className="label"> Code Name * </label>
                                    <div>
                                        <input 
                                            className="user-inputs__input valid"
                                            type="text" 
                                            name="" 
                                            id="code-name" 
                                            value={targetDiscount.discountCodeName} 
                                            onChange={ () => setCodeNameInputIsBeingChanged(true) }
                                            onBlur={ () => setCodeNameInputIsBeingChanged(false) }
                                            // onChange={changeCodeNameInputValueHandler}
                                            // onBlur={blurCodeNameInputHandler}
                                        />
                                        {
                                            codeNameInputIsBeingChanged && <p className="error-message"> You can not change this code! </p>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="user-inputs latitude-div">
                                <div className="user-inputs__container reward-type-div">
                                    <div className="label"> Reward type * </div>
                                    <div>
                                        <RewardTypeDropdown className="user-inputs__input" onTrigger={triggerTypeHandler}  fromUpdate={true} currentType={currentType} />
                                    </div>    
                                </div>
                            </div>
                            {
                                (currentType === "Percentage(%)") 
                                ? (
                                    <div className="user-inputs">
                                        <div className="user-inputs__container">
                                            <label htmlFor="reward-percentage" className="label"> Reward Percentage * </label>
                                            <div>
                                                <input 
                                                    className={`user-inputs__input ${ rewardPercentageInputIsInvalid ? "invalid" : rewardPercentageInputIsValid ? "valid" : "" }`}
                                                    type="number" 
                                                    name="" 
                                                    id="reward-percentage" 
                                                    value={enteredRewardPercentage} 
                                                    onChange={changeRewardPercentageInputValueHandler}
                                                    onBlur={blurRewardPercentageInputHandler}
                                                />
                                                {
                                                    rewardPercentageInputIsInvalid && <p className="error-message">This field is required!</p>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                                : (currentType === "Product(Multiple)")
                                ? (
                                    <div className="user-inputs">
                                        <div className="user-inputs__container">
                                            <label htmlFor="reward-products" className="label"> Reward Products * </label>
                                            <div className={ `products-box ${rewardProductsFieldIsInvalid ? "invalid" : rewardProductsFieldIsValid ? "valid" : ""}` }>
                                                    <div className="products-and-input-container">
                                                        {
                                                            selectedRewardProducts.map(selectedRewardProduct => {
                                                                return (
                                                                    <div className="selected-categories-box" key={selectedRewardProduct.id}>
                                                                        <p className="selected-category-name"> {selectedRewardProduct.productName} </p>
                                                                        <span 
                                                                            className="remove-sel-category-icon"
                                                                            onClick={ removeSelectedRewardProductHandler.bind(null, selectedRewardProduct) }
                                                                        > 
                                                                            x 
                                                                        </span>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                        <input 
                                                            ref={rewardProductInputRef}
                                                            className="user-inputs__input categories-input"
                                                            type="text" 
                                                            name="" 
                                                            id="reward-products" 
                                                            value={enteredRewardProductName} 
                                                            onChange={ (event) => setEnteredRewardProductName(event.target.value) } 
                                                            onClick={ (event) => showRewardProductNamesDropdownHandler(event) }
                                                            onBlur={ () => setRewardProductsInputIsTouched(true) }
                                                            autoComplete="off"
                                                        />
                                                    </div>
                                                    {
                                                        rewardProductsFieldIsInvalid && <p className="error-message product-error">This field is required!</p>
                                                    }
                                                    {
                                                        rewardProductDropdownIsShown && (
                                                            <div className="categories-dropdown-box">
                                                                <ul>
                                                                    {
                                                                        (filteredRewardProductsByName.length === 0) 
                                                                        ? (
                                                                            <div className="no-matches-found-box">
                                                                                <h2 className="no-matches-found-message">No Matches Found</h2>
                                                                            </div>
                                                                        )
                                                                        : (
                                                                            filteredRewardProductsByName.map(rewardProduct => {
                                                                                return (
                                                                                    <li 
                                                                                        key={rewardProduct.id}
                                                                                        onClick={ (event) => addSelectedRewardProductHandler(event, rewardProduct) }
                                                                                    > 
                                                                                        {rewardProduct.productName} 
                                                                                    </li>
                                                                                )
                                                                            })
                                                                        )
                                                                    }
                                                                </ul>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                        </div>
                                    </div>
                                ) 
                                : null
                            }
                            <div className="user-inputs">
                                <div className="user-inputs__container reward-type-div">
                                    <div className="label"> Criteria * </div>
                                    <div>
                                        <CriteriaDropdown className="user-inputs__input" onTrigger={triggerCriterionHandler} fromUpdate={true} currentCriterion={currentCriterion} />
                                    </div>
                                </div>
                            </div>
                            {
                                (currentCriterion === "Min Bill")
                                ? (
                                    <div className="user-inputs">
                                        <div className="user-inputs__container">
                                            <label htmlFor="min-bill" className="label"> Min Bill * </label>
                                            <div>
                                                <input 
                                                    className={`user-inputs__input ${ minBillInputIsInvalid ? "invalid" : minBillInputIsValid ? "valid" : "" }`}
                                                    type="text" 
                                                    name="" 
                                                    id="min-bill" 
                                                    value={enteredMinBill} 
                                                    onChange={changeMinBillInputValueHandler}
                                                    onBlur={blurMinBillInputHandler}
                                                />
                                                {
                                                    minBillInputIsInvalid && <p className="error-message">This field is required!</p>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                                : (currentCriterion === "Welcome Back")
                                ? (
                                    <div className="user-inputs">
                                        <div className="user-inputs__container">
                                            <label htmlFor="duration" className="label"> Duration * </label>
                                            <div>
                                                <input 
                                                    className={`user-inputs__input ${ durationInputIsInvalid ? "invalid" : durationInputIsValid ? "valid" : "" }`}
                                                    type="text" 
                                                    name="" 
                                                    id="duration" 
                                                    value={enteredDuration} 
                                                    onChange={changeDurationInputValueHandler}
                                                    onBlur={blurDurationInputHandler}
                                                />
                                                {
                                                    durationInputIsInvalid && <p className="error-message">This field is required!</p>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                                : null
                            }
                            {
                                !allProductsAreMarked && (
                                    <>
                                        <div className="user-inputs">
                                            <div className="user-inputs__container">
                                                <label htmlFor="categories" className="label"> Categories </label>
                                                <div className={ `categories-box ${categoriesFieldIsNotEmpty ? "valid" : ""}` }>
                                                    {
                                                        selectedCategories.map(selectedCategory => {
                                                            return (
                                                                <div className="selected-categories-box" key={selectedCategory.id}>
                                                                    <p className="selected-category-name"> {selectedCategory.categoryName} </p>
                                                                    <span 
                                                                        className="remove-sel-category-icon"
                                                                        onClick={ removeSelectedCategoryHandler.bind(null, selectedCategory) }
                                                                    > 
                                                                        x 
                                                                    </span>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                    <input 
                                                        ref={categoryInputRef}
                                                        className="user-inputs__input categories-input"
                                                        type="text" 
                                                        name="" 
                                                        id="categories" 
                                                        value={enteredCategoryName} 
                                                        onChange={ (event) => setEnteredCategoryName(event.target.value) } 
                                                        onClick={ (event) => showCategoryNamesDropdownHandler(event) }
                                                        autoComplete="off"
                                                    />
                                                    {
                                                        categoryDropdownIsShown && (
                                                            <div className="categories-dropdown-box">
                                                                <ul>
                                                                    {
                                                                        (filteredCategoriesByName.length === 0) 
                                                                        ? (
                                                                            <div className="no-matches-found-box">
                                                                                <h2 className="no-matches-found-message">No Matches Found</h2>
                                                                            </div>
                                                                        )
                                                                        : (
                                                                            filteredCategoriesByName.map(category => {
                                                                                return (
                                                                                    <li 
                                                                                        key={category.id}
                                                                                        onClick={ (event) => addSelectedCategoryHandler(event, category) }
                                                                                    > 
                                                                                        {category.categoryName} 
                                                                                    </li>
                                                                                )
                                                                            })
                                                                        )
                                                                    }
                                                                </ul>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="user-inputs">
                                            <div className="user-inputs__container">
                                                <label htmlFor="products" className="label"> Products * </label>
                                                <div className={ `products-box ${discountingProductsFieldIsInvalid ? "invalid" : discountingProductsFieldIsValid ? "valid" : ""}` }>
                                                    <div className="products-and-input-container">
                                                        {
                                                            selectedDiscountingProducts.map(selectedDiscountingProduct => {
                                                                return (
                                                                    <div className="selected-categories-box" key={selectedDiscountingProduct.id}>
                                                                        <p className="selected-category-name"> {selectedDiscountingProduct.productName} </p>
                                                                        <span 
                                                                            className="remove-sel-category-icon"
                                                                            onClick={ removeSelectedDiscountingProductHandler.bind(null, selectedDiscountingProduct) }
                                                                        > 
                                                                            x 
                                                                        </span>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                        <input 
                                                            ref={discountingProductInputRef}
                                                            className="user-inputs__input categories-input"
                                                            type="text" 
                                                            name="" 
                                                            id="products" 
                                                            value={enteredProductName} 
                                                            onChange={ (event) => setEnteredProductName(event.target.value) } 
                                                            onClick={ (event) => showProductNamesDropdownHandler(event) }
                                                            onBlur={ () => setDiscountingProductsInputIsTouched(true) }
                                                            autoComplete="off"
                                                        />
                                                    </div>
                                                    {
                                                        discountingProductsFieldIsInvalid && <p className="error-message product-error">This field is required!</p>
                                                    }
                                                    {
                                                        productDropdownIsShown && (
                                                            <div className="categories-dropdown-box">
                                                                <ul>
                                                                    {
                                                                        (filteredDiscountingProductsByName.length === 0) 
                                                                        ? (
                                                                            <div className="no-matches-found-box">
                                                                                <h2 className="no-matches-found-message">No Matches Found</h2>
                                                                            </div>
                                                                        )
                                                                        : (
                                                                            filteredDiscountingProductsByName.map(discountingProduct => {
                                                                                return (
                                                                                    <li 
                                                                                        key={discountingProduct.id}
                                                                                        onClick={ (event) => addSelectedDiscountingProductHandler(event, discountingProduct) }
                                                                                    > 
                                                                                        {discountingProduct.productName} 
                                                                                    </li>
                                                                                )
                                                                            })
                                                                        )
                                                                    }
                                                                </ul>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                            <div className="user-inputs">
                                <div className="checkbox-container">
                                    <div className="active-inactive__checkbox">
                                        <label htmlFor="all-products" className="active-inactive-label label"> All Products </label>
                                        <input 
                                            type="checkbox" 
                                            name="" 
                                            id="all-products" 
                                            className="active-inactive-input" 
                                            onChange={ (event) => setAllProductsAreMarked(event.target.checked) }
                                            checked={allProductsAreMarked}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="checkbox-container">
                                    <div className="active-inactive__checkbox">
                                        <label htmlFor="active" className="active-inactive-label label"> Active </label>
                                        <input 
                                            type="checkbox" 
                                            name="" 
                                            id="active" 
                                            className="active-inactive-input" 
                                            onChange={ (event) => setDiscountIsActive(event.target.checked) }
                                            checked={discountIsActive}
                                        />
                                    </div>
                                    <button 
                                        type="submit" 
                                        className="submit-store"
                                        disabled={ !discountDataFormIsValid }    
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            }
        />
    );
}

export default EditDiscount;

