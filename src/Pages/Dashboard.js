import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import  { useHistory } from "react-router-dom";
import './Dashboard.css';
import uploadCloudImage from '../assets/images/main/upload-cloud-image.png';
import walletImage from '../assets/images/main/wallet-image.png';
import moneyImage from '../assets/images/main/money-image.png';
import carImage from '../assets/images/main/car-image.png';
import shoppingBagImage from '../assets/images/main/shopping-bag-image.png';
import bitcoinImage from '../assets/images/main/bitcoin-logo-image.png';
import Blaze from './Blaze';
import StoreNamesDropdown from '../Dropdowns/StoreNamesDropdown';
import JustifyContext from '../Contexts/JustifyingContext';
import axios from 'axios';
import {useToken} from "../hooks/useToken";

const Dashboard = (props) => {
    const justCtx = useContext(JustifyContext);
    const [stores, setStores] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const history = useHistory();

    const [path, isLoggedIn] = useToken('/admin/dashboard');

    useEffect(() => {
        console.log(history)
        history.push(path);
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            axios.get(`${process.env.REACT_APP_API_URL}/stores/get`)
                .then((res) => {
                    setStores(res.data);
                    setIsLoading(false);
                })
                .catch((err) => console.log(err));
        }
    }, []);
    
    let currentMonth = new Date().getMonth() + 1;
    currentMonth = (currentMonth < 10) ? ("0" + currentMonth) : currentMonth;
    let currentDay = new Date().getDate();
    currentDay = (currentDay < 10) ? ("0" + currentDay) : currentDay;
    let currentYear = new Date().getFullYear(); 
    let lastMonth = +currentMonth - 1;
    lastMonth = (lastMonth < 10) ? ("0" + lastMonth) : lastMonth;

    if(isLoading) {
        return (
            <div>
                <p> LOADING..... </p>
            </div>
        );
    }

    return (
        <Blaze 
            onClick={justCtx.onJustify}
            isExtended={justCtx.isExtended}
            nav={
                <div className={justCtx.isExtended ? "blaze-nav" : "wide-blaze-nav"}>
                    <Link to="/Dashboard"><p>Dashboard</p></Link> 
                </div>
            } 
            main={
                <div className={`blaze-main ${justCtx.isExtended ? "" : "wide"}`}>
                    <div className="filtering">
                        <label>From
                            <input type="date" name="" id="" defaultValue={`${currentYear}-${lastMonth}-${currentDay}`} />
                        </label>
                        <label>To
                            <input type="date" name="" id="" defaultValue={`${currentYear}-${currentMonth}-${currentDay}`} />
                        </label>
                        <span className="title">Stores</span>
                        <StoreNamesDropdown stores={stores} />
                    </div>
                    <div className="cards-container">
                        <div className="card-1">
                            <div className="card-1__image image">
                                <img src={uploadCloudImage} alt="cloud" />
                            </div>
                            <div className="card-1__text">
                                <p className="money">0</p>
                                <p className="info">Number of Store</p>
                            </div>
                        </div>
                        <div className="card-2">
                            <div className="card-2__image image">
                                <img src={walletImage} alt="wallet" />
                            </div>
                            <div className="card-2__text">
                                <p className="money">0.00$</p>
                                <p className="info">Gross income</p>
                            </div>
                        </div>
                        <div className="card-3">
                            <div className="card-3__image image">
                                <img src={moneyImage} alt="money" />
                            </div>
                            <div className="card-3__text">
                                <p className="money">0.00$</p>
                                <p className="info">Net income</p>
                            </div>
                        </div>
                        <div className="card-4">
                            <div className="card-4__image image">
                                <img src={carImage} alt="car" />
                            </div>
                            <div className="card-4__text">
                                <p className="money">0.00$</p>
                                <p className="info">Delivery charge</p>
                            </div>
                        </div>
                        <div className="card-5">
                            <div className="card-5__image image">
                                <img src={shoppingBagImage} alt="shopping bag" />
                            </div>
                            <div className="card-5__text">
                                <p className="money">0</p>
                                <p className="info">Total orders</p>
                            </div>
                        </div>
                        <div className="card-6">
                            <div className="card-6__info image">
                                <p className="order">order delivered</p>
                                <p className="price">0</p>
                            </div>
                            <div className="card-6__text">
                                <p className="cancel">Cancel order</p>
                                <p className="price black">0</p>
                            </div>
                        </div>
                        <div className="card-7">
                            <div className="card-7__info image">
                                <p className="cancel">Cancel Products</p>
                                <p className="price black">0</p>
                            </div>
                            <div className="card-7__text">
                                <p className="order">Pending order</p>
                                <p className="price">0</p>
                            </div>
                        </div>
                        <div className="card-8">
                            <div className="card-8__image image">
                                <img src={bitcoinImage} alt="bitcoin" />
                            </div>
                            <div className="card-8__text">
                                <p className="money">0</p>
                                <p className="info">Total tip</p>
                            </div>
                        </div>
                    </div>
                    <div className="list">
                        <p>Product Name</p>
                        <p>Category</p>
                        <p>Quantity</p>
                        <p>Net Amount</p>
                        <p>Share Percent</p>
                        <p>Revenue to paid</p>
                        <p>Profit</p>
                    </div>
                </div>
            } 
        />
    );
};

export default Dashboard;