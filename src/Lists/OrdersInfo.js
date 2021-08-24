import React from 'react';

const OrderInfo = (props) => {
    return (
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
        </tr> 
    );
}

export default OrderInfo;
