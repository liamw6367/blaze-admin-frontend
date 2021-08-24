import React, {useContext} from 'react';
import JustifyContext from '../Contexts/JustifyingContext';
import Blaze from './Blaze';
import OrdersToCancel from '../Lists/OrdersToCancel';

const CancelTransaction = (props) => {
    const justCtx = useContext(JustifyContext);
    
    const triggerOrderHandler = (order) => {
        props.onRemove(order);
    };

    return (
        <Blaze
            onClick={justCtx.onJustify}
            isExtended={justCtx.isExtended}
            nav={
                <div className={justCtx.isExtended ? "blaze-nav" : "wide-blaze-nav"}>
                    <p>Cancel Orders</p>
                </div>
            }
            main={
                <div className={`blaze-main ${justCtx.isExtended ? "" : "wide"}`}>
                        {
                            (props.orders.length === 0) 
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
                                            <th className="order-td-boxes order-td-box">Email</th>
                                            <th className="order-td-boxes">Store</th>
                                            <th className="order-td-boxes">Transaction Id</th>
                                            <th className="order-td-boxes">Total Amount</th>
                                            <th className="order-td-boxes">#</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            props.orders.map((order, index) => {
                                                return (
                                                    <OrdersToCancel 
                                                        order={order}
                                                        key={order.transactionId}
                                                        index={index + 1}
                                                        onTrigger={triggerOrderHandler}
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

export default CancelTransaction;