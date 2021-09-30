import React, { useState } from 'react';
import reactDom from 'react-dom';
import './TumbnailModal.css';


const Backdrop = (props) => {
    return (
        <div 
            className="file-backdrop animate__animated animate__fadeIn" 
            onClick={props.onClick} 
        />
    );
};

const TumbnailModalContainer = (props) => {
    const [selectedPicture, setSelectedPicture] = useState(null);
    const [imgData, setImgData] = useState(null);
    const [imageError, setImageError] = useState("");
    const [thumbnailIsBeingChanged, setThumbnailIsBeingChanged] = useState(false);

    const errorMessage = "Please upload only image files consisting of jpg, png, bitmap file formats and greater resolution than 150x150";

    const _URL = window.URL || window.webkitURL;

    const imageChangeHandler = (event) => {
        const img = new Image();
        const file = event.target.files[0];
        const file_type = file.type;
        const fileTypeIsAcceptable = file_type === "image/png" || file_type === "image/jpeg" || file_type === "image/bmp";

        if(file) {
            setSelectedPicture(file);
            const objectUrl = _URL.createObjectURL(file);
            img.onload = function () {
                if(this.width < 150 && this.height < 150 || this.height < 150 || this.width < 150 || !fileTypeIsAcceptable) {
                    setImageError(errorMessage);
                    setImgData(null);
                    console.log(fileTypeIsAcceptable);
                    console.log(file.type);
                } else {
                    const reader = new FileReader();
                    reader.addEventListener("load", (e) => {
                        console.log(reader.offsetHeight, 'size');
                        setImgData(reader.result);
                    });
                    reader.readAsDataURL(event.target.files[0]);
                    setThumbnailIsBeingChanged(true);
                    setImageError("");
                    console.log(file.type);
                };
                _URL.revokeObjectURL(objectUrl);
            };
            img.src = objectUrl;
        }
    };
    const tumbnailPutHandler = (tumbNail, urlObj) => {
        props.onTrigger(tumbNail, urlObj, thumbnailIsBeingChanged);
        props.onClick();
    };

    return (
        <div className="file-modal animate__animated animate__backInDown">
            <p className="file-modal__closer" onClick={props.onClick}>&times;</p>
            <div className="tumbnail-area">
                <img src={imgData} alt="" />
            </div>
            <label htmlFor="categoryTumbnail">Browse Thumbnail</label>
            <input
                type="file"
                name=""
                id="categoryTumbnail"
                accept="image/*"
                onChange={imageChangeHandler}
                />
            { imageError && <p className="error-message"> { errorMessage } </p> }
            <button
                type="button"
                className="submit-image-button"
                onClick={() => tumbnailPutHandler(imgData, selectedPicture)}
                >
                    Done
            </button>
        </div>
    );
};
const TumbnailModal = (props) => {
    const rootForModals = document.getElementById("file-modals");
    const triggerHandler = (tumbnail, urlObj, isBeingChanged) => {
        props.onTrigger(tumbnail, urlObj, isBeingChanged);
    };

    return (
        <React.Fragment>
            { reactDom.createPortal(<Backdrop onClick={props.onClick} />, rootForModals) }
            { reactDom.createPortal(
                <TumbnailModalContainer 
                    onClick={props.onClick}
                    onTrigger={triggerHandler}
                />, rootForModals
            ) }
        </React.Fragment>
    );
}

export default TumbnailModal;



