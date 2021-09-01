import React from 'react';
import { Link } from 'react-router-dom';
import editIcon from '../assets/icons/main/edit-icon.png';
import {API_URL} from "../configs/config";

const CategoriesInfo = (props) => {

    const passCategory = (currentCategory) => {
        props.onPass(currentCategory);
    };

    return (
        <tr>
            <td>
                { props.index }
            </td>
            <td>
                { props.category.name }
            </td>
            <td>
                <img width="50"
                    src={ `${process.env.REACT_APP_API_URL}/uploads/category_thumbs/${props.category.thumbnail}` }
                    alt="category page tumbnail" 
                />
            </td>
            <td>
                { props.category.description }
            </td>
            <td>
                <Link to="/admin/edit-category"> 
                    <img 
                        className="edit-icon"
                        src={editIcon} 
                        alt="edit category" 
                        onClick={ passCategory.bind(null, props.category) } 
                    />
                </Link>
            </td>
        </tr>
    );
}

export default CategoriesInfo; 