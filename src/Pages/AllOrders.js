import React, { useContext, useState } from 'react';
import JustifyContext from '../Contexts/JustifyingContext';
import Blaze from './Blaze';
import OrderStatusDropdown from '../Dropdowns/OrderStatusDropdown';
import StoreNamesDropdown from '../Dropdowns/StoreNamesDropdown';
import OrdersInfo from '../Lists/OrdersInfo';

const AllOrders = (props) => {
    const justCtx = useContext(JustifyContext);

    const [currentStatus, setCurrentStatus] = useState("All");

    let currentYear = new Date().getFullYear(); 
    let currentMonth = new Date().getMonth() + 1;
    currentMonth = (currentMonth < 10) ? ("0" + currentMonth) : currentMonth;
    const currentDate = new Date();
    let currentDay = currentDate.getDate();
    console.log(currentDay)
    currentDay = (currentDay < 10) ? ("0" + currentDay) : currentDay;
    currentDate.setDate(currentDate.getDate() - 7);
    let sevenDaysAgo = currentDate.getDate();
    sevenDaysAgo = (sevenDaysAgo < 10) ? ("0" + sevenDaysAgo) : sevenDaysAgo;
    console.log(sevenDaysAgo);
    const triggerStatusHandler = (selectedStatus) => {
        setCurrentStatus(selectedStatus.status);
        console.log(currentDate.setDate(currentDate.getDate() - 7));
    };
    const filteredOrdersByStatus = (currentStatus === "Received")
    ? props.orders.filter(order => order.isReceived)
    : (currentStatus === "Out for Delivery")
    ? props.orders.filter(order => order.isOutForDelivery)
    : (currentStatus === "Order Delivered")
    ? props.orders.filter(order => order.isOrderDelivered)
    : (currentStatus === "Order Canceled")
    ? props.orders.filter(order => order.isOrderCanceled)
    : props.orders;
    
    return (
        <Blaze
            onClick={justCtx.onJustify}
            isExtended={justCtx.isExtended}
            nav={
                <div className={justCtx.isExtended ? "blaze-nav" : "wide-blaze-nav"}>
                    <p>Orders Count : {filteredOrdersByStatus.length}</p>
                </div>
            }
            main={
                <div className={`blaze-main ${justCtx.isExtended ? "" : "wide"}`}>
                    <div className="filtering justify padding">
                        <label>From
                            <input type="date" name="" id="" defaultValue={`${currentYear}-${currentMonth}-${sevenDaysAgo}`} />
                        </label>
                        <label className="date-to">To
                            <input type="date" name="" id="" defaultValue={`${currentYear}-${currentMonth}-${currentDay}`} />
                        </label>
                        <div className="status-dropdown-box">
                            <span className="title span-margin">Status</span>
                            <OrderStatusDropdown onTrigger={triggerStatusHandler} />
                        </div>
                        <div className="names-dropdown-box">
                            <span className="title span-margin">Stores</span>
                            <StoreNamesDropdown stores={props.stores} />
                        </div>
                    </div>
                    {
                        (filteredOrdersByStatus.length === 0) 
                        ? (
                            <div className="store-info-box all-orders-box">
                                <h2 className="no-orders-available">No Orders Available</h2>
                            </div>
                        )
                        : (
                            <table className="info-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th className="order-td-boxes">Email</th>
                                        <th className="order-td-boxes">Store</th>
                                        <th className="order-td-boxes">Transaction Id</th>
                                        <th className="order-td-boxes">Total Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        filteredOrdersByStatus.map((order, index) => {
                                            return (
                                                <OrdersInfo 
                                                    order={order}
                                                    key={order.transactionId}
                                                    index={index + 1}
                                                />
                                            ); 
                                        })
                                    }
                                </tbody>
                            </table>
                        )
                    }
                </div>
            }
        />
    );
};

export default AllOrders;