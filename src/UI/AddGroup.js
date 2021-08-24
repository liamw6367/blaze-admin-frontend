import React, { useContext, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import JustifyContext from '../Contexts/JustifyingContext';
import Blaze from '../Pages/Blaze';
import { useDataValidation } from '../hooks/use-validation';
import RewardTypeDropdown from '../Dropdowns/RewardTypeDropdown';

const AddGroup = (props) => {
    const { products } = props;

    const justCtx = useContext(JustifyContext);

    const history = useHistory();

    const rewardProductInputRef = useRef();

    const [rewardProducts, setRewardProducts] = useState(products);
    const [selectedRewardProducts, setSelectedRewardProducts] = useState([]);
    const [rewardProductsInputIsTouched, setRewardProductsInputIsTouched] = useState(false);

    const [enteredRewardProductName, setEnteredRewardProductName] = useState("");

    const [currentType, setCurrentType] = useState("");
    const [rewardProductDropdownIsShown, setRewardProductDropdownIsShown] = useState(false);

    const {
        enteredValue: enteredGroupName,
        inputIsValid: groupNameInputIsValid,
        inputIsInvalid: groupNameInputIsInvalid,
        changeInputValueHandler: changeGroupNameInputValueHandler,
        blurInputHandler: blurGroupNameInputHandler,
        resetInputValueHandler: resetGroupNameInputValueHandler,
    } = useDataValidation( value => value.trim() !== "" );
    const {
        enteredValue: enteredQuantity,
        inputIsValid: quantityInputIsValid,
        inputIsInvalid: quantityInputIsInvalid,
        changeInputValueHandler: changeQuantityInputValueHandler,
        blurInputHandler: blurQuantityInputHandler,
        resetInputValueHandler: resetQuantityInputValueHandler,
    } = useDataValidation( value => value.trim() !== "" );

    const rewardTypeFieldIsValid = (currentType === "Percentage(%)" || currentType === "Product(Multiple)");
    
    const {
        enteredValue: enteredRewardPercentage,
        inputIsValid: rewardPercentageInputIsValid,
        inputIsInvalid: rewardPercentageInputIsInvalid,
        changeInputValueHandler: changeRewardPercentageInputValueHandler,
        blurInputHandler: blurRewardPercentageInputHandler,
        resetInputValueHandler: resetRewardPercentageInputValueHandler,
    } = useDataValidation( value => value.trim() !== "" );
    const {
        enteredValue: enteredTotalAmount,
        inputIsValid: totalAmountInputIsValid,
        inputIsInvalid: totalAmountInputIsInvalid,
        changeInputValueHandler: changeTotalAmountInputValueHandler,
        blurInputHandler: blurTotalAmountInputHandler,
        resetInputValueHandler: resetTotalAmountInputValueHandler,
    } = useDataValidation( value => value.trim() !== "" );
    
    const rewardProductsFieldIsValid = selectedRewardProducts.length !== 0;
    const rewardProductsFieldIsInvalid = rewardProductsInputIsTouched && !rewardProductsFieldIsValid;

    const filteredRewardProductsByName = rewardProducts.filter(rewardProduct => rewardProduct.productName.toLowerCase().includes(enteredRewardProductName.toLowerCase()));

    const triggerTypeHandler = (selectedType) => {
        setCurrentType(selectedType.type);
        console.log(selectedType);
    }; 

    const hideRewardProductNamesDropdownHandler = (event) => {
        event.stopPropagation();
        setRewardProductDropdownIsShown(false);
        console.log("***********");
    };
    const showRewardProductNamesDropdownHandler = (event) => {
        event.stopPropagation();
        setRewardProductDropdownIsShown(true);
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

    const groupDataFormIsValid = groupNameInputIsValid && quantityInputIsValid && rewardTypeFieldIsValid && ((currentType === "Percentage(%)") ? rewardPercentageInputIsValid : (currentType === "Product(Multiple)") ? rewardProductsFieldIsValid : true) && totalAmountInputIsValid;

    const groupDataHandler = (event) => {
        event.preventDefault();
        const groupData = {
            id: Math.random().toString(),
            groupName: enteredGroupName,
            quantity: enteredQuantity,
            rewardType: currentType,
            rewardPercentage: enteredRewardPercentage,
            rewardProducts: selectedRewardProducts,
            totalAmount: enteredTotalAmount,
        };
        props.triggerGroupData(groupData);

        resetGroupNameInputValueHandler();
        resetQuantityInputValueHandler();
        setCurrentType("");
        resetRewardPercentageInputValueHandler();
        setSelectedRewardProducts([]);
        resetTotalAmountInputValueHandler();
        setEnteredRewardProductName("");

        history.push('./Discounts');
    };

    return (
        <Blaze
            onClick={justCtx.onJustify}
            isExtended={justCtx.isExtended}
            nav={
                <div className={justCtx.isExtended ? "blaze-nav border" : "wide-blaze-nav border"}>
                    <Link to="/Discounts"><p>Groups/</p></Link> 
                    <Link to="/AddDiscount"><p className="text-color">Add Group</p></Link> 
                </div> 
            }
            main={
                <div className={`blaze-main ${justCtx.isExtended ? "" : "wide"}`}>
                    <div className="store-info-box info-box-margin" onClick={(event) => hideRewardProductNamesDropdownHandler(event)}>
                        <form action="#" name="" id="" onSubmit={groupDataHandler}>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <label htmlFor="group-name" className="label"> Group Name * </label>
                                    <div>
                                        <input 
                                            className={`user-inputs__input ${ groupNameInputIsInvalid ? "invalid" : groupNameInputIsValid ? "valid" : "" }`}
                                            type="text" 
                                            name="" 
                                            id="group-name" 
                                            value={enteredGroupName} 
                                            onChange={changeGroupNameInputValueHandler} 
                                            onBlur={blurGroupNameInputHandler}
                                        />
                                        {
                                            groupNameInputIsInvalid && <p className="error-message">This field is required!</p> 
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <label htmlFor="quantity" className="label"> Quantity * </label>
                                    <div>
                                        <input 
                                            className={`user-inputs__input ${ quantityInputIsInvalid ? "invalid" : quantityInputIsValid ? "valid" : "" }`}
                                            type="number" 
                                            name="" 
                                            id="quantity" 
                                            value={enteredQuantity} 
                                            onChange={changeQuantityInputValueHandler}
                                            onBlur={blurQuantityInputHandler}                                    
                                        />
                                        {
                                            quantityInputIsInvalid && <p className="error-message">This field is required!</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="user-inputs latitude-div">
                                <div className="user-inputs__container reward-type-div">
                                    <div className="label"> Reward type * </div>
                                    <div>
                                        <RewardTypeDropdown className="user-inputs__input" onTrigger={triggerTypeHandler} />
                                    </div>    
                                </div>
                            </div>
                            {
                                (currentType === "Percentage(%)") 
                                ? (
                                    <div className="user-inputs">
                                        <div className="user-inputs__container">
                                            <label htmlFor="group-reward-percentage" className="label"> Reward Percentage * </label>
                                            <div>
                                                <input 
                                                    className={`user-inputs__input ${ rewardPercentageInputIsInvalid ? "invalid" : rewardPercentageInputIsValid ? "valid" : "" }`}
                                                    type="number" 
                                                    name="" 
                                                    id="group-reward-percentage" 
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
                                            <label htmlFor="group-reward-products" className="label"> Reward Products * </label>
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
                                                            id="group-reward-products" 
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
                                <div className="user-inputs__container">
                                    <label htmlFor="total-amount" className="label"> Total Amount * </label>
                                    <div>
                                        <input 
                                            className={`user-inputs__input ${ totalAmountInputIsInvalid ? "invalid" : totalAmountInputIsValid ? "valid" : "" }`}
                                            type="number" 
                                            name="" 
                                            id="total-amount" 
                                            value={enteredTotalAmount} 
                                            onChange={changeTotalAmountInputValueHandler}
                                            onBlur={blurTotalAmountInputHandler}                                    
                                        />
                                        {
                                            totalAmountInputIsInvalid && <p className="error-message">This field is required!</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <button 
                                        type="submit" 
                                        className="submit-store"
                                        disabled={ !groupDataFormIsValid }    
                                    >
                                        Save
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

export default AddGroup;

