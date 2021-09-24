import React, {useContext, useState, useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {useUpdatingDataValidation} from '../hooks/use-validation';
import JustifyContext from '../Contexts/JustifyingContext';
import Blaze from '../Pages/Blaze';
import GoogleMapModal from '../Modals/GoogleMapModal';
import axios from 'axios';

const EditStore = () => {
    const { id } = useParams();
    const justCtx = useContext(JustifyContext);
    const [targetStore, setTargetStore] = useState({});
    const [storeEmailIdInputIsBeingChanged, setStoreEmailIdInputIsBeingChanged] = useState(false);
    const [enteredContactPersonName, setEnteredContactPersonName] = useState();
    const [enteredContactNumber, setEnteredContactNumber] = useState();
    const [enteredBlazePersonNumber, setEnteredBlazePersonNumber] = useState();
    const [enteredAddress, setEnteredAddress] = useState();
    const [isActive, setIsActive] = useState(false);
    const [enteredLatitude, setEnteredLatitude] = useState();
    const [enteredLongitude, setEnteredLongitude] = useState();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/stores/get-one?id=${id}`)
            .then((res) => {
                console.log(res.data);
                setTargetStore(res.data);
                setEnteredContactPersonName(res.data.contact_person_name);
                setEnteredContactNumber(res.data.contact_number);
                setEnteredBlazePersonNumber(res.data.blaze_person_number);
                setEnteredAddress(res.data.address);
                setIsActive(res.data.is_active);
                setEnteredLatitude(res.data.latitude);
                setEnteredLongitude(res.data.longitude);
            })
            .catch((err) => {
                console.log(err.message);
            })
    }, []);

    const history = useHistory();

    const {
        enteredValue: enteredName,
        inputIsValid: nameInputIsValid,
        inputIsInvalid: nameInputIsInvalid,
        changeInputValueHandler: changeNameInputValueHandler,
        blurInputHandler: blurNameInputHandler,
    } = useUpdatingDataValidation(targetStore.name, (value) => value?.trim() !== "");
    const {
        enteredValue: enteredArea,
        inputIsValid: areaInputIsValid,
        inputIsInvalid: areaInputIsInvalid,
        changeInputValueHandler: changeAreaInputValueHandler,
        blurInputHandler: blurAreaInputHandler,
    } = useUpdatingDataValidation(targetStore.area, (value) => value?.trim() !== "");
    const {
        enteredValue: enteredDeliveryRadius,
        inputIsValid: deliveryRadiusInputIsValid,
        inputIsInvalid: deliveryRadiusInputIsInvalid,
        changeInputValueHandler: changeDeliveryRadiusInputValueHandler,
        blurInputHandler: blurDeliveryRadiusInputHandler,
    } = useUpdatingDataValidation(targetStore.delivery_radius, (value) => value?.trim() !== "");
    const {
        enteredValue: enteredStoreTiming,
        inputIsValid: storeTimingInputIsValid,
        inputIsInvalid: storeTimingInputIsInvalid,
        changeInputValueHandler: changeStoreTimingInputValueHandler,
        blurInputHandler: blurStoreTimingInputHandler,
    } = useUpdatingDataValidation(targetStore.store_timing, (value) => value?.trim() !== "");
    const {
        enteredValue: enteredBlazePersonName,
        inputIsValid: blazePersonNameInputIsValid,
        inputIsInvalid: blazePersonNameInputIsInvalid,
        changeInputValueHandler: changeBlazePersonNameInputValueHandler,
        blurInputHandler: blurBlazePersonNameInputHandler,
    } = useUpdatingDataValidation(targetStore.blaze_person_name, (value) => value?.trim() !== "");
    const {
        enteredValue: enteredPassword,
        inputIsValid: passwordInputIsValid,
        inputIsInvalid: passwordInputIsInvalid,
        changeInputValueHandler: changePasswordInputValueHandler,
        blurInputHandler: blurPasswordInputHandler,
    } = useUpdatingDataValidation(targetStore.password, (value) => value?.trim() !== "");

    const [googleMapModalIsOpen, setGoogleMapModalIsOpen] = useState(false);

    const openGoogleMapModal = () => {
        setGoogleMapModalIsOpen(true);
    };
    const closeGoogleMapModal = () => {
        setGoogleMapModalIsOpen(false);
    };

    const passCurrPositionHandler = (position) => {
        setEnteredLatitude(position.lat);
        setEnteredLongitude(position.lng);
        console.log(position, "position");
    };

    const contactPersonNameInputIsNotEmpty = enteredContactPersonName?.trim() !== "";
    const contactNumberInputIsNotEmpty = enteredContactNumber?.trim() !== "";
    const blazePersonNumberIsNotEmpty = enteredBlazePersonNumber?.trim() !== "";
    const addressInputIsNotEmpty = enteredAddress?.trim() !== "";

    const updatedStoreDataFormIsValid = nameInputIsValid && areaInputIsValid && deliveryRadiusInputIsValid && storeTimingInputIsValid && blazePersonNameInputIsValid && passwordInputIsValid;

    const updateStoreDataHandler = (event) => {
        event.preventDefault();
        axios.put(
            `${process.env.REACT_APP_API_URL}/stores/update`,
            {
                id: targetStore.id,
                name: enteredName,
                area: enteredArea,
                latitude: enteredLatitude,
                longitude: enteredLongitude,
                delivery_radius: enteredDeliveryRadius,
                store_timing: enteredStoreTiming,
                contact_person_name: enteredContactPersonName,
                contact_number: enteredContactNumber,
                blaze_person_name: enteredBlazePersonName,
                blaze_person_number: enteredBlazePersonNumber,
                address: enteredAddress,
                store_email_id: targetStore.storeEmailId,
                password: enteredPassword,
                is_active: +isActive,
            }
        )
        .then((res) => {
            history.push('/admin/stores');
            console.log(res.data, "response");
        })
        .catch((err) => {
            console.log(err.message, "error message");
        });
    };

    return (
        <Blaze
            onClick={justCtx.onJustify}
            isExtended={justCtx.isExtended}
            nav={
                <div className={justCtx.isExtended ? "blaze-nav border" : "wide-blaze-nav border"}>
                    <Link to="/admin/stores">
                        <p>Stores/</p>
                    </Link>
                    <Link to="/admin/edit-store">
                        <p className="text-color">Edit Store</p>
                    </Link>
                </div>
            }
            main={
                <div className={`blaze-main ${justCtx.isExtended ? "" : "wide"}`}>
                    <div className="store-info-box info-box-margin">
                        <form action="#" name="" id="" className="edit-form" onSubmit={updateStoreDataHandler}>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <label htmlFor="store-name" className="label">Store Name *</label>
                                    <div>
                                        <input
                                            className={`user-inputs__input ${nameInputIsInvalid ? "invalid" : nameInputIsValid ? "valid" : ""}`}
                                            type="text"
                                            name=""
                                            id="store-name"
                                            value={enteredName}
                                            onChange={changeNameInputValueHandler}
                                            onBlur={blurNameInputHandler}
                                        />
                                        {
                                            nameInputIsInvalid &&
                                            <p className="error-message">This field is required!</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <label htmlFor="store-area" className="label">Store Area *</label>
                                    <div>
                                        <input
                                            className={`user-inputs__input ${areaInputIsInvalid ? "invalid" : areaInputIsValid ? "valid" : ""}`}
                                            type="text"
                                            name=""
                                            id="store-area"
                                            value={enteredArea}
                                            onChange={changeAreaInputValueHandler}
                                            onBlur={blurAreaInputHandler}
                                        />
                                        {
                                            areaInputIsInvalid &&
                                            <p className="error-message">This field is required!</p>
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
                                            value={enteredLatitude}
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
                                            value={enteredLongitude}
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
                                            className={`user-inputs__input ${deliveryRadiusInputIsInvalid ? "invalid" : deliveryRadiusInputIsValid ? "valid" : ""}`}
                                            type="number"
                                            name=""
                                            id="delivery-radius"
                                            value={enteredDeliveryRadius}
                                            onChange={changeDeliveryRadiusInputValueHandler}
                                            onBlur={blurDeliveryRadiusInputHandler}
                                        />
                                        {
                                            deliveryRadiusInputIsInvalid &&
                                            <p className="error-message">This field is required!</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <label htmlFor="store-timing" className="label">Store Timing *</label>
                                    <div>
                                        <input
                                            className={`user-inputs__input ${storeTimingInputIsInvalid ? "invalid" : storeTimingInputIsValid ? "valid" : ""}`}
                                            type="text"
                                            name=""
                                            id="store-timing"
                                            value={enteredStoreTiming}
                                            onChange={changeStoreTimingInputValueHandler}
                                            onBlur={blurStoreTimingInputHandler}
                                        />
                                        {
                                            storeTimingInputIsInvalid &&
                                            <p className="error-message">This field is required!</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <label htmlFor="contact-person-name" className="label">Contact Person Name</label>
                                    <input
                                        className={`user-inputs__input ${contactPersonNameInputIsNotEmpty && "valid"}`}
                                        type="text"
                                        name=""
                                        id="contact-person-name"
                                        value={enteredContactPersonName}
                                        onChange={(event) => setEnteredContactPersonName(event.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <label htmlFor="contact-number" className="label">Contact Number</label>
                                    <input
                                        className={`user-inputs__input ${contactNumberInputIsNotEmpty && "valid"}`}
                                        type="text"
                                        name=""
                                        id="contact-number"
                                        value={enteredContactNumber}
                                        onChange={(event) => setEnteredContactNumber(event.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <label htmlFor="blaze-person-name" className="label">Blaze Person Name *</label>
                                    <div>
                                        <input
                                            className={`user-inputs__input ${blazePersonNameInputIsInvalid ? "invalid" : blazePersonNameInputIsValid ? "valid" : ""}`}
                                            type="text"
                                            name=""
                                            id="blaze-person-name"
                                            value={enteredBlazePersonName}
                                            onChange={changeBlazePersonNameInputValueHandler}
                                            onBlur={blurBlazePersonNameInputHandler}
                                        />
                                        {
                                            blazePersonNameInputIsInvalid &&
                                            <p className="error-message">This field is required!</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <label htmlFor="blaze-person-number" className="label">Blaze Person Number</label>
                                    <input
                                        className={`user-inputs__input ${blazePersonNumberIsNotEmpty && "valid"}`}
                                        type="text"
                                        name=""
                                        id="blaze-person-number"
                                        value={enteredBlazePersonNumber}
                                        onChange={(event) => setEnteredBlazePersonNumber(event.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <label htmlFor="address" className="label address-label">Address</label>
                                    <textarea
                                        className={`user-inputs__input address-input ${addressInputIsNotEmpty ? "valid" : ""}`}
                                        name=""
                                        id="address"
                                        value={enteredAddress}
                                        onChange={(event) => setEnteredAddress(event.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <label htmlFor="store-email-id" className="label">Store Email id *</label>
                                    <div>
                                        <input
                                            className="user-inputs__input valid"
                                            type="email"
                                            name=""
                                            id="store-email-id"
                                            value={targetStore.store_email_id}
                                            onChange={() => setStoreEmailIdInputIsBeingChanged(true)}
                                            onBlur={() => setStoreEmailIdInputIsBeingChanged(false)}
                                        />
                                        {
                                            storeEmailIdInputIsBeingChanged &&
                                            <p className="error-message">You can not change the email id!</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <label htmlFor="password" className="label">Password *</label>
                                    <div>
                                        <input
                                            className={`user-inputs__input ${passwordInputIsInvalid ? "invalid" : passwordInputIsValid ? "valid" : ""}`}
                                            type="password"
                                            name=""
                                            id="password"
                                            value={enteredPassword}
                                            onChange={changePasswordInputValueHandler}
                                            onBlur={blurPasswordInputHandler}
                                        />
                                        {
                                            passwordInputIsInvalid &&
                                            <p className="error-message">This field is required!</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="checkbox-container">
                                    <div className="active-inactive__checkbox">
                                        <label htmlFor="active" className="label active-inactive-label">Active</label>
                                        <input
                                            type="checkbox"
                                            name=""
                                            id="active"
                                            className="active-inactive-input"
                                            onChange={(event) => setIsActive(event.target.checked)}
                                            checked={isActive}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="submit-store"
                                        disabled={!updatedStoreDataFormIsValid}
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    {
                        googleMapModalIsOpen &&
                        <GoogleMapModal onClick={closeGoogleMapModal} onPass={passCurrPositionHandler}/>
                    }
                </div>
            }
        />
    );
};

export default EditStore;