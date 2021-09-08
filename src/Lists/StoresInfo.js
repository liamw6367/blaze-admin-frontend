import React from 'react';
import { useHistory } from 'react-router';
import './StoresInfo.css';
import editIcon from '../assets/icons/main/edit-icon.png';

const StoresInfo = (props) => {

    const history = useHistory();

    const storeStatus = props.store.is_active ? "Active" : "Inactive";

    return (
        <tr>
            <td>
                { props.index }
            </td>
            <td>
                { props.store.name }
            </td>
            <td>
                { props.store.area }
            </td>
            <td>
                { props.store.contact_number }
            </td>
            <td>
                { props.store.store_email_id }
            </td>
            <td>
                { storeStatus } 
            </td>
            <td>
                <img
                    style={{cursor: "pointer"}}
                    className="edit-icon"
                    src={editIcon}
                    alt="edit store"
                    onClick={ () => history.push(`/admin/edit-store/${props.store.id}`) }
                />
            </td>
        </tr>
    );
}

export default StoresInfo;