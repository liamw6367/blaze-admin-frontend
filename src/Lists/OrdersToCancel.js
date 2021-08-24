import React, { useState, useContext } from 'react';
import { RemovingContext } from '../Contexts/RemoveItemContext';
import DeletingModal from '../Modals/DeletingModal';

const OrdersToCancel = (props) => {
    const [deletingModalIsOpen, setDeletingModalIsOpen] = useState(false);

    const removingCtx = useContext(RemovingContext);

    // const cancelOrderHandler = (order) => {
    //     props.onTrigger(order);
    // };
    const openModalHandler = (order) => {
        removingCtx.removingOrderId = order.transactionId;
        console.log("order", order);
        setDeletingModalIsOpen(true);
    };
    const closeModalHandler = () => {
        setDeletingModalIsOpen(false);
    };

    return (
        <React.Fragment>
            <tr className="last-tr-border">
                <td> 
                    { props.index } 
                </td>
                <td> 
                    { props.order.orderName } 
                </td>
                <td 
                    className="order-td-boxes"
                > 
                    { props.order.email } 
                </td>
                <td 
                    className="order-td-boxes"
                > 
                    { props.order.store } 
                </td>
                <td 
                    className="order-td-boxes"
                > 
                    { props.order.transactionId } 
                </td>
                <td 
                    className="order-td-boxes"
                > 
                    { props.order.totalAmount } 
                </td>
                <td 
                    className="order-td-boxes"
                > 
                    <button 
                        type="button" 
                        className="cancel-butn"
                        onClick={ openModalHandler.bind(null, props.order) }
                    >
                        x 
                    </button> 
                </td>
            </tr> 
            {
                deletingModalIsOpen && <DeletingModal onClick={closeModalHandler} />
            }
        </React.Fragment>
    );
};

export default OrdersToCancel;