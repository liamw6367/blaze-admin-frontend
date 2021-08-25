import React, { useContext, useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import './Stores.css';
import JustifyContext from '../Contexts/JustifyingContext';
import StoreStatusDropdown from '../Dropdowns/StoreStatusDropdown';
import Blaze from './Blaze';
import StoresInfo from '../Lists/StoresInfo';
import axios from 'axios';

const Stores = (props) => {
    const justCtx = useContext(JustifyContext);
    const [stores, setStores] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://54.184.111.173/test-stores/`)
        .then((res) => {
            setStores(res.data);
            setIsLoading(false);
        })
        .catch(err => console.log(err.message));
    }, []);
    
    const [searchingText, setSearchingText] = useState("");
    const [currentStatus, setCurrentStatus] = useState("All");

    const changeInputHandler = (event) => {
        setSearchingText(event.target.value);
    };
    const triggerStatusHandler = (selectedStatus) => {
        setCurrentStatus(selectedStatus.status);
        console.log(selectedStatus);
    };
    const passStoreHandler = (currentStore) => {
        props.showStore(currentStore);
    };

    const filteredStoresByData = stores.filter( store => {
        return store.name.toLowerCase().includes(searchingText.toLowerCase()) 
            || store.area.toLowerCase().includes(searchingText.toLowerCase()) 
            || store.contactNumber.toString().toLowerCase().includes(searchingText.toLowerCase()) 
            || store.storeEmailId.toLowerCase().includes(searchingText.toLowerCase())
    } );
    const filteredStoresByStatus = (currentStatus === "Active") 
    ? filteredStoresByData.filter(store => store.isActive)
    : (currentStatus === "Inactive") 
    ? filteredStoresByData.filter(store => !store.isActive)
    : filteredStoresByData;

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
                    <Link to="/admin/stores"><p>Stores</p></Link> 
                </div>
            }
            main={
                <div className={`blaze-main ${justCtx.isExtended ? "" : "wide"}`}>
                    <div className="filtering justify">
                        <span className="text">View:</span>
                        <div className="search-input">
                            <input type="text" name="" id="" placeholder="Search..." onChange={changeInputHandler} />
                            <i />
                        </div>
                        <StoreStatusDropdown onTrigger={triggerStatusHandler} />
                        <div className="add-store-button">
                            <Link to="/admin/add-store">Add New</Link>
                        </div>
                    </div>
                    <div className="store-info-box">
                        <table className="info-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Area</th>
                                    <th>Contact Number</th>
                                    <th>Store Email Id</th>
                                    <th>Status</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                { 
                                    filteredStoresByStatus.map((store, index) => {
                                        return (
                                            <StoresInfo 
                                                store={store} 
                                                index={index + 1} 
                                                key={store.storeEmailId} 
                                                onPass={passStoreHandler}
                                            />
                                        );
                                    }) 
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        />
    );
};

export default Stores;