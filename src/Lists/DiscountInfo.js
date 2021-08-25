import React from 'react';
import { Link } from 'react-router-dom';
import editIcon from '../assets/icons/main/edit-icon.png';

const DiscountInfo = (props) => {

    const passDiscount = (currentDiscount) => {
        props.onPass(currentDiscount); 
    };  

    const discountStatus = props.discount.discountIsActive ? "Active" : "Inactive"; 

    return (
        <tr>
            <td>
                { props.index }
            </td>
            <td>
                { props.discount.discountName }
            </td>
            <td>
                { props.discount.discountCodeName }
            </td>
            <td>
                { discountStatus }
            </td>
            <td className="group-td-boxes">
                <Link to="/admin/edit-discount"> 
                    <img 
                        className="edit-icon" 
                        src={editIcon} 
                        alt="edit discount" 
                        onClick={ passDiscount.bind(null, props.discount) }
                    />
                </Link>
            </td>
        </tr>
    );
}

export default DiscountInfo;