import React, { useContext, useState, useEffect} from 'react';
import JustifyContext from '../Contexts/JustifyingContext';
import { useDataValidation } from '../hooks/use-validation';
import axios from 'axios';
import Blaze from './Blaze';

const DeliveryFee = () => {
    const justCtx = useContext(JustifyContext);

    const {
        price,
        id
    } = justCtx.deliveryFeeData;

    const [priceIsGiven, setPriceIsGiven] = useState(price ? true : false);
    const [wantToEdit, setWantToEdit] = useState(false);

    console.log(price);
     
    const isNotEmpty = value => {
        return value && value.toString().trim() !== "";
    }

    const {
        enteredValue: enteredPrice,
        inputIsValid: priceInputIsValid,
        inputIsInvalid: priceInputIsInvalid,
        changeInputValueHandler: changePriceInputValueHandler,
        blurInputHandler: blurPriceInputHandler,
    } = useDataValidation(isNotEmpty, price);

    const deliveryFeeIsValid = priceInputIsValid;

    const deliveryFeeHandler = (event) => {
        event.preventDefault();
        axios
            .put(`${process.env.REACT_APP_API_URL}/delivery-fee/update`, {
                'price': enteredPrice,
                id
            })
            .then((res) => {
              console.log(res.data);
              const deliveryFeeData = {
                price: res.data.price
            };
            console.log(deliveryFeeData, "deliverydata!!!!!");
            justCtx.passDeliveryFeeData(deliveryFeeData);
            })
            .catch((err) => {
              console.log(err); 
            }
        );
        const currentDeliveryFee = enteredPrice;
        console.log(currentDeliveryFee);
        setPriceIsGiven(true);
        setWantToEdit(false);
    };

    console.log(enteredPrice);

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