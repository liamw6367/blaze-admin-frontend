import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import JustifyContext from '../Contexts/JustifyingContext';
import Blaze from '../Pages/Blaze';
import BannerButton from '../Buttons/BannerButton';
import { useDataValidation } from '../hooks/use-validation';


const AddBanner = (props) => {
    const justCtx = useContext(JustifyContext);

    const history = useHistory();

    const {
        enteredValue: enteredBannerName,
        inputIsValid: bannerNameInputIsValid,
        inputIsInvalid: bannerNameInputIsInvalid,
        changeInputValueHandler: changeBannerNameInputValueHandler,
        blurInputHandler: blurBannerNameInputHandler,
        resetInputValueHandler: resetBannerNameInputValueHandler,
    } = useDataValidation( value => value.trim() !== "" );
    const {
        enteredValue: enteredPosition,
        inputIsValid: positionInputIsValid,
        inputIsInvalid: positionInputIsInvalid,
        changeInputValueHandler: changePositionInputValueHandler,
        blurInputHandler: blurPositionInputHandler,
        resetInputValueHandler: resetPositionInputValueHandler,
    } = useDataValidation( value => value.trim() !== "" );

    const [banner, setBanner] = useState(null);
    const [bannerIsActive, setBannerIsActive] = useState(false);
    const [bannerAreaIsOpen, setBannerAreaIsOpen] = useState(false);    

    const addBannerHandler = (banner) => {
        setBanner(banner);
        setBannerAreaIsOpen(true);
    };

    const bannerDataFormIsValid = bannerNameInputIsValid && positionInputIsValid && banner;

    const bannerDataHandler = (event) => {
        event.preventDefault();

        const bannerData = {
            id: Math.random().toString(),
            bannerName: enteredBannerName,
            bannerImage: banner,
            position: enteredPosition,
            bannerIsActive, 
        }
        props.triggerBannerData(bannerData);

        resetBannerNameInputValueHandler();
        resetPositionInputValueHandler();
        setBanner(null);
        setBannerIsActive(false);
        setBannerAreaIsOpen(false);

        history.push('/Banners');
    };

    return (
        <Blaze
            onClick={justCtx.onJustify}
            isExtended={justCtx.isExtended}
            nav={
                <div className={justCtx.isExtended ? "blaze-nav border" : "wide-blaze-nav border"}>
                    <Link to="/Banners"><p>Banners/</p></Link> 
                    <Link to="/AddBanner"><p className="text-color">Add Banner</p></Link> 
                </div> 
            }
            main={
                <div className={`blaze-main ${justCtx.isExtended ? "" : "wide"}`}>
                    <div className="store-info-box info-box-margin">
                        <form action="#" name="" id="" onSubmit={bannerDataHandler}>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <label htmlFor="banner-name" className="label">Name *</label>
                                    <div>
                                        <input 
                                            className={ `user-inputs__input ${ bannerNameInputIsInvalid ? "invalid" : bannerNameInputIsValid ? "valid" : "" }` }
                                            type="text" 
                                            name="" 
                                            id="banner-name" 
                                            value={enteredBannerName} 
                                            onChange={changeBannerNameInputValueHandler}
                                            onBlur={blurBannerNameInputHandler} 
                                        />
                                        {
                                            bannerNameInputIsInvalid && <p className="error-message">This field is required!</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <p className="user-inputs__title">Image *</p>
                                    <div className="banner-box">
                                        <p className="explanation-text">
                                            Please upload only image files consisting of jpg, png, bitmap file formats and greater resolution than 1024x512
                                        </p>
                                        { bannerAreaIsOpen && (
                                            <div className="banner">
                                                <img src={banner} alt="banner" className="banner" />
                                            </div>
                                        ) }
                                    </div>
                                    <BannerButton onAdd={addBannerHandler} />
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <label htmlFor="banner-position" className="label">Position *</label>
                                    <div>
                                        <input 
                                            className={ `user-inputs__input ${ positionInputIsInvalid ? "invalid" : positionInputIsValid ? "valid" : "" }` }
                                            type="number" 
                                            name="" 
                                            id="banner-position" 
                                            value={enteredPosition} 
                                            onChange={changePositionInputValueHandler}
                                            onBlur={blurPositionInputHandler} 
                                        />
                                        {
                                            positionInputIsInvalid && <p className="error-message">This field is required!</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="checkbox-container">
                                    <div className="active-inactive__checkbox">
                                        <label htmlFor="banner-status" className="active-inactive-label label">Active</label>
                                        <input 
                                            type="checkbox" 
                                            name="" 
                                            id="banner-status" 
                                            className="active-inactive-input" 
                                            checked={bannerIsActive}
                                            onChange={ (event) => setBannerIsActive(event.target.checked) }
                                        />
                                    </div>
                                    <button 
                                        type="submit" 
                                        className="submit-store" 
                                        disabled={!bannerDataFormIsValid}
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

export default AddBanner;
