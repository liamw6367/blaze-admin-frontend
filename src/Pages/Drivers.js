import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import JustifyContext from '../Contexts/JustifyingContext';
import Blaze from './Blaze';
import DriversInfo from '../Lists/DriversInfo';

const Drivers = (props) => {
    const justCtx = useContext(JustifyContext);

    const activeDrivers = props.drivers.filter(driver => driver.driverIsActive);
    // const passDriverHandler = (driver) => {
    //     props.showDriver(driver);
    // };

    const rejectDriver = (driver) => {
        props.onReject(driver);
    };
    
    return (
        <Blaze
            onClick={justCtx.onJustify}
            isExtended={justCtx.isExtended}
            nav={
                <div className={justCtx.isExtended ? "blaze-nav" : "wide-blaze-nav"}>
                    <Link to="/admin/drivers"><p className="driver-list-title text-color">List</p></Link> 
                    <Link to="/admin/drivers-pending"><p>Pending</p></Link>
                </div>
            }
            main={
                <div className={`blaze-main ${justCtx.isExtended ? "" : "wide"}`}>
                    {
                        (activeDrivers.length === 0)
                        ? (
                            <div className="store-info-box all-orders-box">
                                <h2 className="no-orders-available">no active drivers available.</h2>
                            </div>
                        )
                        : (
                            <div className="store-info-box margin-top">
                                <table className="info-table">
                                    <thead>
                                        <tr className="background-color">
                                            <th className="padding-left">#</th>
                                            <th className="padding-left">Name</th>
                                            <th className="text-align">Phone</th>
                                            <th>Status</th>
                                            <th className="last-box">View</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            activeDrivers.map((driver, index) => {
                                                return (
                                                    <DriversInfo 
                                                        driver={driver} 
                                                        index={index + 1} 
                                                        key={driver.userName} 
                                                        // onPass={passDriverHandler}
                                                        onReject={rejectDriver}
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

export default Drivers;