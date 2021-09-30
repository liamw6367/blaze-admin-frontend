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
    const [imageError, setImageError] = useState("");
    const [bannerIsBeingChanged, setBannerIsBeingChanged] = useState(false);

    const errorMessage = "Please upload only image files consisting of jpg, png, bitmap file formats and greater resolution than 1024x512";

    const _URL = window.URL || window.webkitURL;

    const imageChangeHandler = (event) => {
        const img = new Image();
        const file = event.target.files[0];
        const file_type = file.type;
        const fileTypeIsAcceptable = file_type === "image/png" || file_type === "image/jpeg" || file_type === "image/bitmap";

        if(file) {
            setSelectedPicture(file);
            const objectUrl = _URL.createObjectURL(file);
            img.onload = function () {
                if (this.width < 1024 && this.height < 512 || this.height < 512 || this.width < 1024 || !fileTypeIsAcceptable) {
                    setImageError(errorMessage);
                    setImgData(null);
                } else {
                    const reader = new FileReader();
                    reader.addEventListener("load", (e) => {
                        console.log(reader.offsetHeight, 'size');
                        setImgData(reader.result);
                    });
                    reader.readAsDataURL(event.target.files[0]);
                    setBannerIsBeingChanged(true);
                    setImageError("");
                };
                _URL.revokeObjectURL(objectUrl);
            };
            img.src = objectUrl;
        }
    };
    const bannerPutHandler = (banner) => {
        props.onTrigger(banner, selectedPicture, bannerIsBeingChanged);
        props.onClick();
    };

    return ( 
        <div className="file-modal banner-modal animate__animated animate__backInDown">
            <p className="file-modal__closer" onClick={props.onClick}>&times;</p>
            <div className="tumbnail-area banner-area">
                <img src={imgData} alt="" />
            </div>
            <label htmlFor="categoryTumbnail">Browse Banner</label>
            <input type="file" name="" id="categoryTumbnail" accept="image/*" onChange={imageChangeHandler} />
            { imageError && <p className="error-message"> { errorMessage } </p> }
            <button type="button" className="submit-image-button" onClick={() => bannerPutHandler(imgData)}>Done</button>
        </div>
    );
};
const BannerModal = (props) => {
    const rootForModals = document.getElementById("file-modals");
    const triggerHandler = (banner, urlObj, isBeingChanged) => {
        props.onTrigger(banner, urlObj, isBeingChanged);
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



