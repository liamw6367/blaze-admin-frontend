import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import JustifyContext from '../Contexts/JustifyingContext';
import Blaze from './Blaze';
import TaxInfo from '../Lists/TaxInfo';

const Tax = (props) => {
    const justCtx = useContext(JustifyContext);

    const [searchingText, setSearchingText] = useState("");

    const changeInputHandler = (event) => {
        setSearchingText(event.target.value);
    };

    const filteredTaxesByData = props.taxes.filter( tax => {
        return (
            tax.taxName.toLowerCase().includes(searchingText.toLowerCase()) 
            || tax.percentage.toString().includes(searchingText.toLowerCase()) 
        );
    } );
    
    return (
        <Blaze
            onClick={justCtx.onJustify}
            isExtended={justCtx.isExtended}
            nav={
                <div className={justCtx.isExtended ? "blaze-nav" : "wide-blaze-nav"}>
                    <p>Tax</p>
                </div>
            }
            main={
                <div className={`blaze-main ${justCtx.isExtended ? "" : "wide"}`}>
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
                            <Link to="/admin/add-tax">Add New</Link>
                        </div>
                    </div>
                    {
                        (filteredTaxesByData.length === 0) 
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
                                            <th>Name</th>
                                            <th className="order-td-boxes">Percentage</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { 
                                            filteredTaxesByData.map((tax, index) => {
                                                return (
                                                    <TaxInfo 
                                                        tax={tax} 
                                                        index={index + 1} 
                                                        key={tax.id} 
                                                    />
                                                );
                                            }) 
                                        }
                                    </tbody>
                                </table>
                            </div>
                        )
                    }
                </div>
            }
        />
    );
};

export default Tax;