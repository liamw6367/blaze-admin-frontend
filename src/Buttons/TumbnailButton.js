import React, { useState } from 'react';
import uploadFileIcon from '../assets/icons/main/uploadimage-icon.png';
import TumbnailModal from '../Modals/TumbnailModal';

const TumbnailButton = (props) => {
    const [fileModalIsOpen, setFileModalIsOpen] = useState(false);
    const [img, setImg] = useState(null);

    const openFileModalHandler = () => {
        setFileModalIsOpen(true);
    };
    const closeFileModalHandler = () => {
        setFileModalIsOpen(false);
    };
    const triggerTumbnailHandler = (tumbnail, urlObj) => {
        setImg(tumbnail);
        if(tumbnail) {
            props.onAdd(tumbnail, urlObj);
        }
    };

    return (
        <React.Fragment>
            { fileModalIsOpen && <TumbnailModal onClick={closeFileModalHandler} onTrigger={triggerTumbnailHandler} /> }
            <button type="button" className="upload-file-button" onClick={openFileModalHandler}> <img src={uploadFileIcon} alt="upload file" /> </button>
        </React.Fragment>
    );
};

export default TumbnailButton;