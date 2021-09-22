import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import JustifyContext from '../Contexts/JustifyingContext';
import Blaze from '../Pages/Blaze';
import BannerButton from '../Buttons/BannerButton';
import { useDataValidation } from '../hooks/use-validation';
import axios from "axios";


const AddBanner = () => {
    const justCtx = useContext(JustifyContext);

    const history = useHistory();

    const {
        enteredValue: enteredBannerName,
        inputIsValid: bannerNameInputIsValid,
        inputIsInvalid: bannerNameInputIsInvalid,
        changeInputValueHandler: changeBannerNameInputValueHandler,
        blurInputHandler: blurBannerNameInputHandler,
    } = useDataValidation( value => value.trim() !== "" );
    const {
        enteredValue: enteredPosition,
        inputIsValid: positionInputIsValid,
        inputIsInvalid: positionInputIsInvalid,
        changeInputValueHandler: changePositionInputValueHandler,
        blurInputHandler: blurPositionInputHandler,
    } = useDataValidation( value => value.trim() !== "" );

    const [banner, setBanner] = useState(null);
    const [bannerIsActive, setBannerIsActive] = useState(false);
    const [bannerUrlObj, setBannerUrlObj] = useState(null);

    const addBannerHandler = (banner, urlObj) => {
        setBanner(banner);
        setBannerUrlObj(urlObj);
    };

    const bannerDataFormIsValid = bannerNameInputIsValid && positionInputIsValid && banner;

    const bannerDataHandler = (event) => {
        event.preventDefault();
        const bannerData = {
            name: enteredBannerName,
            image: bannerUrlObj.name,
            position: enteredPosition,
            is_active: +bannerIsActive,
        };
        // axios.post(`${process.env.REACT_APP_API_URL}/banners/add`, {
        //     ...bannerData
        // }).then((res) => {
        //     console.log(res);
        //     history.push('/admin/banners');
        // }).catch((err) => {
        //     console.log(err);
        // });
        const formData = new FormData();
        for (let key in bannerData) {
            formData.append(key, bannerData[key]);
        }
        formData.append('banner_file', bannerUrlObj, bannerUrlObj.name);
        for (let value of formData.values()) {
            console.log(value);
        }
        console.log(bannerData);
        axios.post(`${process.env.REACT_APP_API_URL}/banners/add`, formData).then((res) => {
            console.log(res);
            history.push('/admin/banners');
        }).catch((err) => {
            console.log(err);
        });
    };

    return (
        <Blaze
            onClick={justCtx.onJustify}
            isExtended={justCtx.isExtended}
            nav={
                <div className={justCtx.isExtended ? "blaze-nav border" : "wide-blaze-nav border"}>
                    <Link to="/admin/banners"><p>Banners/</p></Link> 
                    <Link to="/admin/add-banner"><p className="text-color">Add Banner</p></Link> 
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
                                        { banner && (
                                            <div className="banner">
                                                <img src={ banner } alt="banner" className="banner" />
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
