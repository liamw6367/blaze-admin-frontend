import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import './BlazeAside.css';
import logoIcon from '../assets/icons/aside/logo-icon.png';
import JustifyContext from '../Contexts/JustifyingContext';


const BlazeAside = () => {
    const justCtx = useContext(JustifyContext);

    const history = useHistory();

    return (
        <aside className={justCtx.isExtended ? "blaze-aside" : "narrow-blaze-aside"}>
            <button
                type="button" 
                className={justCtx.isExtended ? "blaze-aside__logo" : "narrow-blaze-aside__logo"} 
                onClick={ () => history.push('/admin/dashboard') }
            >
                <img src={logoIcon} alt="logo icon" />
            </button>
            <div className={justCtx.isExtended ? "blaze-aside__links" : "narrow-blaze-aside__links"}>
                <NavLink to='/admin/dashboard' className={justCtx.isExtended ? "dashboard" : "narrow-dashboard"}>
                    <i/> {justCtx.isExtended ? <p className={justCtx.isExtended ? "p" : "narrow-p"}>Dashboard</p> : ""} 
                </NavLink>
                <NavLink to='/admin/stores' className={justCtx.isExtended ? "stores" : "narrow-stores"}>
                    <i/> {justCtx.isExtended ? <p className={justCtx.isExtended ? "p" : "narrow-p"}>Stores</p> : ""}  
                </NavLink>
                <NavLink to='/admin/categories' className={justCtx.isExtended ? "categories" : "narrow-categories"}>
                    <i/> {justCtx.isExtended ? <p className={justCtx.isExtended ? "p" : "narrow-p"}>Categories</p> : ""}  
                </NavLink>
                <NavLink to='/admin/products' className={justCtx.isExtended ? "products" : "narrow-products"}>
                    <i/> {justCtx.isExtended ? <p className={justCtx.isExtended ? "p" : "narrow-p"}>Products</p> : ""}  
                </NavLink> 
                <NavLink to='/admin/drivers' className={justCtx.isExtended ? "drivers" : "narrow-drivers"}>
                    <i/> {justCtx.isExtended ? <p className={justCtx.isExtended ? "p" : "narrow-p"}>Drivers</p> : ""}  
                </NavLink>
                <NavLink to='/admin/user-list' className={justCtx.isExtended ? "user-list" : "narrow-user-list"}>
                    <i/> {justCtx.isExtended ? <p className={justCtx.isExtended ? "p" : "narrow-p"}>User List</p> : ""}  
                </NavLink>
                <NavLink to='/admin/promotional-message' className={justCtx.isExtended ? "prom-message" : "narrow-prom-message"}>
                    <i/> {justCtx.isExtended ? <p className={justCtx.isExtended ? "p" : "narrow-p"}>Promotional Message</p> : ""}  
                </NavLink>
                <NavLink to='/admin/all-orders' className={justCtx.isExtended ? "all-orders" : "narrow-all-orders"}>
                    <i/> {justCtx.isExtended ? <p className={justCtx.isExtended ? "p" : "narrow-p"}>All Orders</p> : ""}  
                </NavLink>
                <NavLink to='/admin/cancel-transaction' className={justCtx.isExtended ? "cancel-transaction" : "narrow-cancel-transaction"}>
                    <i/> {justCtx.isExtended ? <p className={justCtx.isExtended ? "p" : "narrow-p"}>Cancel Transaction</p> : ""}  
                </NavLink>
                <NavLink to='/admin/discounts' className={justCtx.isExtended ? "discounts" : "narrow-discounts"}>
                    <i/> {justCtx.isExtended ? <p className={justCtx.isExtended ? "p" : "narrow-p"}>Discounts</p> : ""}  
                </NavLink>
                <NavLink to='/admin/tax' className={justCtx.isExtended ? "tax" : "narrow-tax"}>
                    <i/> {justCtx.isExtended ? <p className={justCtx.isExtended ? "p" : "narrow-p"}>Tax</p> : ""}  
                </NavLink>
                <NavLink to='/admin/banners' className={justCtx.isExtended ? "banners" : "narrow-banners"}>
                    <i/> {justCtx.isExtended ? <p className={justCtx.isExtended ? "p" : "narrow-p"}>Banners</p> : ""}  
                </NavLink>
                <NavLink to='/admin/delivery-fee' className={justCtx.isExtended ? "delivery-fee" : "narrow-delivery-fee"}>
                    <i/> {justCtx.isExtended ? <p className={justCtx.isExtended ? "p" : "narrow-p"}>Delivery Fee</p> : ""}  
                </NavLink>
            </div>
        </aside>
    );
};

export default BlazeAside;