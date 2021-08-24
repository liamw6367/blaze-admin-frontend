import React, { useContext, useState } from 'react';
import JustifyContext from '../Contexts/JustifyingContext';
import { useDataValidation } from '../hooks/use-validation';
import Blaze from './Blaze';

const DeliveryFee = () => {
    const justCtx = useContext(JustifyContext);

    const [priceIsGiven, setPriceIsGiven] = useState(false);
    const [wantToEdit, setWantToEdit] = useState(false);

    const {
        enteredValue: enteredPrice,
        inputIsValid: priceInputIsValid,
        inputIsInvalid: priceInputIsInvalid,
        changeInputValueHandler: changePriceInputValueHandler,
        blurInputHandler: blurPriceInputHandler,
    } = useDataValidation((value) => value.trim() !== "");

    const deliveryFeeIsValid = priceInputIsValid;

    const deliveryFeeHandler = (event) => {
        event.preventDefault();
        const currentDeliveryFee = enteredPrice;
        console.log(currentDeliveryFee);
        setPriceIsGiven(true);
        setWantToEdit(false);
    };

    // const priceInput = document.getElementById("delivery-fee");

    const editPriceHandler = () => {
        setWantToEdit(true);
    };

    const deliveryFeeField = (
        <form action="#" name="" id="" onSubmit={deliveryFeeHandler}>
            <div className="user-inputs">
                <div className="user-inputs__container">
                    <label htmlFor="delivery-fee" className="label"> Price </label>
                    <div>
                        <input 
                            autoComplete="off"
                            className={`user-inputs__input ${ priceInputIsInvalid ? "invalid" : priceInputIsValid ? "valid" : "" }`}
                            type="number" 
                            name="deliveryFee" 
                            id="delivery-fee" 
                            value={enteredPrice} 
                            onChange={changePriceInputValueHandler} 
                            onBlur={blurPriceInputHandler}
                        />
                        {
                            priceInputIsInvalid && <p className="error-message">This field is required!</p> 
                        }
                    </div>
                </div>
            </div>
            <div className="user-inputs">
                <div className="user-inputs__container">
                    <button 
                        type="submit" 
                        className="submit-store"
                        disabled={!deliveryFeeIsValid}
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    );

    return (
        <Blaze
            onClick={justCtx.onJustify}
            isExtended={justCtx.isExtended}
            nav={
                <div className={justCtx.isExtended ? "blaze-nav" : "wide-blaze-nav"}>
                    <p> Delivery Fee </p>
                </div>
            }
            main={
                <div className={`blaze-main ${justCtx.isExtended ? "" : "wide"}`}>
                    <div className="store-info-box info-box-margin">
                        {
                            (!priceIsGiven)
                            ? (deliveryFeeField) 
                            : (
                                (wantToEdit)
                                ? (deliveryFeeField)
                                : (
                                    <React.Fragment>
                                        <div className="user-inputs">
                                            <div className="user-inputs__container">
                                                <p className="label delivery-fee__text"> Price </p>
                                                <div>
                                                    <p className="user-inputs__input delivery-fee__price"> { `$ ${enteredPrice}` } </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="user-inputs">
                                            <div className="user-inputs__container">
                                                <button 
                                                    type="button" 
                                                    className="submit-store"
                                                    onClick={editPriceHandler}
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )
                            )
                        }
                    </div>
                </div>
            }
        />
    );
};

export default DeliveryFee;