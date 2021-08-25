import React from 'react';
import { Link } from 'react-router-dom';
import editIcon from '../assets/icons/main/edit-icon.png';

const GroupInfo = (props) => {

    const passGroup = (currentGroup) => {
        props.onPass(currentGroup);
    };

    return (
        <tr>
            <td>
                { props.index }
            </td>
            <td>
                { props.group.groupName }
            </td>
            <td className="order-td-boxes">
                { props.group.quantity }
            </td>
            <td className="order-td-boxes">
                { props.group.totalAmount }
            </td>
            <td className="group-td-boxes">
                <Link to="/admin/edit-group"> 
                    <img 
                        className="edit-icon" 
                        src={editIcon} 
                        alt="edit group" 
                        onClick={ passGroup.bind(null, props.group) } 
                    />
                </Link>
            </td>
        </tr>
    );
}

export default GroupInfo;