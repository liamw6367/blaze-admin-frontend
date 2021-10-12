import React from 'react';
import reactDom from 'react-dom';
import { driverInfoModalImages } from '../imagesData/Image';

const Backdrop = (props) => {

    return (
        <div 
            className="file-backdrop animate__animated animate__fadeIn" 
            onClick={props.hideModal}
        />
    );
};

const DriverInfoContainer = (props) => {

    // const preservedBankAccountDetail = "**** **** **** " + props.currentDriver.bankAccountDetail.slice(12, 16);
    const bank_acc_detail = '3456122145547878';
    const preserved_Bank_acc_detail = "**** **** **** " + bank_acc_detail.slice(12, 16);
    
    const acceptDriverHandler = () => {
        props.hideModal();
        props.onTrigger(props.currentDriver);
    };
    const rejectDriverHandler = () => {
        props.hideModal();
        props.onPass(props.currentDriver);
    };

    return (
        <div className="file-modal driver-info-modal-box animate__animated animate__backInDown">
            <p className="file-modal__closer" onClick={props.hideModal}>&times;</p>
            <div className="driver-profile-and-info-box">
                <div className="driver-profile">
                    <img src={ driverInfoModalImages.driverProfile } alt="driver profile" />
                </div>
                <div className="driver-info">
                    <h2>{`${props.currentDriver.first_name} ${props.currentDriver.last_name}`}</h2>
                    <ul>
                        <li> 
                            <i className="phone-icon" /> 
                            <p>{props.currentDriver.phone}</p> 
                        </li>
                        <li> 
                            <i className="address-icon" /> 
                            {/* <p>{props.currentDriver.address}</p>  */}
                            <p> { 'The U.S. cities of Key West, Florida' } </p>
                        </li>
                        <li> 
                            <i className="work-timing-icon" /> 
                            {/* <p>{props.currentDriver.workTiming}</p>  */}
                            <p> { '11AM - 8PM' } </p>
                        </li>
                        <li> 
                            <i className="salary-amt-icon" /> 
                            {/* <p>{`$${props.currentDriver.salaryAmt}`}</p>  */}
                            <p> { '$124' } </p>
                        </li>
                        <li> 
                            <i className="bank-account-detail-icon" /> 
                            {/* <p>{preservedBankAccountDetail}</p>  */}
                            <p> { preserved_Bank_acc_detail } </p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="driver-license-image-box">
                <div> <img src={ driverInfoModalImages.drivingLicenseImage } alt="driving license" /> </div>
                <div> <img src={ driverInfoModalImages.paperLicenseImage } alt="paper license" /> </div>
                <div> <img src={ driverInfoModalImages.largePreviewImage } alt="large preview" /> </div>
            </div>
            <div className="accept-reject-butns-box">
                { 
                    props.currentDriver.driverIsActive 
                    ? (
                        <button 
                            type="button" 
                            className="reject-butn"
                            // onClick={rejectDriverHandler}
                        >
                            Reject
                        </button>
                    )
                    : (
                        <>
                            <button 
                                type="button" 
                                className="accept-butn"
                                // onClick={acceptDriverHandler}
                            >
                                Accept
                            </button>
                            <button 
                                type="button" 
                                className="reject-butn"
                                // onClick={props.hideModal}
                            >
                                Reject
                            </button>
                        </>
                    ) 
                }
            </div>
        </div>
    );
};

const DriverInfoModal = (props) => {

    const triggerDriver = (driver) => {
        props.onPass(driver);
    };
    const passDriver = (driver) => {
        props.onTrigger(driver);
        console.log(driver);
    };

    return (
        <React.Fragment>
            { reactDom.createPortal(<Backdrop hideModal={props.hideModal} />, document.getElementById("driver-info-modal")) }
            { reactDom.createPortal(
                <DriverInfoContainer 
                    currentDriver={props.currentDriver} 
                    hideModal={props.hideModal} 
                    onTrigger={triggerDriver} 
                    onPass={passDriver} 
                />, document.getElementById("driver-info-modal")
            ) }
        </React.Fragment>
    );
};

export default DriverInfoModal;