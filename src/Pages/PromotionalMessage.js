import React, { useContext, useState } from 'react';
import JustifyContext from '../Contexts/JustifyingContext';
import Blaze from './Blaze';
import BannerButton from '../Buttons/BannerButton';
import TumbnailButton from '../Buttons/TumbnailButton';

const PromotionalMessage = () => {
    const justCtx = useContext(JustifyContext);
    
    const [enteredPromotionalMessage, setEnteredPromotionalMessage] = useState("");
    const [promotionalTumbnail, setPromotionalTumbnail] = useState(null);
    const [promotionalBanner, setPromotionalBanner] = useState(null);
    const [tumbnailAreaIsOpen, setTumbnailAreaIsOpen] = useState(false);
    const [bannerAreaIsOpen, setBannerAreaIsOpen] = useState(false);

    const addTumbNailHandler = (tumbnail) => {
        setPromotionalTumbnail(tumbnail);
        setTumbnailAreaIsOpen(true);
    };
    const addBannerHandler = (banner) => {
        setPromotionalBanner(banner);
        setBannerAreaIsOpen(true);
    };

    const promotionalMessageInputIsValid = enteredPromotionalMessage.trim() !== "";
    const promotionalNotificationIsValid = promotionalMessageInputIsValid && promotionalTumbnail && promotionalBanner;

    const promotionalNotificationHandler = (event) => {
        event.preventDefault();
        const promotionalNotificationData = {
            id: Math.random().toString(),
            promotionalMessage: enteredPromotionalMessage,
            promotionalTumbnail: promotionalTumbnail,
            promotionalBanner: promotionalBanner,
        }
        console.log(promotionalNotificationData);

        setEnteredPromotionalMessage("");
        setPromotionalTumbnail(null);
        setPromotionalBanner(null);
        setTumbnailAreaIsOpen(false);
        setBannerAreaIsOpen(false);
    };

    return (
        <Blaze
            onClick={justCtx.onJustify}
            isExtended={justCtx.isExtended}
            nav={
                <div className={justCtx.isExtended ? "blaze-nav" : "wide-blaze-nav"}>
                    <p>Send Promotional Notification</p>
                </div>
            }
            main={
                <div className={`blaze-main ${justCtx.isExtended ? "" : "wide"}`}>
                    <div className="store-info-box info-box-margin">
                        <form action="#" name="" id="" onSubmit={promotionalNotificationHandler}>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <label htmlFor="promotionalMessage" className="address-label label">Message *</label>
                                    <textarea 
                                        className="user-inputs__input address-input"
                                        name="" 
                                        id="promotionalMessage" 
                                        value={enteredPromotionalMessage} 
                                        onChange={ (event) => setEnteredPromotionalMessage(event.target.value) }
                                    />
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <p className="user-inputs__title">Thumbnail *</p>
                                    <div className="tumbnail-box">
                                        <p className="explanation-text">
                                            Please upload only image files consisting of jpg, png, bitmap file formats and greater resolution than 150x150
                                        </p>
                                        { tumbnailAreaIsOpen && (
                                            <div className="tumbnail">
                                                <img 
                                                    src={promotionalTumbnail} 
                                                    alt="notification tumbnail" />    
                                            </div>
                                        ) }
                                    </div>
                                    
                                    <TumbnailButton onAdd={addTumbNailHandler} />
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <p className="user-inputs__title">Banner *</p>
                                    <div className="banner-box">
                                        <p className="explanation-text">
                                            Please upload only image files consisting of jpg, png, bitmap file formats and greater resolution than 1024x512
                                        </p>
                                        { bannerAreaIsOpen && (
                                            <div className="banner">
                                                <img 
                                                    src={promotionalBanner} 
                                                    alt="notification banner" 
                                                    className="banner" />
                                            </div>
                                        ) }
                                    </div>
                                    <BannerButton onAdd={addBannerHandler} />
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <button 
                                        type="submit" 
                                        className="submit-store"
                                        disabled={!promotionalNotificationIsValid}
                                    >
                                        Send
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

export default PromotionalMessage;