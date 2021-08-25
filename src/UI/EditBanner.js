import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useUpdatingDataValidation } from '../hooks/use-validation';
import JustifyContext from '../Contexts/JustifyingContext';
import Blaze from '../Pages/Blaze';
import BannerButton from '../Buttons/BannerButton';

const EditBanner = (props) => {
    const { targetBanner } = props;

    const justCtx = useContext(JustifyContext);

    const history = useHistory();

    const {
        enteredValue: enteredBannerName,
        inputIsValid: bannerNameInputIsValid,
        inputIsInvalid: bannerNameInputIsInvalid,
        changeInputValueHandler: changeBannerNameInputValueHandler,
        blurInputHandler: blurBannerNameInputHandler,
    } = useUpdatingDataValidation( targetBanner.bannerName, (value) => value.trim() !== "" );
    const {
        enteredValue: enteredPosition,
        inputIsValid: positionInputIsValid,
        inputIsInvalid: positionInputIsInvalid,
        changeInputValueHandler: changePositionInputValueHandler,
        blurInputHandler: blurPositionInputHandler,
    } = useUpdatingDataValidation( targetBanner.position, (value) => value.trim() !== "" );
    
    const [bannerIsActive, setBannerIsActive] = useState(targetBanner.bannerIsActive);
    const [banner, setBanner] = useState(targetBanner.bannerImage);
    const [bannerAreaIsOpen, setBannerAreaIsOpen] = useState(false);    

    useEffect(() => {
        setBannerAreaIsOpen(true);
        console.log("useEffect running in edit banner page");
    }, []);

    const addBannerHandler = (banner) => {
        setBanner(banner);
        setBannerAreaIsOpen(true);
    };
    const updatedBannerDataFormIsValid = bannerNameInputIsValid && positionInputIsValid && banner;

    const updatedBannerDataHandler = (event) => {
        event.preventDefault();
        const updatedBannerData = {
            id: targetBanner.id,
            bannerName: enteredBannerName,
            bannerImage: banner,
            position: enteredPosition,
            bannerIsActive, 
        }
        props.onUpdate(updatedBannerData);

        history.push('/admin/banners');
    };
    
    return (
        <Blaze
            onClick={justCtx.onJustify}
            isExtended={justCtx.isExtended}
            nav={
                <div className={justCtx.isExtended ? "blaze-nav border" : "wide-blaze-nav border"}>
                    <Link to="/admin/banners"><p>Banners/</p></Link> 
                    <Link to="/admin/edit-banner"><p className="text-color">Edit Banner</p></Link> 
                </div> 
            }
            main={
                <div className={`blaze-main ${justCtx.isExtended ? "" : "wide"}`}>
                    <div className="store-info-box info-box-margin">
                        <form action="#" name="" id="" onSubmit={updatedBannerDataHandler}>
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
                                        <label htmlFor="banner-status" className="active-inactive-label">Active</label>
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
                                        disabled={!updatedBannerDataFormIsValid}
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
};

export default EditBanner;