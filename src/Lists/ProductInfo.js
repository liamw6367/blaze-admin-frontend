import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import viewIcon from '../assets/icons/main/eye-icon.png';
import ProductInfoModal from '../Modals/ProductInfoModal';
import editIcon from '../assets/icons/main/edit-icon.png';
import {API_URL} from "../configs/config";

const ProductInfo = (props) => {
    const [modalIsShown, setModalIsShown] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({});

    const history = useHistory();

    const passProduct = (currentProduct) => {
        setModalIsShown(true);
        setCurrentProduct(currentProduct);
        console.log(currentProduct);
    };
    const hideModalHandler = () => {
        setModalIsShown(false);
    };
    const triggerProduct = (product) => {
        props.onTrigger(product);
        console.log(product);
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
                </td>
            </tr>
            {modalIsShown && <ProductInfoModal hideModal={hideModalHandler} currentProduct={currentProduct}/>}
        </React.Fragment>
    );
}

export default ProductInfo; 