import React, { useState } from 'react';
import uploadFileIcon from '../assets/icons/main/uploadimage-icon.png';
import BannerModal from '../Modals/BannerModal';

const BannerButton = (props) => {
    const [fileModalIsOpen, setFileModalIsOpen] = useState(false);
    const [img, setImg] = useState(null);

    const openFileModalHandler = () => {
        setFileModalIsOpen(true);
    };
    const closeFileModalHandler = () => {
        setFileModalIsOpen(false);
    };
    const triggerBannerHandler = (banner, urlObj) => {
        setImg(banner, urlObj);
        if(banner) {
            props.onAdd(banner, urlObj);
        }
    };

    return (
        <React.Fragment>
            { fileModalIsOpen && <BannerModal onClick={closeFileModalHandler} onTrigger={triggerBannerHandler} /> }
            <button type="button" className="upload-file-button" onClick={openFileModalHandler}> <img src={uploadFileIcon} alt="upload file" /> </button>
        </React.Fragment>
    );
};

export default BannerButton;