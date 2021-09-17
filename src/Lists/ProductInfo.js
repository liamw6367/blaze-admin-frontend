import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import viewIcon from '../assets/icons/main/eye-icon.png';
import ProductInfoModal from '../Modals/ProductInfoModal';
import editIcon from '../assets/icons/main/edit-icon.png';
import {API_URL} from "../configs/config";
import removeIcon from "../assets/icons/main/remove-icon.png";
import DeletingModal from "../Modals/DeletingModal";

const ProductInfo = (props) => {
    const [modalIsShown, setModalIsShown] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [productId, setProductId] = useState("");

    const history = useHistory();

    const passProduct = (currentProduct) => {
        setModalIsShown(true);
        setCurrentProduct(currentProduct);
        console.log(currentProduct);
    };
    const hideModalHandler = () => {
        setModalIsShown(false);
    };
    const removeProductHandler = (id) => {
        setProductId(id);
        setModalIsOpen(true);
    };
    const closeModalHandler = () => {
        setModalIsOpen(false);
    };
    const passIdHandler = (id) => {
        props.onRemove(id);
    };

    return (
        <React.Fragment>
            <tr>
                <td
                    className="padding-left box-width"
                >
                    {props.index}
                </td>
                <td
                    className="padding-left"
                >
                    {props.product.name}
                </td>
                <td>
                    <img width="50"
                        src={`${process.env.REACT_APP_API_URL}/uploads/product_images/${props.product.image}`}
                        alt="product"
                    />
                </td>
                <td>
                    {props.product.description}
                </td>
                <td>
                    <div className="icons-container">
                        <div className="icons-container">
                            <img
                                className="view-icon"
                                src={viewIcon}
                                alt="view product"
                                onClick={ passProduct.bind(null, props.product) }
                            />
                            <img
                                style={{cursor: 'pointer'}}
                                className="edit-icon"
                                src={editIcon}
                                alt="edit product"
                                onClick={ () => history.push(`/admin/edit-product/${props.product.id}`) }
                            />
                        </div>
                        <div className="remove-icon-container">
                            <img
                                src={removeIcon}
                                alt="remove banner"
                                onClick={ removeProductHandler.bind(null, props.product.id) }
                            />
                        </div>
                    </div>
                </td>
            </tr>
            {modalIsShown && <ProductInfoModal hideModal={hideModalHandler} currentProduct={currentProduct}/>}
            { modalIsOpen && <DeletingModal onClick={ closeModalHandler } id={productId} onPass={passIdHandler} /> }
        </React.Fragment>
    );
}

export default ProductInfo; 