import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import JustifyContext from '../Contexts/JustifyingContext';
import StoreStatusDropdown from '../Dropdowns/StoreStatusDropdown';
import BannerInfo from '../Lists/BannerInfo';
import Blaze from './Blaze';

const Banners = (props) => {
    const justCtx = useContext(JustifyContext);

    const [currentBannerStatus, setCurrentBannerStatus] = useState("All");

    const triggerStatusHandler = (selectedStatus) => {
        setCurrentBannerStatus(selectedStatus.status);
    // console.log(selectedStatus)
    };
    const passBannerHandler = (currentBanner) => {
        props.showBanner(currentBanner);
    };
    const triggerBannerIdHandler = (id) => {
        props.onRemove(id);
    };

    const {banners} = props;
    const filteredBannersByStatus = (currentBannerStatus === "Active")
    ? banners.filter(banner => banner.bannerIsActive)
    : (currentBannerStatus === "Inactive")
    ? banners.filter(banner => !banner.bannerIsActive)
    : banners;

    return (
        <Blaze
            onClick={justCtx.onJustify}
            isExtended={justCtx.isExtended}
            nav={
                <div className={justCtx.isExtended ? "blaze-nav" : "wide-blaze-nav"}>
                    <p>Banners</p>
                </div>
            }
            main={
                <div className={`blaze-main ${justCtx.isExtended ? "" : "wide"}`}>
                    <div className="filtering justify">
                        <span className="text">View:</span>
                        <StoreStatusDropdown onTrigger={triggerStatusHandler} />
                        <div className="add-store-button">
                            <Link to="/admin/add-banner">Add New</Link>
                        </div>
                    </div>
                    {
                        (filteredBannersByStatus.length === 0) 
                        ? (
                            <div className="store-info-box all-orders-box">
                                <h2 className="no-orders-available">No Banners Available</h2>
                            </div>
                        )
                        : (
                            <div className="store-info-box">
                                <table className="info-table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Thumbnail</th>
                                            <th className="order-td-boxes">Position</th>
                                            <th className="group-td-boxes">Edit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filteredBannersByStatus.map((banner, index) => {
                                                return (
                                                    <BannerInfo 
                                                        banner={banner} 
                                                        index={index + 1} 
                                                        key={banner.id} 
                                                        onPass={passBannerHandler}
                                                        onTrigger={triggerBannerIdHandler}
                                                    />
                                                );
                                            }) 
                                        } 
                                    </tbody>
                                </table>
                            </div>
                        )
                    }
                </div>
            }
        />
    );
};

export default Banners;