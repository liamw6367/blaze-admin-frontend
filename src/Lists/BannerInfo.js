import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import editIcon from '../assets/icons/main/edit-icon.png';
import removeIcon from '../assets/icons/main/remove-icon.png';
import DeletingModal from "../Modals/DeletingModal";

const BannerInfo = (props) => {

    const history = useHistory();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [bannerId, setBannerId] = useState("");
    // const passBanner = (currentBanner) => {
    //     props.onPass(currentBanner);
    // };
    // const passBannerId = (id) => {
    //     props.onTrigger(id);
    // }
    const removeBannerHandler = (id) => {
        setBannerId(id);
        setModalIsOpen(true);
    };
    const closeModalHandler = () => {
        setModalIsOpen(false);
    };
    const passIdHandler = (id) => {
        props.onRemove(id);
    };

    return (
        <>
            <tr>
                <td>
                    { props.index }
                </td>
                <td>
                    { props.banner.name }
                </td>
                <td className="banner-image-container">
                    <img
                        src={ props.banner.image }
                        alt="banner"
                    />
                </td>
                <td className="order-td-boxes">
                    { props.banner.position }
                </td>
                <td className="group-td-boxes">
                    <div className="icons-container">
                        <img
                            className="edit-icon"
                            src={editIcon}
                            alt="edit banner"
                            onClick={ () => history.push(`/admin/edit-banner/${props.banner.id}`) }
                        />
                        <div className="remove-icon-container">
                            <img
                                src={removeIcon}
                                alt="remove banner"
                                onClick={ removeBannerHandler.bind(null, props.banner.id) }
                            />
                        </div>
                    </div>
                </td>
            </tr>
            { modalIsOpen && <DeletingModal onClick={ closeModalHandler } id={bannerId} onPass={passIdHandler} /> }
        </>
    );
}

export default BannerInfo;