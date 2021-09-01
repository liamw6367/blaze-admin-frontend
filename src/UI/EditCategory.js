import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useUpdatingDataValidation } from '../hooks/use-validation';
import JustifyContext from '../Contexts/JustifyingContext';
import Blaze from '../Pages/Blaze';
import TumbnailButton from '../Buttons/TumbnailButton';
import BannerButton from '../Buttons/BannerButton';

const EditCategory = (props) => {
    const { targetCategory } = props;

    const justCtx = useContext(JustifyContext);

    const history = useHistory();

    const {
        enteredValue: enteredCategoryName,
        inputIsValid: categoryNameInputIsValid,
        inputIsInvalid: categoryNameInputIsInvalid,
        changeInputValueHandler: changeCategoryNameInputValueHandler,
        blurInputHandler: blurCategoryNameInputHandler,
    } = useUpdatingDataValidation( targetCategory.categoryName, (value) => value.trim() !== "" );
    const {
        enteredValue: enteredDescription,
        inputIsValid: descriptionInputIsValid,
        inputIsInvalid: descriptionInputIsInvalid,
        changeInputValueHandler: changeDescriptionInputValueHandler,
        blurInputHandler: blurDescriptionInputHandler,
    } = useUpdatingDataValidation( targetCategory.description, (value) => value.trim() !== "" );

    const [tumbNail, setTumbNail] = useState(targetCategory.tumbNail);
    const [banner, setBanner] = useState(targetCategory.banner);
    const [categoryIsActive, setCategoryIsActive] = useState(targetCategory.categoryIsActive);

    const addTumbNailHandler = (tumbnail) => {
        setTumbNail(tumbnail);
    };
    const addBannerHandler = (banner) => {
        setBanner(banner);
    };

    const updatedCategoryDataFormIsValid = categoryNameInputIsValid && descriptionInputIsValid && tumbNail && banner;

    const updateCategoryDataHandler = (event) => {
        event.preventDefault();
        const updatedCategoryData = {
            id: targetCategory.id,
            categoryName: enteredCategoryName,
            tumbNail,
            banner,
            description: enteredDescription,
            categoryIsActive, 
        }
        props.onUpdate(updatedCategoryData);

        history.push('/admin/categories');
    };

    return (
        <Blaze
            onClick={justCtx.onJustify}
            isExtended={justCtx.isExtended}
            nav={
                <div className={justCtx.isExtended ? "blaze-nav border" : "wide-blaze-nav border"}>
                    <Link to="/admin/categories"><p>Categories/</p></Link> 
                    <Link to="/admin/edit-category"><p className="text-color">Edit Category</p></Link> 
                </div> 
            }
            main={
                <div className={`blaze-main ${justCtx.isExtended ? "" : "wide"}`}>
                    <div className="store-info-box info-box-margin">
                        <form action="#" name="" id="" onSubmit={updateCategoryDataHandler}>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <label htmlFor="category-name" className="label">Name *</label>
                                    <div>
                                        <input 
                                            className={ `user-inputs__input ${ categoryNameInputIsInvalid ? "invalid" : categoryNameInputIsValid ? "valid" : "" }` }
                                            type="text" 
                                            name="" 
                                            id="category-name" 
                                            value={enteredCategoryName} 
                                            onChange={changeCategoryNameInputValueHandler}
                                            onBlur={blurCategoryNameInputHandler} 
                                        />
                                        {
                                            categoryNameInputIsInvalid && <p className="error-message">This field is required!</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <p className="user-inputs__title">Thumbnail * </p>
                                    <div className="tumbnail-box">
                                        <p className="explanation-text">
                                            Please upload only image files consisting of jpg, png, bitmap file formats and greater resolution than 150x150
                                        </p>
                                        { tumbNail && (
                                            <div className="tumbnail">
                                                <img src={tumbNail} alt="" />    
                                            </div>
                                        ) }
                                    </div>
                                    <TumbnailButton onAdd={addTumbNailHandler} />
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <p className="user-inputs__title">Banner *</p>
                                    <div className="banner-box">
                                        <p className="explanation-text">
                                            Please upload only image files consisting of jpg, png, bitmap file formats and greater resolution than 1024x512
                                        </p>
                                        { banner && (
                                            <div className="banner">
                                                <img src={banner} alt="banner" className="banner" />
                                            </div>
                                        ) }
                                    </div>
                                    <BannerButton onAdd={addBannerHandler} />
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <label htmlFor="category-description" className="label address-label">Description *</label>
                                    <div>
                                        <textarea 
                                            className={ `user-inputs__input address-input ${ descriptionInputIsInvalid ? "invalid" : descriptionInputIsValid ? "valid" : "" }` }
                                            name="" 
                                            id="category-description" 
                                            value={enteredDescription} 
                                            onChange={changeDescriptionInputValueHandler}
                                            onBlur={blurDescriptionInputHandler} 
                                        />
                                        {
                                            descriptionInputIsInvalid && <p className="error-message">This field is required!</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="checkbox-container">
                                    <div className="active-inactive__checkbox">
                                        <label htmlFor="category-status" className="active-inactive-label">Active</label>
                                        <input 
                                            type="checkbox" 
                                            name="" 
                                            id="category-status" 
                                            className="active-inactive-input" 
                                            checked={categoryIsActive}
                                            onChange={ (event) => setCategoryIsActive(event.target.checked) }
                                        />
                                    </div>
                                    <button 
                                        type="submit" 
                                        className="submit-store"
                                        disabled={!updatedCategoryDataFormIsValid}
                                    >
                                        Update
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

export default EditCategory;