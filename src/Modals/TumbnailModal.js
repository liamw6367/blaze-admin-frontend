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

    const [thumbnailIsBeingChanged, setThumbnailIsBeingChanged] = useState(false);

    const imageChangeHandler = (event) => {
        if(event.target.files[0]) {
            setSelectedPicture(event.target.files[0]);
            // if(event.target.files[0].size < 150150) {
            //     alert("image is small, choose another one!")
            //     return
            // }
            console.log(selectedPicture);
            console.log(event.target.files[0].size)
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImgData(reader.result);
            });
            reader.readAsDataURL(event.target.files[0]);
            setThumbnailIsBeingChanged(true);
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
            <input type="file" name="" id="categoryTumbnail" accept="image/*jpg,png,bitmap" onChange={imageChangeHandler} />
            <button type="button" className="submit-image-button" onClick={() => tumbnailPutHandler(imgData, selectedPicture)}>Done</button>
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



