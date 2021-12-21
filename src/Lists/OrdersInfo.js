import React from 'react';

const OrderInfo = (props) => {
    // const storesArray = []
    //  props.order.product_orders.map(store => store.product_stores.map(item => storesArray.push(item.name)))
    // // console.log(storesArray, '22')
    // // console.log(props, 'wwwwwwwwwww')

    function storeHandler(order,selectedStore) {
        const storesArray = []
        order.product_orders.map(store => store.product_stores.map(item => (item.name === selectedStore || selectedStore === 'All') && storesArray.push(item.name)))
        let setArray = [...new Set(storesArray)]
        return setArray.join("\r\n")
    }

    return (
        <tr className="last-tr-border">
            <td>
                {props.order.id}
            </td>

            <td>
                 {props.order.user?.first_name + ' ' + props.order?.user?.last_name}
                {/*{props.order.name}*/}
            </td>
            <td
                className="order-td-boxes"
            >
                 {props.order.user?.email}
                {/*{props.order.store_email_id}*/}
            </td>
            <td
                className="order-td-boxes"
            >
                {/*{props.order.product_orders.map(store => store.product_stores.map(item => item.name))}*/}
                {storeHandler(props.order,props.store)}
            </td>
            <td
                className="order-td-boxes"
            >
                {'1m6w8cgm'}
            </td>
            <td
                className="order-td-boxes"
            >
                 {props.order.total_price}
                {/*{'100$'}*/}
            </td>
        </tr>
    );
}

export default OrderInfo;
