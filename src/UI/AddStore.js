import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './AddStore.css';
import JustifyContext from '../Contexts/JustifyingContext';
import Blaze from '../Pages/Blaze';
import { useDataValidation } from '../hooks/use-validation';
import GoogleMapModal from '../Modals/GoogleMapModal';

const AddStore = (props) => {
    const justCtx = useContext(JustifyContext);

    const history = useHistory();

    const {
        enteredValue: enteredName,
        inputIsValid: nameInputIsValid,
        inputIsInvalid: nameInputIsInvalid,
        changeInputValueHandler: changeNameInputValueHandler,
        blurInputHandler: blurNameInputHandler,
        resetInputValueHandler: resetNameInputValueHandler,
    } = useDataValidation( value => value.trim() !== "" ); 
    const {
        enteredValue: enteredArea,
        inputIsValid: areaInputIsValid,
        inputIsInvalid: areaInputIsInvalid,
        changeInputValueHandler: changeAreaInputValueHandler,
        blurInputHandler: blurAreaInputHandler,
        resetInputValueHandler: resetAreaInputValueHandler,
    } = useDataValidation( value => value.trim() !== "" );
    const {
        enteredValue: enteredDeliveryRadius,
        inputIsValid: deliveryRadiusInputIsValid,
        inputIsInvalid: deliveryRadiusInputIsInvalid,
        changeInputValueHandler: changeDeliveryRadiusInputValueHandler,
        blurInputHandler: blurDeliveryRadiusInputHandler,
        resetInputValueHandler: resetDeliveryRadiusInputValueHandler,
    } = useDataValidation( value => value.trim() !== "" );
    const {
        enteredValue: enteredStoreTiming,
        inputIsValid: storeTimingInputIsValid,
        inputIsInvalid: storeTimingInputIsInvalid,
        changeInputValueHandler: changeStoreTimingInputValueHandler,
        blurInputHandler: blurStoreTimingInputHandler,
        resetInputValueHandler: resetStoreTimingInputValueHandler,
    } = useDataValidation( value => value.trim() !== "" );
    const {
        enteredValue: enteredBlazePersonName,
        inputIsValid: blazePersonNameInputIsValid,
        inputIsInvalid: blazePersonNameInputIsInvalid,
        changeInputValueHandler: changeBlazePersonNameInputValueHandler,
        blurInputHandler: blurBlazePersonNameInputHandler,
        resetInputValueHandler: resetBlazePersonNameInputValueHandler,
    } = useDataValidation( value => value.trim() !== "" );
    const {
        enteredValue: enteredStoreEmailId,
        inputIsValid: storeEmailIdInputIsValid,
        inputIsInvalid: storeEmailIdInputIsInvalid,
        changeInputValueHandler: changeStoreEmailIdInputValueHandler,
        blurInputHandler: blurStoreEmailIdInputHandler,
        resetInputValueHandler: resetStoreEmailIdInputValueHandler,
    } = useDataValidation( value => value.trim() !== "" );
    const {
        enteredValue: enteredPassword,
        inputIsValid: passwordInputIsValid,
        inputIsInvalid: passwordInputIsInvalid,
        changeInputValueHandler: changePasswordInputValueHandler,
        blurInputHandler: blurPasswordInputHandler,
        resetInputValueHandler: resetPasswordInputValueHandler,
    } = useDataValidation( value => value.trim() !== "" );

    const [latitude, setLatitude] = useState(""); 
    const [longitude, setLongitude] = useState(""); 

    const latitudeInputIsValid = latitude.toString().trim() !== "";
    const longitudeInputIsValid = longitude.toString().trim() !== "";
    

    const passCurrPositionHandler = (position) => {
        setLatitude(position.lat);
        setLongitude(position.lng);
        console.log(position, "position");
    };

    const [enteredContactPersonName, setEnteredContactPersonName] = useState("");
    const [enteredContactNumber, setEnteredContactNumber] = useState("");
    const [enteredBlazePersonNumber, setEnteredBlazePersonNumber] = useState("");
    const [enteredAddress, setEnteredAddress] = useState("");
    const [isActive, setIsActive] = useState(false);

    const [googleMapModalIsOpen, setGoogleMapModalIsOpen] = useState(false);

    const openGoogleMapModal = () => {
        setGoogleMapModalIsOpen(true);
    };
    const closeGoogleMapModal = () => {
        setGoogleMapModalIsOpen(false);
    };

    const contactPersonNameInputIsNotEmpty = enteredContactPersonName.trim() !== ""; 
    const contactNumberInputIsNotEmpty = enteredContactNumber.trim() !== "";
    const blazePersonNumberIsNotEmpty = enteredBlazePersonNumber.trim() !== "";
    const addressInputIsNotEmpty = enteredAddress.trim() !== "";
    
    const storeDataFormIsValid = nameInputIsValid && areaInputIsValid && latitudeInputIsValid && longitudeInputIsValid && deliveryRadiusInputIsValid && storeTimingInputIsValid && blazePersonNameInputIsValid && storeEmailIdInputIsValid && passwordInputIsValid;

    const storeDataHandler = (event) => {
        event.preventDefault();
        const storeData = {
            name: enteredName,
            area: enteredArea,
            latitude: latitude,
            longitude: longitude,
            deliveryRadius: enteredDeliveryRadius,
            storeTiming: enteredStoreTiming,
            contactPersonName: enteredContactPersonName,
            contactNumber: enteredContactNumber,
            blazePersonName: enteredBlazePersonName,
            blazePersonNumber: enteredBlazePersonNumber,
            address: enteredAddress,
            storeEmailId: enteredStoreEmailId,
            password: enteredPassword,
            isActive,
        };
        props.triggerStoreData(storeData);
        console.log(storeData);
        resetNameInputValueHandler();
        resetAreaInputValueHandler();
        setLatitude("");
        setLongitude("");
        resetDeliveryRadiusInputValueHandler();
        resetStoreTimingInputValueHandler();
        resetBlazePersonNameInputValueHandler();
        resetStoreEmailIdInputValueHandler();
        resetPasswordInputValueHandler();
        setEnteredContactPersonName("");
        setEnteredContactNumber("");
        setEnteredBlazePersonNumber("");
        setEnteredAddress("");
        setIsActive(false);

        history.push('./Stores');
    };

    return (
        <Blaze
            onClick={justCtx.onJustify}
            isExtended={justCtx.isExtended}
            nav={
                <div className={justCtx.isExtended ? "blaze-nav border" : "wide-blaze-nav border"}>
                    <Link to="/Stores"><p>Stores/</p></Link> 
                    <Link to="/AddStore"><p className="text-color">Add Store</p></Link> 
                </div> 
            }
            main={
                <div className={`blaze-main ${justCtx.isExtended ? "" : "wide"}`}>
                    <div className="store-info-box info-box-margin">
                        <form action="#" name="" id="" onSubmit={storeDataHandler}>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <label htmlFor="store-name" className="label">Store Name *</label>
                                    <div>
                                        <input 
                                            className={`user-inputs__input ${ nameInputIsInvalid ? "invalid" : nameInputIsValid ? "valid" : "" }`}
                                            type="text" 
                                            name="" 
                                            id="store-name" 
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
                                    <label htmlFor="store-area" className="label">Store Area *</label>
                                    <div>
                                        <input 
                                            className={`user-inputs__input ${ areaInputIsInvalid ? "invalid" : areaInputIsValid ? "valid" : "" }`}
                                            type="text" 
                                            name="" 
                                            id="store-area" 
                                            value={enteredArea} 
                                            onChange={changeAreaInputValueHandler}
                                            onBlur={blurAreaInputHandler}                                    
                                        />
                                        {
                                            areaInputIsInvalid && <p className="error-message">This field is required!</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="user-inputs latitude-div">
                                <div className="user-inputs__container">
                                    <label htmlFor="latitude" className="label">Latitude *</label>
                                    <div>
                                        <input 
                                            className={`user-inputs__input latitude-input`}
                                            type="text" 
                                            name="" 
                                            id="latitude" 
                                            value={latitude} 
                                            disabled
                                        />
                                    </div>    
                                    <button 
                                        type="button" 
                                        className="view-map-btn"
                                        onClick={openGoogleMapModal}
                                    >
                                        View Map
                                    </button>
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <label htmlFor="longitude" className="label">Longitude *</label>
                                    <div>
                                        <input 
                                            className={`user-inputs__input longitude-input`}
                                            type="text" 
                                            name="" 
                                            id="longitude" 
                                            value={longitude} 
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <label htmlFor="delivery-radius" className="label">Delivery Radius *</label>
                                    <div>
                                        <input 
                                            className={`user-inputs__input ${ deliveryRadiusInputIsInvalid ? "invalid" : deliveryRadiusInputIsValid ? "valid" : "" }`}
                                            type="number" 
                                            name="" 
                                            id="delivery-radius" 
                                            value={enteredDeliveryRadius} 
                                            onChange={changeDeliveryRadiusInputValueHandler} 
                                            onBlur={blurDeliveryRadiusInputHandler}
                                        />
                                        {
                                            deliveryRadiusInputIsInvalid && <p className="error-message">This field is required!</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <label htmlFor="store-timing" className="label">Store Timing *</label>
                                    <div>
                                        <input 
                                            className={`user-inputs__input ${ storeTimingInputIsInvalid ? "invalid" : storeTimingInputIsValid ? "valid" : "" }`}
                                            type="text" 
                                            name="" 
                                            id="store-timing" 
                                            value={enteredStoreTiming} 
                                            onChange={changeStoreTimingInputValueHandler} 
                                            onBlur={blurStoreTimingInputHandler}
                                        />
                                        {
                                            storeTimingInputIsInvalid && <p className="error-message">This field is required!</p> 
                                        }
                                    </div> 
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <label htmlFor="contact-person-name" className="label">Contact Person Name</label>
                                    <input 
                                        className={ `user-inputs__input ${ contactPersonNameInputIsNotEmpty && "valid" }` }
                                        type="text" 
                                        name="" 
                                        id="contact-person-name" 
                                        value={enteredContactPersonName} 
                                        onChange={ (event) => setEnteredContactPersonName(event.target.value) } 
                                    />
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <label htmlFor="contact-number" className="label">Contact Number</label>
                                    <input 
                                        className={ `user-inputs__input ${ contactNumberInputIsNotEmpty && "valid" }` }
                                        type="text" 
                                        name="" 
                                        id="contact-number" 
                                        value={enteredContactNumber} 
                                        onChange={ (event) => setEnteredContactNumber(event.target.value) } 
                                    />
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <label htmlFor="blaze-person-name" className="label">Blaze Person Name *</label>
                                    <div>
                                        <input 
                                            className={`user-inputs__input ${ blazePersonNameInputIsInvalid ? "invalid" : blazePersonNameInputIsValid ? "valid" : "" }`}
                                            type="text" 
                                            name="" 
                                            id="blaze-person-name" 
                                            value={enteredBlazePersonName} 
                                            onChange={changeBlazePersonNameInputValueHandler} 
                                            onBlur={blurBlazePersonNameInputHandler}
                                        />
                                        {
                                            blazePersonNameInputIsInvalid && <p className="error-message">This field is required!</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <label htmlFor="blaze-person-number" className="label">Blaze Person Number</label>
                                    <input 
                                        className={ `user-inputs__input ${ blazePersonNumberIsNotEmpty && "valid" }` }
                                        type="text" 
                                        name="" 
                                        id="blaze-person-number" 
                                        value={enteredBlazePersonNumber} 
                                        onChange={ (event) => setEnteredBlazePersonNumber(event.target.value) } 
                                    />
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <label htmlFor="address" className="address-label label">Address</label>
                                    <textarea 
                                        className={ `user-inputs__input address-input ${ addressInputIsNotEmpty ? "valid" : "" }` }
                                        name="" 
                                        id="address" 
                                        value={enteredAddress} 
                                        onChange={ (event) => setEnteredAddress(event.target.value) } 
                                    />
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <label htmlFor="store-email-id" className="label">Store Email id *</label>
                                    <div>
                                        <input 
                                            className={`user-inputs__input ${ storeEmailIdInputIsInvalid ? "invalid" : storeEmailIdInputIsValid ? "valid" : "" }`}
                                            type="email" 
                                            name="" 
                                            id="store-email-id" 
                                            value={enteredStoreEmailId} 
                                            onChange={changeStoreEmailIdInputValueHandler} 
                                            onBlur={blurStoreEmailIdInputHandler}
                                        />
                                        {
                                            storeEmailIdInputIsInvalid && <p className="error-message">This field is required!</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <label htmlFor="password" className="label">Password *</label>
                                    <div>
                                        <input
                                            className={`user-inputs__input ${ passwordInputIsInvalid ? "invalid" : passwordInputIsValid ? "valid" : "" }`}
                                            type="password" 
                                            name="" 
                                            id="password" 
                                            value={enteredPassword} 
                                            onChange={changePasswordInputValueHandler} 
                                            onBlur={blurPasswordInputHandler}
                                        />
                                        {
                                            passwordInputIsInvalid && <p className="error-message">This field is required!</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="checkbox-container">
                                    <div className="active-inactive__checkbox">
                                        <label htmlFor="active" className="active-inactive-label label">Active</label>
                                        <input 
                                            type="checkbox" 
                                            name="" 
                                            id="active" 
                                            className="active-inactive-input" 
                                            onChange={ (event) => setIsActive(event.target.checked) }
                                            checked={isActive}
                                        />
                                    </div>
                                    <button 
                                        type="submit" 
                                        className="submit-store"
                                        disabled={!storeDataFormIsValid}    
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    {
                        googleMapModalIsOpen && <GoogleMapModal onClick={closeGoogleMapModal} onPass={passCurrPositionHandler} />
                    }
                </div>
            }
        />
    );
};

export default AddStore;