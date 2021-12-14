import React from 'react';

const OrderInfo = (props) => {
    console.log(props, 'wwwwwwwwwww')
    return (
        <tr className="last-tr-border">
            <td>
                {props.order.id}
            </td>

            <td>
                {/* {props.order.user?.first_name + ' ' + props.order?.user?.last_name} */}
                {props.order.name}
            </td>
            <td
                className="order-td-boxes"
            >
                {/* {props.order.user?.email} */}
                {props.order.store_email_id}
            </td>
            <td
                className="order-td-boxes"
            >
                {'test'}
            </td>
            <td
                className="order-td-boxes"
            >
                {'1m6w8cgm'}
            </td>
            <td
                className="order-td-boxes"
            >
                {/* {props.order.total_price} */}
                {'100$'}
            </td>
        </tr>
    );
}

export default OrderInfo;
