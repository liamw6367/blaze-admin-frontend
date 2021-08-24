import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GroupInfo from '../Lists/GroupInfo';

const Groups = (props) => {
    const [searchingText, setSearchingText] = useState("");

    const changeInputHandler = (event) => {
        setSearchingText(event.target.value);
    };
    const passGroupHandler = (currentGroup) => {
        props.passGroup(currentGroup);
    };

    const filteredGroupsByData = props.groups.filter( group => {
        return (
            group.groupName.toLowerCase().includes(searchingText.toLowerCase()) 
            || group.quantity.toString().includes(searchingText.toLowerCase()) 
            || group.totalAmount.toString().includes(searchingText.toLowerCase()) 
        );
    } );

    return (
        <React.Fragment>
            <div className="groups-title-container">
                <p>Groups</p>
            </div>
            <div className="filtering justify">
                <span className="text">View:</span>
                <div className="search-input">
                    <input 
                        type="text" 
                        name="" 
                        id="" 
                        placeholder="Search..." 
                        onChange={changeInputHandler} 
                    />
                    <i />
                </div>
                <div className="add-store-button">
                    <Link to="/AddGroup">Add New</Link>
                </div>
            </div>
            {
                (filteredGroupsByData.length === 0) 
                ? (
                    <div className="store-info-box all-orders-box">
                        <h2 className="no-orders-available">No Matches Found</h2>
                    </div>
                )
                : (
                    <div className="store-info-box">
                        <table className="info-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Group Name</th>
                                    <th className="order-td-boxes">Quantity</th>
                                    <th className="order-td-boxes">Total Amount</th>
                                    <th className="group-td-boxes">Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                { 
                                    filteredGroupsByData.map((group, index) => {
                                        return (
                                            <GroupInfo 
                                                group={group} 
                                                index={index + 1} 
                                                key={group.id} 
                                                onPass={passGroupHandler}
                                            />
                                        );
                                    }) 
                                }
                            </tbody>
                        </table>
                    </div>
                )
            }
        </React.Fragment>
    );
}

export default Groups;
