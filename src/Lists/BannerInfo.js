import React from 'react';
import { Link } from 'react-router-dom';
import editIcon from '../assets/icons/main/edit-icon.png';
import removeIcon from '../assets/icons/main/remove-icon.png';

const BannerInfo = (props) => {

    const passBanner = (currentBanner) => {
        props.onPass(currentBanner);
    };
    const passBannerId = (id) => {
        props.onTrigger(id);
    }

    return (
        <tr>
            <td>
                { props.index }
            </td>
            <td>
                { props.banner.bannerName }
            </td>
            <td className="banner-image-container">
                <img 
                    src={ props.banner.bannerImage } 
                    alt="banner page tumbnail" 
                />
            </td>
            <td className="order-td-boxes">
                { props.banner.position }
            </td>
            <td className="group-td-boxes">
                <div className="icons-container">
                    <Link to="/admin/edit-banner"> 
                        <img 
                            className="edit-icon"
                            src={editIcon} 
                            alt="edit banner" 
                            onClick={ passBanner.bind(null, props.banner) } 
                        />
                    </Link>
                    <div className="remove-icon-container">
                        <img 
                            src={removeIcon} 
                            alt="remove banner" 
                            onClick={ passBannerId.bind(null, props.banner.id) }
                        />
                    </div>
                </div>
            </td>
        </tr>
    );
}

export default BannerInfo;