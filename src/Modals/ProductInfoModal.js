import React from 'react';
import reactDom from 'react-dom';

const Backdrop = (props) => {

    return (
        <div 
            className="file-backdrop animate__animated animate__fadeIn" 
            onClick={props.hideModal}
        />
    );
};

const ProductInfoContainer = (props) => {
    return (
        <div className="file-modal product-info-box animate__animated animate__backInDown">
            <p className="file-modal__closer" onClick={props.hideModal}>&times;</p>
            <div className="driver-profile-and-info-box">
                <div className="driver-profile">
                    <img src={props.currentProduct.productImage} alt={`product ${props.currentProduct.productName}`} />
                </div>
                <div className="product-info">
                    <h2>{props.currentProduct.productName}</h2>
                    <p className="price-title"> Price - <span className="product-price"> { `$${props.currentProduct.productPrice}` } </span> </p>
                </div>
            </div>
            <div className="product-description-box">
                <p className="product-description"> {props.currentProduct.productDescription} </p>
            </div>
        </div>
    );
};

const ProductInfoModal = (props) => {
    return (
        <React.Fragment>
            { reactDom.createPortal(<Backdrop hideModal={props.hideModal} />, document.getElementById("product-info-modal")) }
            { reactDom.createPortal(
                <ProductInfoContainer 
                    currentProduct={props.currentProduct} 
                    hideModal={props.hideModal} 
                />, document.getElementById("product-info-modal")
            ) }
        </React.Fragment>
    );
};

export default ProductInfoModal;