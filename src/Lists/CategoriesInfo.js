import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import editIcon from '../assets/icons/main/edit-icon.png';
import {API_URL} from "../configs/config";
import removeIcon from "../assets/icons/main/remove-icon.png";
import DeletingModal from "../Modals/DeletingModal";

const CategoriesInfo = (props) => {

    const history = useHistory();

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [categoryId, setCategoryId] = useState("");

    const removeCategoryHandler = (id) => {
        setCategoryId(id);
        setModalIsOpen(true);
    };
    const closeModalHandler = () => {
        setModalIsOpen(false);
    };
    const passIdHandler = (id) => {
        props.onRemove(id);
    };

    return (
        <>
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
                    <div className="icons-container">
                        <img
                            className="edit-icon"
                            src={editIcon}
                            alt="edit category"
                            // onClick={ passCategory.bind(null, props.category) }
                            onClick={ () => history.push(`/admin/edit-category/${props.category.id}`) }
                        />
                        <div className="remove-icon-container">
                            <img
                                src={removeIcon}
                                alt="remove banner"
                                onClick={ removeCategoryHandler.bind(null, props.category.id) }
                            />
                        </div>
                    </div>
                </td>
            </tr>
            { modalIsOpen && <DeletingModal onClick={ closeModalHandler } id={categoryId} onPass={passIdHandler} /> }
        </>
    );
}

export default CategoriesInfo; 