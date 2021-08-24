import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import JustifyContext from '../Contexts/JustifyingContext';
import Blaze from '../Pages/Blaze';
import PendingDriverInfo from '../Lists/PendingDriverInfo';

const DriversPending = (props) => {
    const justCtx = useContext(JustifyContext);

    const driversAreInPending = props.drivers.filter(driver => driver.isPending);
    const passDriverHandler = (driver) => {
        props.onActivate(driver);
    };
    
    return (
        <Blaze
            onClick={justCtx.onJustify}
            isExtended={justCtx.isExtended}
            nav={
                <div className={justCtx.isExtended ? "blaze-nav" : "wide-blaze-nav"}>
                    <Link to="/Drivers"><p className="driver-list-title">List</p></Link> 
                    <Link to="/DriversPending"><p className="text-color">Pending</p></Link>
                </div>
            }
            main={
                <div className={`blaze-main ${justCtx.isExtended ? "" : "wide"}`}>
                    {
                        (driversAreInPending.length === 0)
                        ? (
                            <div className="store-info-box all-orders-box">
                                <h2 className="no-orders-available">all drivers are active at the moment.</h2>
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
                                            driversAreInPending.map((driver, index) => {
                                                return (
                                                    <PendingDriverInfo 
                                                        driver={driver} 
                                                        index={index + 1} 
                                                        key={driver.userName} 
                                                        onPass={passDriverHandler}
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

export default DriversPending;