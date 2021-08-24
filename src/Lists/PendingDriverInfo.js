import React, { useState } from 'react';
import viewIcon from '../assets/icons/main/eye-icon.png';
import DriverInfoModal from '../Modals/DriverInfoModal';

const PendingDriverInfo = (props) => {
    const [modalIsShown, setModalIsShown] = useState(false);
    const [currentPendingDriver, setCurrentPendingDriver] = useState({});
    
    const onTrigger = (currentPendingDriver) => {
        setModalIsShown(true);
        setCurrentPendingDriver(currentPendingDriver);
    };
    const hideModalHandler = () => {
        setModalIsShown(false);
    };

    const passDriver = (driver) => {
        props.onPass(driver);
    };

    return (
        <React.Fragment>
            <tr>
                <td 
                    className="padding-left box-width"
                >
                    { props.index }
                </td>
                <td 
                    className="padding-left"
                >
                    { props.driver.driverName }
                </td>
                <td>
                    { props.driver.phone }
                </td>
                <td>
                    Pending
                </td>
                <td>
                    <img 
                        className="view-icon"
                        src={viewIcon} 
                        alt="view driver" 
                        onClick={ onTrigger.bind(null, props.driver) }
                    />
                </td>
            </tr>
            {
                modalIsShown && (
                    <DriverInfoModal 
                        currentDriver={currentPendingDriver} 
                        hideModal={hideModalHandler} 
                        onPass={passDriver} 
                    />
                )
            }
        </React.Fragment>
    );
};

export default PendingDriverInfo;