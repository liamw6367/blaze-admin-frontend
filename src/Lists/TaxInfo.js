import React from 'react';

const GroupInfo = (props) => {

    return (
        <tr>
            <td>
                { props.index }
            </td>
            <td>
                { props.tax.taxName }
            </td>
            <td className="order-td-boxes">
                { props.tax.percentage }
            </td>
        </tr>
    );
}

export default GroupInfo;