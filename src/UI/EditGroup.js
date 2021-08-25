import React, { useContext, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import JustifyContext from '../Contexts/JustifyingContext';
import Blaze from '../Pages/Blaze';
import { useUpdatingDataValidation } from '../hooks/use-validation';
import RewardTypeDropdown from '../Dropdowns/RewardTypeDropdown';

const EditGroup = (props) => {
    const { products, targetGroup } = props;

    const justCtx = useContext(JustifyContext);

    const history = useHistory();

    const rewardProductInputRef = useRef();

    const [rewardProducts, setRewardProducts] = useState(products);
    const [selectedRewardProducts, setSelectedRewardProducts] = useState(targetGroup.rewardProducts);
    const [rewardProductsInputIsTouched, setRewardProductsInputIsTouched] = useState(false);

    const [enteredRewardProductName, setEnteredRewardProductName] = useState("");

    const [currentType, setCurrentType] = useState(targetGroup.rewardType);
    const [rewardProductDropdownIsShown, setRewardProductDropdownIsShown] = useState(false);

    const {
        enteredValue: enteredGroupName,
        inputIsValid: groupNameInputIsValid,
        inputIsInvalid: groupNameInputIsInvalid,
        changeInputValueHandler: changeGroupNameInputValueHandler,
        blurInputHandler: blurGroupNameInputHandler,
    } = useUpdatingDataValidation( targetGroup.groupName, (value) => value.trim() !== "" );
    const {
        enteredValue: enteredQuantity,
        inputIsValid: quantityInputIsValid,
        inputIsInvalid: quantityInputIsInvalid,
        changeInputValueHandler: changeQuantityInputValueHandler,
        blurInputHandler: blurQuantityInputHandler,
    } = useUpdatingDataValidation( targetGroup.quantity, (value) => value.trim() !== "" );

    const rewardTypeFieldIsValid = (currentType === "Percentage(%)" || currentType === "Product(Multiple)");
    
    const {
        enteredValue: enteredRewardPercentage,
        inputIsValid: rewardPercentageInputIsValid,
        inputIsInvalid: rewardPercentageInputIsInvalid,
        changeInputValueHandler: changeRewardPercentageInputValueHandler,
        blurInputHandler: blurRewardPercentageInputHandler,
    } = useUpdatingDataValidation( targetGroup.rewardPercentage, (value) => value.trim() !== "" );
    const {
        enteredValue: enteredTotalAmount,
        inputIsValid: totalAmountInputIsValid,
        inputIsInvalid: totalAmountInputIsInvalid,
        changeInputValueHandler: changeTotalAmountInputValueHandler,
        blurInputHandler: blurTotalAmountInputHandler,
    } = useUpdatingDataValidation( targetGroup.totalAmount, (value) => value.trim() !== "" );
    
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

    const updatedGroupDataFormIsValid = groupNameInputIsValid && quantityInputIsValid && rewardTypeFieldIsValid && ((currentType === "Percentage(%)") ? rewardPercentageInputIsValid : (currentType === "Product(Multiple)") ? rewardProductsFieldIsValid : true) && totalAmountInputIsValid;

    const updatedGroupDataHandler = (event) => {
        event.preventDefault();
        const updatedGroupData = {
            id: targetGroup.id,
            groupName: enteredGroupName,
            quantity: enteredQuantity,
            rewardType: currentType,
            rewardPercentage: enteredRewardPercentage,
            rewardProducts: selectedRewardProducts,
            totalAmount: enteredTotalAmount,
        };
        props.onUpdate(updatedGroupData);

        history.push('./admin/discounts');
    };

    return (
        <Blaze
            onClick={justCtx.onJustify}
            isExtended={justCtx.isExtended}
            nav={
                <div className={justCtx.isExtended ? "blaze-nav border" : "wide-blaze-nav border"}>
                    <Link to="/admin/discounts"><p>Groups/</p></Link> 
                    <Link to="/admin/edit-group"><p className="text-color">Edit Group</p></Link> 
                </div> 
            }
            main={
                <div className={`blaze-main ${justCtx.isExtended ? "" : "wide"}`}>
                    <div className="store-info-box info-box-margin" onClick={(event) => hideRewardProductNamesDropdownHandler(event)}>
                        <form action="#" name="" id="" onSubmit={updatedGroupDataHandler}>
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
                                        <RewardTypeDropdown className="user-inputs__input" onTrigger={triggerTypeHandler} fromUpdate={true} currentType={currentType} />
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
                                        disabled={ !updatedGroupDataFormIsValid }    
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

export default EditGroup;


