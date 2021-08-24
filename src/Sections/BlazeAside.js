import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import './BlazeAside.css';
import logoIcon from '../assets/icons/aside/logo-icon.png';
import JustifyContext from '../Contexts/JustifyingContext';
const BlazeAside = () => {
    const justCtx = useContext(JustifyContext);

    const history = useHistory();

    const redirectHomeHandler = () => {
        history.push('/Dashboard')
    };

    console.log("sidebar runs");


    return (
        <aside className={justCtx.isExtended ? "blaze-aside" : "narrow-blaze-aside"}>
            <div className={justCtx.isExtended ? "blaze-aside__logo" : "narrow-blaze-aside__logo"} onClick={redirectHomeHandler}>
                <img src={logoIcon} alt="logo icon" />
            </div>
            <div className={justCtx.isExtended ? "blaze-aside__links" : "narrow-blaze-aside__links"}>
                <NavLink to='/Dashboard' className={justCtx.isExtended ? "dashboard" : "narrow-dashboard"}>
                    <i/> {justCtx.isExtended ? <p className={justCtx.isExtended ? "p" : "narrow-p"}>Dashboard</p> : ""} 
                </NavLink>
                <NavLink to='/Stores' className={justCtx.isExtended ? "stores" : "narrow-stores"}>
                    <i/> {justCtx.isExtended ? <p className={justCtx.isExtended ? "p" : "narrow-p"}>Stores</p> : ""}  
                </NavLink>
                <NavLink to='/Categories' className={justCtx.isExtended ? "categories" : "narrow-categories"}>
                    <i/> {justCtx.isExtended ? <p className={justCtx.isExtended ? "p" : "narrow-p"}>Categories</p> : ""}  
                </NavLink>
                <NavLink to='/Products' className={justCtx.isExtended ? "products" : "narrow-products"}>
                    <i/> {justCtx.isExtended ? <p className={justCtx.isExtended ? "p" : "narrow-p"}>Products</p> : ""}  
                </NavLink> 
                <NavLink to='/Drivers' className={justCtx.isExtended ? "drivers" : "narrow-drivers"}>
                    <i/> {justCtx.isExtended ? <p className={justCtx.isExtended ? "p" : "narrow-p"}>Drivers</p> : ""}  
                </NavLink>
                <NavLink to='/UserList' className={justCtx.isExtended ? "user-list" : "narrow-user-list"}>
                    <i/> {justCtx.isExtended ? <p className={justCtx.isExtended ? "p" : "narrow-p"}>User List</p> : ""}  
                </NavLink>
                <NavLink to='/PromotionalMessage' className={justCtx.isExtended ? "prom-message" : "narrow-prom-message"}>
                    <i/> {justCtx.isExtended ? <p className={justCtx.isExtended ? "p" : "narrow-p"}>Promotional Message</p> : ""}  
                </NavLink>
                <NavLink to='/AllOrders' className={justCtx.isExtended ? "all-orders" : "narrow-all-orders"}>
                    <i/> {justCtx.isExtended ? <p className={justCtx.isExtended ? "p" : "narrow-p"}>All Orders</p> : ""}  
                </NavLink>
                <NavLink to='/CancelTransaction' className={justCtx.isExtended ? "cancel-transaction" : "narrow-cancel-transaction"}>
                    <i/> {justCtx.isExtended ? <p className={justCtx.isExtended ? "p" : "narrow-p"}>Cancel Transaction</p> : ""}  
                </NavLink>
                <NavLink to='/Discounts' className={justCtx.isExtended ? "discounts" : "narrow-discounts"}>
                    <i/> {justCtx.isExtended ? <p className={justCtx.isExtended ? "p" : "narrow-p"}>Discounts</p> : ""}  
                </NavLink>
                <NavLink to='/Tax' className={justCtx.isExtended ? "tax" : "narrow-tax"}>
                    <i/> {justCtx.isExtended ? <p className={justCtx.isExtended ? "p" : "narrow-p"}>Tax</p> : ""}  
                </NavLink>
                <NavLink to='/Banners' className={justCtx.isExtended ? "banners" : "narrow-banners"}>
                    <i/> {justCtx.isExtended ? <p className={justCtx.isExtended ? "p" : "narrow-p"}>Banners</p> : ""}  
                </NavLink>
                <NavLink to='/DeliveryFee' className={justCtx.isExtended ? "delivery-fee" : "narrow-delivery-fee"}>
                    <i/> {justCtx.isExtended ? <p className={justCtx.isExtended ? "p" : "narrow-p"}>Delivery Fee</p> : ""}  
                </NavLink>
            </div>
        </aside>
    );
};

export default React.memo(BlazeAside);