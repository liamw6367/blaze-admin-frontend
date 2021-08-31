import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import viewIcon from '../assets/icons/main/eye-icon.png';
import ProductInfoModal from '../Modals/ProductInfoModal';
import editIcon from '../assets/icons/main/edit-icon.png';

const ProductInfo = (props) => {
    const [modalIsShown, setModalIsShown] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({});

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
    };

    return (
        <React.Fragment>
            <tr>
                <td
                    className="padding-left box-width"
                >
                    { props.index }
                </td>
                <td
                    className="padding-left"
                >
                    { props.product.name }
                </td>
                <td>
                    <img 
                        src={ props.product.image } 
                        alt="product" 
                    />
                </td>
                <td>
                    { props.product.description }
                </td>
                <td>
                    <div className="icons-container">
                        <img 
                            className="view-icon"
                            src={viewIcon} 
                            alt="view product" 
                            onClick={ passProduct.bind(null, props.product) }  
                        />
                        <Link to="/admin/edit-product"> 
                            <img 
                                className="edit-icon"
                                src={editIcon} 
                                alt="edit product" 
                                onClick={ triggerProduct.bind(null, props.product) } 
                            />
                        </Link>
                    </div>  
                </td>
            </tr>
            { modalIsShown && <ProductInfoModal hideModal={hideModalHandler} currentProduct={currentProduct} /> }
        </React.Fragment>
    );
}

export default ProductInfo; 