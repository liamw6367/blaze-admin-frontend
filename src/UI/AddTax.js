import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import JustifyContext from '../Contexts/JustifyingContext';
import Blaze from '../Pages/Blaze';
import { useDataValidation } from '../hooks/use-validation';

const AddTax = (props) => {
    const justCtx = useContext(JustifyContext);

    const history = useHistory();

    const {
        enteredValue: enteredName,
        inputIsValid: nameInputIsValid,
        inputIsInvalid: nameInputIsInvalid,
        changeInputValueHandler: changeNameInputValueHandler,
        blurInputHandler: blurNameInputHandler,
    } = useDataValidation( value => value.trim() !== "" );

    const [enteredTaxPercentage, setEnteredTaxPercentage] = useState("");

    const taxPercentageIsNotEmpty = enteredTaxPercentage.trim() !== "";
    
    const taxDataFormIsValid = nameInputIsValid;

    const taxDataHandler = (event) => {
        event.preventDefault();
        const taxData = {
            taxName: enteredName,
            percentage: enteredTaxPercentage,
        };
        props.triggerTaxData(taxData);

        history.push('./admin/tax');
    };

    return (
        <Blaze
            onClick={justCtx.onJustify}
            isExtended={justCtx.isExtended}
            nav={
                <div className={justCtx.isExtended ? "blaze-nav border" : "wide-blaze-nav border"}>
                    <Link to="/admin/tax"><p>Tax/</p></Link> 
                    <Link to="/admin/add-tax"><p className="text-color">Add Tax</p></Link> 
                </div> 
            }
            main={
                <div className={`blaze-main ${justCtx.isExtended ? "" : "wide"}`}>
                    <div className="store-info-box info-box-margin">
                        <form action="#" name="" id="" onSubmit={taxDataHandler}>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <label htmlFor="tax-name" className="label">Tax Name *</label>
                                    <div>
                                        <input 
                                            className={`user-inputs__input ${ nameInputIsInvalid ? "invalid" : nameInputIsValid ? "valid" : "" }`}
                                            type="text" 
                                            name="" 
                                            id="tax-name" 
                                            value={enteredName} 
                                            onChange={changeNameInputValueHandler} 
                                            onBlur={blurNameInputHandler}
                                        />
                                        {
                                            nameInputIsInvalid && <p className="error-message">This field is required!</p> 
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <label htmlFor="tax-percentage" className="label">Percentage</label>
                                    <div>
                                        <input 
                                            className={`user-inputs__input ${ taxPercentageIsNotEmpty && "valid" }`}
                                            type="number" 
                                            name="" 
                                            id="tax-percentage" 
                                            value={enteredTaxPercentage} 
                                            onChange={ (event) => setEnteredTaxPercentage(event.target.value) }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="save-tax-btn-container">
                                    <button 
                                        type="submit" 
                                        className="submit-store"
                                        disabled={!taxDataFormIsValid}    
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            }
        />
    );
};

export default AddTax;
