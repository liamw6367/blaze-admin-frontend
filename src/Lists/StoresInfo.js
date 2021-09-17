import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './StoresInfo.css';
import editIcon from '../assets/icons/main/edit-icon.png';
import removeIcon from "../assets/icons/main/remove-icon.png";
import DeletingModal from "../Modals/DeletingModal";


const StoresInfo = (props) => {

    const history = useHistory();

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [storeId, setStoreId] = useState("");

    const storeStatus = props.store.is_active ? "Active" : "Inactive";

    const removeStoreHandler = (id) => {
        setStoreId(id);
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
                    <div className="icons-container">
                        <img
                            style={{cursor: "pointer"}}
                            className="edit-icon"
                            src={editIcon}
                            alt="edit store"
                            onClick={ () => history.push(`/admin/edit-store/${props.store.id}`) }
                        />
                        <div className="remove-icon-container">
                            <img
                                src={removeIcon}
                                alt="remove banner"
                                onClick={ removeStoreHandler.bind(null, props.store.id) }
                            />
                        </div>
                    </div>
                </td>
            </tr>
            { modalIsOpen && <DeletingModal onClick={ closeModalHandler } id={storeId} onPass={passIdHandler} /> }
        </>
    );
}

export default StoresInfo;