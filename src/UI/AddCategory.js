import {useContext, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Link} from 'react-router-dom';
import JustifyContext from '../Contexts/JustifyingContext';
import Blaze from '../Pages/Blaze';
import TumbnailButton from '../Buttons/TumbnailButton';
import BannerButton from '../Buttons/BannerButton';
import {useDataValidation} from '../hooks/use-validation';
import axios from 'axios';

const AddCategory = () => {
    const justCtx = useContext(JustifyContext);

    const history = useHistory();

    const {
        enteredValue: enteredCategoryName,
        inputIsValid: categoryNameInputIsValid,
        inputIsInvalid: categoryNameInputIsInvalid,
        changeInputValueHandler: changeCategoryNameInputValueHandler,
        blurInputHandler: blurCategoryNameInputHandler,
    } = useDataValidation(value => value.trim() !== "");
    const {
        enteredValue: enteredDescription,
        inputIsValid: descriptionInputIsValid,
        inputIsInvalid: descriptionInputIsInvalid,
        changeInputValueHandler: changeDescriptionInputValueHandler,
        blurInputHandler: blurDescriptionInputHandler,
    } = useDataValidation(value => value.trim() !== "");

    const [tumbNail, setTumbNail] = useState(null);
    const [banner, setBanner] = useState(null);
    const [thumbnailUrlObj, setThumbnailUrlObj] = useState(null);
    const [bannerUrlObj, setBannerUrlObj] = useState(null);
    const [categoryIsActive, setCategoryIsActive] = useState(false);

    const addTumbNailHandler = (tumbnail, urlObj) => {
        setTumbNail(tumbnail);
        setThumbnailUrlObj(urlObj);
    };
    const addBannerHandler = (banner, urlObj) => {
        setBanner(banner);
        setBannerUrlObj(urlObj);
    };

    const categoryDataFormIsValid = categoryNameInputIsValid && descriptionInputIsValid;

    const categoryDataHandler = (event) => {
        event.preventDefault();
        const categoryData = {
            name: enteredCategoryName,
            thumbnail: thumbnailUrlObj.name,
            banner: bannerUrlObj.name,
            description: enteredDescription,
            is_active: +categoryIsActive
        };
        const formData = new FormData();
        for (let key in categoryData) {
            formData.append(key, categoryData[key]);
        }
        formData.append('thumbnail_file', thumbnailUrlObj, thumbnailUrlObj.name);
        formData.append('banner_file', bannerUrlObj, bannerUrlObj.name);
        for (let value of formData.values()) {
            console.log(value);
        }
        console.log(categoryData);
        axios.post(`${process.env.REACT_APP_API_URL}/categories/add`, formData).then((res) => {
            console.log(res);
            history.push('/admin/categories');
        }).catch((err) => {
            console.log(err);
        });
    };

    return (
        <Blaze
            onClick={justCtx.onJustify}
            isExtended={justCtx.isExtended}
            nav={
                <div className={justCtx.isExtended ? "blaze-nav border" : "wide-blaze-nav border"}>
                    <Link to="/admin/categories">
                        <p>Categories/</p>
                    </Link>
                    <Link to="/admin/add-category">
                        <p className="text-color">Add Category</p>
                    </Link>
                </div>
            }
            main={
                <div className={`blaze-main ${justCtx.isExtended ? "" : "wide"}`}>
                    <div className="store-info-box info-box-margin">
                        <form action="#" name="" id="" onSubmit={categoryDataHandler}>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <label htmlFor="category-name" className="label">Name *</label>
                                    <div>
                                        <input
                                            className={`user-inputs__input ${categoryNameInputIsInvalid ? "invalid" : categoryNameInputIsValid ? "valid" : ""}`}
                                            type="text"
                                            name=""
                                            id="category-name"
                                            value={enteredCategoryName}
                                            onChange={changeCategoryNameInputValueHandler}
                                            onBlur={blurCategoryNameInputHandler}
                                        />
                                        {
                                            categoryNameInputIsInvalid &&
                                            <p className="error-message">This field is required!</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <p className="user-inputs__title">Thumbnail *</p>
                                    <div className="tumbnail-box">
                                        <p className="explanation-text">
                                            Please upload only image files consisting of jpg, png, bitmap file formats
                                            and greater resolution than 150x150
                                        </p>
                                        {tumbNail && (
                                            <div className="tumbnail">
                                                <img src={tumbNail} alt=""/>
                                            </div>
                                        )}
                                    </div>
                                    <TumbnailButton onAdd={addTumbNailHandler}/>
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <p className="user-inputs__title">Banner *</p>
                                    <div className="banner-box">
                                        <p className="explanation-text">
                                            Please upload only image files consisting of jpg, png, bitmap file formats
                                            and greater resolution than 1024x512
                                        </p>
                                        {banner && (
                                            <div className="banner">
                                                <img src={banner} alt="banner" className="banner"/>
                                            </div>
                                        )}
                                    </div>
                                    <BannerButton onAdd={addBannerHandler}/>
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <label htmlFor="category-description" className="address-label label">Description
                                        *
                                    </label>
                                    <div>
                                        <textarea
                                            className={`user-inputs__input address-input ${descriptionInputIsInvalid ? "invalid" : descriptionInputIsValid ? "valid" : ""}`}
                                            name=""
                                            id="category-description"
                                            value={enteredDescription}
                                            onChange={changeDescriptionInputValueHandler}
                                            onBlur={blurDescriptionInputHandler}
                                        />
                                        {
                                            descriptionInputIsInvalid &&
                                            <p className="error-message">This field is required!</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="checkbox-container">
                                    <div className="active-inactive__checkbox">
                                        <label htmlFor="category-status" className="active-inactive-label label">
                                            Active
                                        </label>
                                        <input
                                            type="checkbox"
                                            name=""
                                            id="category-status"
                                            className="active-inactive-input"
                                            checked={categoryIsActive}
                                            onChange={(event) => setCategoryIsActive(event.target.checked)}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="submit-store"
                                        disabled={!categoryDataFormIsValid}
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

export default AddCategory;