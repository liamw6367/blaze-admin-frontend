import React, { useContext, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useUpdatingDataValidation } from '../hooks/use-validation';
import JustifyContext from '../Contexts/JustifyingContext';
import Blaze from '../Pages/Blaze';
import BannerButton from '../Buttons/BannerButton';
import axios from "axios";

const EditBanner = () => {
    const { id } = useParams();
    const justCtx = useContext(JustifyContext);
    const history = useHistory();

    const [targetBanner, setTargetBanner] = useState({});
    const [bannerIsActive, setBannerIsActive] = useState(false);
    const [banner, setBanner] = useState(null);
    const [bannerUrlObj, setBannerUrlObj] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/banners/get-one?id=${id}`)
            .then((res) => {
                setIsLoading(false);
                setTargetBanner(res.data);
                setBanner(res.data.image);
                setBannerIsActive(res.data.is_active);
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err.message, "mmessage");
            });
        console.log(id,"id");
    }, [id]);

    const {
        enteredValue: enteredBannerName,
        inputIsValid: bannerNameInputIsValid,
        inputIsInvalid: bannerNameInputIsInvalid,
        changeInputValueHandler: changeBannerNameInputValueHandler,
        blurInputHandler: blurBannerNameInputHandler,
    } = useUpdatingDataValidation( targetBanner.name, (value) => value?.trim() !== "" );
    const {
        enteredValue: enteredPosition,
        inputIsValid: positionInputIsValid,
        inputIsInvalid: positionInputIsInvalid,
        changeInputValueHandler: changePositionInputValueHandler,
        blurInputHandler: blurPositionInputHandler,
    } = useUpdatingDataValidation( targetBanner.position, (value) => value?.toString().trim() !== "" );

    const [bannerIsBeingChanged, setBannerIsBeingChanged] = useState(false);

    const addBannerHandler = (banner, urlObj, isBeingChanged) => {
        setBanner(banner);
        setBannerUrlObj(urlObj);
        setBannerIsBeingChanged(isBeingChanged);
    };
    const updatedBannerDataFormIsValid = bannerNameInputIsValid && positionInputIsValid && banner;

    const updatedBannerDataHandler = (event) => {
        event.preventDefault();

        const updatedBannerData = {
            id: targetBanner.id,
            name: enteredBannerName,
            image: bannerUrlObj?.name || banner,
            position: enteredPosition,
            is_active: +bannerIsActive,
        };

        const formData = new FormData();
        for (let key in updatedBannerData) {
            formData.append(key, updatedBannerData[key]);
        }
        if(bannerUrlObj) {
            formData.append('banner_file', bannerUrlObj, bannerUrlObj.name);
        }
        for (let value of formData.values()) {
            console.log(value);
        }
        console.log(updatedBannerData);
        axios.put(`${process.env.REACT_APP_API_URL}/banners/update`, formData).then((res) => {
            console.log(res);
            history.push('/admin/banners');
        }).catch((err) => {
            console.log(err);
        });
    };

    if(isLoading) {
        return (
            <div>
                <p> LOADING..... </p>
            </div>
        );
    }

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
                                        { banner && (
                                            <div className="banner">
                                                <img
                                                    src={ bannerIsBeingChanged ? `${banner}` : `${process.env.REACT_APP_API_URL}/uploads/banners/${banner}`}
                                                    alt="banner"
                                                    className="banner"
                                                />
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