import React from 'react';
import { Link } from 'react-router-dom';
import './StoresInfo.css';
import editIcon from '../assets/icons/main/edit-icon.png';

const StoresInfo = (props) => {

    const passStore = (currentStore) => {
        props.onPass(currentStore);
    };

    const storeStatus = props.store.isActive ? "Active" : "Inactive"; 

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
                { props.store.contactNumber }
            </td>
            <td>
                { props.store.storeEmailId }
            </td>
            <td>
                { storeStatus } 
            </td>
            <td>
                <Link to="/EditStore"> 
                    <img 
                        className="edit-icon" 
                        src={editIcon} 
                        alt="edit store" 
                        onClick={ passStore.bind(null, props.store) } 
                    />
                </Link>
            </td>
        </tr>
    );
}

export default StoresInfo;