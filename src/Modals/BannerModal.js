import React, { useState } from 'react';
import reactDom from 'react-dom';

const Backdrop = (props) => {
    return  (
        <div 
            className="file-backdrop animate__animated animate__fadeIn" 
            onClick={props.onClick} 
        />
    );
};

const BannerModalContainer = (props) => {
    const [selectedPicture, setSelectedPicture] = useState(null);
    const [imgData, setImgData] = useState(null);

    const imageChangeHandler = (event) => {
        if(event.target.files[0]) {
            setSelectedPicture(event.target.files[0]);
            console.log(selectedPicture);
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImgData(reader.result);
            });
            reader.readAsDataURL(event.target.files[0]);
        }
    };
    const bannerPutHandler = (banner) => {
        props.onTrigger(banner);
        props.onClick();
    };

    return ( 
        <div className="file-modal banner-modal animate__animated animate__backInDown">
            <p className="file-modal__closer" onClick={props.onClick}>&times;</p>
            <div className="tumbnail-area banner-area">
                <img src={imgData} alt="" />
            </div>
            <label htmlFor="categoryTumbnail">Crop Thumbnail</label>
            <input type="file" name="" id="categoryTumbnail" accept="image/*jpg,png,bitmap" onChange={imageChangeHandler} />
            <button type="button" className="submit-image-button" onClick={() => bannerPutHandler(imgData)}>Done</button>
        </div>
    );
};
const BannerModal = (props) => {
    const rootForModals = document.getElementById("file-modals");
    const triggerHandler = (banner) => {
        props.onTrigger(banner);
    };

    return (
        <React.Fragment>
            { reactDom.createPortal(<Backdrop onClick={props.onClick} />, rootForModals) }
            { reactDom.createPortal(
                <BannerModalContainer 
                    onClick={props.onClick}
                    onTrigger={triggerHandler}
                />, rootForModals
            ) }
        </React.Fragment>
    );
}

export default BannerModal;



