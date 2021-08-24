import React, { useState } from 'react';
import viewIcon from '../assets/icons/main/eye-icon.png';
import ProductInfoModal from '../Modals/ProductInfoModal';

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
                    { props.product.productName }
                </td>
                <td>
                    <img 
                        src={ props.product.productImage } 
                        alt="product" 
                    />
                </td>
                <td>
                    { props.product.productDescription }
                </td>
                <td>
                    <img 
                        className="view-icon"
                        src={viewIcon} 
                        alt="view product" 
                        onClick={ passProduct.bind(null, props.product) }  
                    />
                </td>
            </tr>
            { modalIsShown && <ProductInfoModal hideModal={hideModalHandler} currentProduct={currentProduct} /> }
        </React.Fragment>
    );
}

export default ProductInfo; 