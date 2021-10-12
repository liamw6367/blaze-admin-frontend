import React, { useState } from 'react';
import viewIcon from '../assets/icons/main/eye-icon.png';
import DriverInfoModal from '../Modals/DriverInfoModal';

const DriversInfo = (props) => {
    const [modalIsShown, setModalIsShown] = useState(false);
    const [currentActiveDriver, setCurrentActiveDriver] = useState({});

    const driverStatus = props.driver.driverIsActive ? "Active" : "Inactive";

    const onTrigger = (currentActiveDriver) => {
        setModalIsShown(true);
        setCurrentActiveDriver(currentActiveDriver);
    };
    const hideModalHandler = () => {
        setModalIsShown(false);
    };

    const triggerDriver = (driver) => {
        props.onReject(driver);
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
                    { props.driver.first_name + " " + props.driver.last_name }
                </td>
                <td>
                    { props.driver.phone }
                </td>
                <td>
                    { driverStatus }
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
                        hideModal={hideModalHandler} 
                        currentDriver={currentActiveDriver}  
                        onTrigger={triggerDriver} 
                    />
                )
            }
        </React.Fragment>
    );
}

export default DriversInfo;
