import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import JustifyContext from '../Contexts/JustifyingContext';
import Blaze from './Blaze';
import StoreStatusDropdown from '../Dropdowns/StoreStatusDropdown';
import DiscountInfo from '../Lists/DiscountInfo';
import Groups from './Groups';

const Discounts = (props) => {
    const justCtx = useContext(JustifyContext);

    const [searchingText, setSearchingText] = useState("");
    const [currentStatus, setCurrentStatus] = useState("All");

    const changeInputHandler = (event) => {
        setSearchingText(event.target.value);
    };
    const triggerStatusHandler = (selectedStatus) => {
        setCurrentStatus(selectedStatus.status);
        console.log(selectedStatus);
    };
    const passDiscountHandler = (currentDiscount) => {
        props.showDiscount(currentDiscount);
    };

    const filteredDiscountsByData = props.discounts.filter( discount => {
        return discount.discountName.toLowerCase().includes(searchingText.toLowerCase()) 
            || discount.discountCodeName.toLowerCase().includes(searchingText.toLowerCase()) 
    } );
    const filteredDiscountsByStatusAndData = (currentStatus === "Active") 
    ? filteredDiscountsByData.filter(discount => discount.discountIsActive)
    : (currentStatus === "Inactive") 
    ? filteredDiscountsByData.filter(discount => !discount.discountIsActive)
    : filteredDiscountsByData;
    
    const passGroupHandler = (currentGroup) => {
        props.showGroup(currentGroup);
    };

    return (
        <Blaze
            onClick={justCtx.onJustify}
            isExtended={justCtx.isExtended}
            nav={
                <div className={justCtx.isExtended ? "blaze-nav" : "wide-blaze-nav"}>
                    <p>Discounts</p>
                </div>
            }
            main={
                <div className={`blaze-main ${justCtx.isExtended ? "" : "wide"}`}>
                    <div className="filtering justify">
                        <span className="text">View:</span>
                        <div className="search-input">
                            <input type="text" name="" id="" placeholder="Search..." onChange={changeInputHandler} />
                            <i />
                        </div>
                        <StoreStatusDropdown onTrigger={triggerStatusHandler} />
                        <div className="add-store-button">
                            <Link to="/AddDiscount">Add New</Link>
                        </div>
                    </div>
                    {
                        (filteredDiscountsByData.length === 0)
                        ? (
                            <div className="store-info-box all-orders-box">
                                <h2 className="no-orders-available">No Matches Found</h2>
                            </div>
                        )
                        : (filteredDiscountsByStatusAndData.length === 0) 
                        ? (
                            <div className="store-info-box all-orders-box">
                                <h2 className="no-orders-available">No Discounts Available</h2>
                            </div>
                        ) 
                        : (
                            <div className="store-info-box">
                                <table className="info-table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Code</th>
                                            <th>Status</th>
                                            <th className="group-td-boxes">Edit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { 
                                            filteredDiscountsByStatusAndData.map((discount, index) => {
                                                return (
                                                    <DiscountInfo 
                                                        discount={discount} 
                                                        index={index + 1} 
                                                        key={discount.discountCodeName} 
                                                        onPass={passDiscountHandler}
                                                    />
                                                );
                                            }) 
                                        }
                                    </tbody>
                                </table>
                            </div>
                        )
                    }
                    <Groups 
                        groups={props.groups}
                        passGroup={passGroupHandler}
                    />
                </div>
            }
        />
    );
};

export default Discounts;