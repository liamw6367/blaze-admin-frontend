import React, { useContext } from 'react';
import reactDom from 'react-dom';
import { RemovingContext } from '../Contexts/RemoveItemContext';

const Backdrop = (props) => {
    return  (
        <div 
            className="file-backdrop animate__animated animate__fadeIn" 
            onClick={props.onClick} 
        />
    );
};

const DeletingModalContainer = (props) => {
    const removingCtx = useContext(RemovingContext);

    const removeCard = () => {
        removingCtx.removeSelectedOrder();
    };

    return ( 
        <div className="delete-item-container animate__animated animate__fadeIn">
            <div className="delete-item-box">
                <h4 className="delete-item-title"> Are you sure? </h4>
                <div className="delete-cancel-butns-box">
                    <button 
                        type="button" 
                        className="deleting-btn"
                        onClick={removeCard}
                    > Delete </button>
                    <button 
                        type="button" 
                        className="cancelling-btn"
                        onClick={props.onClick}
                    > Cancel </button>
                </div>
            </div>
        </div>
    );
};
const DeletingModal = (props) => {
    return (
        <React.Fragment>
            { reactDom.createPortal(<Backdrop onClick={props.onClick} />, document.getElementById("deleting-modal")) }
            { reactDom.createPortal(<DeletingModalContainer onClick={props.onClick} />, document.getElementById("deleting-modal")) }
        </React.Fragment>
    );
}

export default DeletingModal;



